import request from "supertest";
import app from "../../src/index";
import { getPool } from "../../src/db/config";


let pool: any;


beforeAll(async () => {
  pool = await getPool();

})
afterAll(async () => {
  await pool.close();
});

describe("Comments API Integration Test Suite", () => {

//update comment
  it("should fail when comment id is invalid", async () => {
    const res = await request(app)
      .get("/approvals/abc")
     

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid comment id/i);
  });


  it("should fail when updating non-existing comment", async () => {
    const res = await request(app)
      .put("/approvals/999999")
     
      .send({ comment: "Nothing" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/comment not found/i);
  });

  //getcommentbyid
  it("should return 400 for invalid comment id", async () => {
    const res = await request(app)
      .get("/approvals/abc")
      

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "invalid comment id");
  });

  it("should return 400 if comment not found", async () => {
    const res = await request(app)
      .get("/approvals/999999")
      

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "comment not available");
  });

});
