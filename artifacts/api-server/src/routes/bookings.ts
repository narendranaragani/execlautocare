import { Router } from "express";
import { db } from "@workspace/db";
import { bookingsTable } from "@workspace/db";
import { z } from "zod";

const router = Router();

const BookingInputSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().nullable().optional(),
  carModel: z.string().min(1),
  carYear: z.number().int().min(2000).max(2025),
  fuelType: z.enum(["petrol", "diesel", "cng", "hybrid"]),
  serviceIds: z.array(z.number().int()).min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slotId: z.string().min(1),
  notes: z.string().nullable().optional(),
});

function generateSlots(date: string) {
  const morningTimes = ["09:00", "10:00", "11:00", "12:00"];
  const afternoonTimes = ["13:00", "14:00", "15:00", "16:00", "17:00"];

  return [
    ...morningTimes.map((time) => ({
      id: `${date}-${time}`,
      date,
      time,
      period: "morning" as const,
      available: true,
    })),
    ...afternoonTimes.map((time) => ({
      id: `${date}-${time}`,
      date,
      time,
      period: "afternoon" as const,
      available: true,
    })),
  ];
}

router.get("/slots", async (req, res) => {
  const date = req.query.date as string;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "Valid date (YYYY-MM-DD) required" });
  }

  const booked = await db
    .select({ slotId: bookingsTable.slotId })
    .from(bookingsTable);
  const bookedSet = new Set(booked.map((r) => r.slotId));

  const slots = generateSlots(date).map((slot) => ({
    ...slot,
    available: !bookedSet.has(slot.id),
  }));

  return res.json(slots);
});

router.post("/", async (req, res) => {
  const parsed = BookingInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid booking data" });
  }

  const data = parsed.data;

  const [booking] = await db
    .insert(bookingsTable)
    .values({
      customerName: data.customerName,
      phone: data.phone,
      email: data.email ?? null,
      carModel: data.carModel,
      carYear: data.carYear,
      fuelType: data.fuelType,
      serviceIds: JSON.stringify(data.serviceIds),
      date: data.date,
      slotId: data.slotId,
      notes: data.notes ?? null,
      status: "confirmed",
    })
    .returning();

  return res.status(201).json({
    id: booking.id,
    customerName: booking.customerName,
    phone: booking.phone,
    email: booking.email,
    carModel: booking.carModel,
    carYear: booking.carYear,
    fuelType: booking.fuelType,
    serviceIds: JSON.parse(booking.serviceIds),
    date: booking.date,
    slotId: booking.slotId,
    notes: booking.notes,
    status: booking.status,
    createdAt: booking.createdAt.toISOString(),
  });
});

export default router;
