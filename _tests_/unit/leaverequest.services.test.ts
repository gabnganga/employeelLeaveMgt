import * as leaverequestrepository from "../../src/repositories/leaverequest.repository"
import * as leaverequestService from "../../src/services/leaverequest.services"


//mocking external dependencies
jest.mock("../../src/repositories/leaverequest.repository")

describe("Leave Request Service Test Suite", () => {


    afterEach(() => {
        jest.clearAllMocks()
    })

    const mockLeave = {
    staffid: 3122,
    leavetypeid: 4,
    start_date: new Date("2025-12-12"),
    end_date: new Date("2025-12-25")

    };


  // requestleave
  it("should request leave successfully", async() => {

    (leaverequestrepository.requestleave as jest.Mock).mockResolvedValue({message:'Your Leave Request Has Been Created Successfully'});

    const result = await leaverequestService.requestleave(mockLeave);

    expect(result).toEqual({message:'Your Leave Request Has Been Created Successfully'});
    expect(leaverequestrepository.requestleave).toHaveBeenCalledWith(mockLeave);
  });



  // leavehistory
  it("should return leave history for valid staffid", async () => {

    (leaverequestrepository.leavehistory as jest.Mock).mockResolvedValue(mockLeave);

    const result = await leaverequestService.leavehistory(3122);

    expect(result).toEqual(mockLeave);
    expect(leaverequestrepository.leavehistory).toHaveBeenCalledWith(3122);
  });



  it("should throw error for invalid staffid in leavehistory", async () => {
    await 
    expect(leaverequestService.leavehistory(NaN)).rejects.toThrow("Invalid Staffid");
  });



  // getleavebyid
  it("should return leave by id", async () => {
    (leaverequestrepository.getleavebyid as jest.Mock).mockResolvedValue(mockLeave);

    const result = await leaverequestService.getleavebyid(1);

    expect(result).toEqual(mockLeave);

    expect(leaverequestrepository.getleavebyid).toHaveBeenCalledWith(1);
  });


  it("should throw error for invalid leaveid in getleavebyid", async () => {
    await expect(leaverequestService.getleavebyid(NaN)).rejects.toThrow("Invalid leaveid");
  });


  it("should throw error if leave not found in getleavebyid", async () => {
    (leaverequestrepository.getleavebyid as jest.Mock).mockResolvedValue(null);

    await expect(leaverequestService.getleavebyid(1)).rejects.toThrow("Leave Not Found");
  });





  // listrequests
  it("should return all leave requests", async () => {
    (leaverequestrepository.Allleaverequests as jest.Mock).mockResolvedValue(mockLeave);

    const result = await leaverequestService.listrequests();

    expect(result).toEqual(mockLeave);
    expect(leaverequestrepository.Allleaverequests).toHaveBeenCalled();
  });




  // updateleave
  it("should update leave successfully", async () => {
    (leaverequestrepository.getleavebyid as jest.Mock).mockResolvedValue(mockLeave);
    (leaverequestrepository.updateleave as jest.Mock).mockResolvedValue({message:'Your Leave Request Has Been Updated Successfully'});

    const result = await leaverequestService.updateleave(1, mockLeave);

    expect(result).toEqual({message:'Your Leave Request Has Been Updated Successfully'});
    expect(leaverequestrepository.updateleave).toHaveBeenCalledWith(1, mockLeave);
  });



  it("should throw error if leave not found in updateleave", async () => {
    (leaverequestrepository.getleavebyid as jest.Mock).mockResolvedValue(null);
    await expect(leaverequestService.updateleave(1, mockLeave)).rejects.toThrow("Leave Not Found");
  });


  // deleteleave
  it("should delete leave successfully", async () => {
    (leaverequestrepository.getleavebyid as jest.Mock).mockResolvedValue(mockLeave);
    (leaverequestrepository.deleterequest as jest.Mock).mockResolvedValue({message:'Your Leave Request Has Been Deleted Successfully'});

    const result = await leaverequestService.deleteleave(1);

    expect(result).toEqual({message:'Your Leave Request Has Been Deleted Successfully'});
    expect(leaverequestrepository.deleterequest).toHaveBeenCalledWith(1);
  });


  it("should throw error if leave not found in deleteleave", async () => {
    (leaverequestrepository.getleavebyid as jest.Mock).mockResolvedValue(null);
    await expect(leaverequestService.deleteleave(1)).rejects.toThrow("Leave Not Found");
  });
});
