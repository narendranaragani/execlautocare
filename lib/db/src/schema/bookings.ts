import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const serviceCategoriesTable = pgTable("service_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
});

export const servicesTable = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull(),
});

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  carModel: text("car_model").notNull(),
  carYear: integer("car_year").notNull(),
  fuelType: text("fuel_type").notNull(),
  serviceIds: text("service_ids").notNull(),
  date: text("date").notNull(),
  slotId: text("slot_id").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const workshopStatsTable = pgTable("workshop_stats", {
  id: serial("id").primaryKey(),
  totalCarsServiced: integer("total_cars_serviced").notNull().default(0),
  yearsInOperation: integer("years_in_operation").notNull().default(0),
  certifiedTechnicians: integer("certified_technicians").notNull().default(0),
  customerSatisfaction: text("customer_satisfaction").notNull().default("0"),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({ id: true, createdAt: true, status: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
export type ServiceCategory = typeof serviceCategoriesTable.$inferSelect;
export type Service = typeof servicesTable.$inferSelect;
export type WorkshopStats = typeof workshopStatsTable.$inferSelect;
