import { Express } from "express";
import { getReports } from "../controllers/reports.controllers";
import { adminOnly } from "../middleware/bearAuth";

const reportsRoutes = (app: Express) => {
  app.get("/reports", adminOnly, getReports);
};

export default reportsRoutes;
