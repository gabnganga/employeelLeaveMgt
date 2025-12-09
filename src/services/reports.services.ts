
import * as repo from "../repositories/reportsrepository";

export const getReports = async () => {
  const [
    statusSummary,
    leaveTypeUsage,
    topLeaveTakers,
    totalEmployees,
    employeesOnLeaveToday,
    monthlyLeaveTrend,
  ] = await Promise.all([
    repo.statusSummary(),
    repo.leaveTypeUsage(),
    repo.topLeaveTakers(),
    repo.totalEmployees(),
    repo.employeesOnLeaveToday(),
    repo.monthlyLeaveTrend(),
  ]);

  const leavePercentage = totalEmployees > 0
    ? ((employeesOnLeaveToday / totalEmployees) * 100).toFixed(2)
    : "0.00";

  return {
    cards: {
      totalEmployees,
      employeesOnLeaveToday,
      leavePercentage
    },
    charts: {
      statusSummary,
      leaveTypeUsage,
      monthlyLeaveTrend
    },
    topLeaveTakers
  };
};
