import * as commentsrepository from "../../src/repositories/comments.repository"
import * as commentsService from "../../src/services/comments.services"
import { NewComment } from "../../src/types/comments.types"

//mock
jest.mock("../../src/repositories/comments.repository")

describe("comments Service Test Suite", () => {

        afterEach(() => {
        jest.clearAllMocks()
    })


  const mockComment={
    leaveid: 154,
    comment: "enjoy your leave",
    status: "Approved",
    managerid: 7457

  }



  // getcommentsbyid
  it("should return comment by id successfully", async () => {
    (commentsrepository.getcommentbyid as jest.Mock).mockResolvedValue(mockComment);

    const result = await commentsService.getcommentsbyid(1);

    expect(result).toEqual(mockComment);
    expect(commentsrepository.getcommentbyid).toHaveBeenCalledWith(1);
  });




  it("should throw error if id is invalid in getcommentsbyid", async () => {
    await expect(commentsService.getcommentsbyid(NaN)).rejects.toThrow("invalid comment id");
  });



  it("should throw error if comment not found in getcommentsbyid", async () => {
    (commentsrepository.getcommentbyid as jest.Mock).mockResolvedValue(null);

    await expect(commentsService.getcommentsbyid(1)).rejects.toThrow("comment not available");
  });




  // newcomment
  it("should create a new comment successfully", async () => {
    (commentsrepository.newcomment as jest.Mock).mockResolvedValue({message:'Your comment Has Been Created Successfully'});

    const result = await commentsService.newcomment(mockComment);

    expect(result).toEqual({message:'Your comment Has Been Created Successfully'});
    expect(commentsrepository.newcomment).toHaveBeenCalledWith(mockComment);
  });




  // updatecomment
  it("should update comment successfully", async () => {

    (commentsrepository.getcommentbyid as jest.Mock).mockResolvedValue(mockComment);
    (commentsrepository.updatecomment as jest.Mock).mockResolvedValue({message:'Your Comment Has Been Updated Successfully'});

    const result = await commentsService.updatecomment(1, mockComment);

    expect(result).toEqual({message:'Your Comment Has Been Updated Successfully'});
    expect(commentsrepository.updatecomment).toHaveBeenCalledWith(1, mockComment);
  });



  it("should throw error if id is invalid in updatecomment", async () => {
    await expect(commentsService.updatecomment(NaN, mockComment)).rejects.toThrow(
      "Invalid comment id"
    );
  });


  
  it("should throw error if comment not found in updatecomment", async () => {
    (commentsrepository.getcommentbyid as jest.Mock).mockResolvedValue(null);

    await expect(commentsService.updatecomment(1, mockComment)).rejects.toThrow(
      "Comment Not Found"
    );
  });


});
