import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import bookingsRouter from "./bookings";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/services", servicesRouter);
router.use("/bookings", bookingsRouter);
router.use("/stats", statsRouter);

export default router;
