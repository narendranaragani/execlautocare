import { Router } from "express";
import { db } from "@workspace/db";
import { workshopStatsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const rows = await db.select().from(workshopStatsTable).limit(1);
  if (rows.length === 0) {
    return res.json({
      totalCarsServiced: 100000,
      yearsInOperation: 35,
      certifiedTechnicians: 45,
      customerSatisfaction: 98,
    });
  }
  const stat = rows[0];
  if (stat.totalCarsServiced !== 100000 || stat.yearsInOperation !== 35) {
    await db.update(workshopStatsTable)
      .set({
        totalCarsServiced: 100000,
        yearsInOperation: 35,
        certifiedTechnicians: 45,
        customerSatisfaction: "98",
      })
      .where(eq(workshopStatsTable.id, stat.id));
  }
  return res.json({
    totalCarsServiced: 100000,
    yearsInOperation: 35,
    certifiedTechnicians: 45,
    customerSatisfaction: 98,
  });
});

export default router;
