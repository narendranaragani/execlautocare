import { Router } from "express";
import { db } from "@workspace/db";
import { workshopStatsTable } from "@workspace/db";

const router = Router();

router.get("/", async (req, res) => {
  const rows = await db.select().from(workshopStatsTable).limit(1);
  if (rows.length === 0) {
    return res.json({
      totalCarsServiced: 8750,
      yearsInOperation: 12,
      certifiedTechnicians: 24,
      customerSatisfaction: 4.8,
    });
  }
  const stat = rows[0];
  res.json({
    totalCarsServiced: stat.totalCarsServiced,
    yearsInOperation: stat.yearsInOperation,
    certifiedTechnicians: stat.certifiedTechnicians,
    customerSatisfaction: parseFloat(stat.customerSatisfaction),
  });
});

export default router;
