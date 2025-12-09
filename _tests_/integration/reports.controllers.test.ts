import request from "supertest";
import app from "../../src/index";
import { getPool } from "../../src/db/config";
import bcrypt from "bcrypt"

let pool: any;
let token: string;

beforeAll(async () => {
    pool = await getPool()

    const hashedpassword = await bcrypt.hash("tester",10)


        await pool.request().query(`
        INSERT INTO users (staffid, username, email, password, role) 
        VALUES (4455,'API Tester', 'tester@testr.com', '${hashedpassword}', 'Admin')
            `);
        
     const loginRes = await request(app)
    .post("/login")
    .send({
      email: "tester@testr.com",
      password: "tester"
    });

  token = loginRes.body.token;
});


afterAll(async () => {
    await pool.request().query("DELETE FROM users WHERE email LIKE '%@testr.com'")
    await pool.close()
})
describe("Reports API Integration Test Suite", () => {

  it("should fetch all reports successfully", async () => {
    const res = await request(app)
      .get("/reports")
      .set("Authorization", `Bearer ${token}`); 

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data");
  
  });

 

});
