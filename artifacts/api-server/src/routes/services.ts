import { Router } from "express";
import { db } from "@workspace/db";
import { serviceCategoriesTable, servicesTable } from "@workspace/db";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await db.select().from(serviceCategoriesTable);
  const services = await db.select().from(servicesTable);

  const result = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    description: cat.description,
    services: services
      .filter((s) => s.categoryId === cat.id)
      .map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        categoryId: s.categoryId,
      })),
  }));

  res.json(result);
});

export default router;
