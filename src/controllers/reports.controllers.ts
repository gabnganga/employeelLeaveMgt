
import { Request, Response } from "express";
import * as reportsService from "../services/reports.services";

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await reportsService.getReports();
    res.status(200).json({ success: true, data: reports });
  } catch (error: any) {
    console.error("Report Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
      details: error
    });
  }
};
