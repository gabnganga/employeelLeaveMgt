import * as reportsService from "../../src/services/reports.services";
import * as reportsrepository from "../../src/repositories/reportsrepository";


jest.mock("../../src/repositories/reportsrepository");



describe("Reports Service Test Suite", () => {


        afterEach(() => {
        jest.clearAllMocks()
    })

            const mockStatusSummary = [{ status: "Approved", count: 5 }];
            const mockLeaveTypeUsage = [{ type: "Annual Leave", count: 3 }];
            const mockTopLeaveTakers = [{ staffid: 1, name: "John Doe", leavesTaken: 2 }];
            const mockTotalEmployees = 10;
            const mockEmployeesOnLeaveToday = 2;
            const mockMonthlyLeaveTrend = [{ month: "December", count: 4 }];



  it("should return report data with correct structure and leave percentage", async () => {
  
    (reportsrepository.statusSummary as jest.Mock).mockResolvedValue(mockStatusSummary);
    (reportsrepository.leaveTypeUsage as jest.Mock).mockResolvedValue(mockLeaveTypeUsage);
    (reportsrepository.topLeaveTakers as jest.Mock).mockResolvedValue(mockTopLeaveTakers);
    (reportsrepository.totalEmployees as jest.Mock).mockResolvedValue(mockTotalEmployees);
    (reportsrepository.employeesOnLeaveToday as jest.Mock).mockResolvedValue(mockEmployeesOnLeaveToday);
    (reportsrepository.monthlyLeaveTrend as jest.Mock).mockResolvedValue(mockMonthlyLeaveTrend);

    const result = await reportsService.getReports();

    expect(result).toEqual({
      cards: {
        totalEmployees: mockTotalEmployees,
        employeesOnLeaveToday: mockEmployeesOnLeaveToday,
        leavePercentage: "20.00",
      },
      charts: {
        statusSummary: mockStatusSummary,
        leaveTypeUsage: mockLeaveTypeUsage,
        monthlyLeaveTrend: mockMonthlyLeaveTrend,
      },
      topLeaveTakers: mockTopLeaveTakers,
    });

   
    expect(reportsrepository.statusSummary).toHaveBeenCalled();
    expect(reportsrepository.leaveTypeUsage).toHaveBeenCalled();
    expect(reportsrepository.topLeaveTakers).toHaveBeenCalled();
    expect(reportsrepository.totalEmployees).toHaveBeenCalled();
    expect(reportsrepository.employeesOnLeaveToday).toHaveBeenCalled();
    expect(reportsrepository.monthlyLeaveTrend).toHaveBeenCalled();
  });

});
