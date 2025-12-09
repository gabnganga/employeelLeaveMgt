import request from "supertest";
import app from "../../src/index";
import { getPool } from "../../src/db/config";
import bcrypt from "bcrypt";

let pool: any;
let token: any;
let Admintoken: any;
let leaveId: number;
beforeAll(async () => {
pool = await getPool();


const hashedPassword = await bcrypt.hash("tester", 10);

await pool.request().query(`
INSERT INTO users (staffid, username, email, password, role)
VALUES
(3001, 'Leave Tester', 'leave@test.com', '${hashedPassword}', 'Employee'),
(3002, 'Leave Tester', 'leaveadm@test.com', '${hashedPassword}', 'Admin')
`);


const loginRes = await request(app)
.post("/login")
.send({
email: "leave@test.com",
password: "tester"
});

token = loginRes.body.token;

const adloginRes = await request(app)
.post("/login")
.send({
email: "leaveadm@test.com",
password: "tester"
});

Admintoken = adloginRes.body.token;
});

afterAll(async () => {
await pool.request().query("DELETE FROM leaverequest WHERE staffid = 3001");
await pool.request().query("DELETE FROM users WHERE email LIKE '%@test.com'");
await pool.close()
})


describe("Leave Request API Integration Test Suite", () => {



//new leave request
it("should create a leave request successfully", async () => {
const res = await request(app)
.post("/leave")
.set("Authorization", `Bearer ${token}`)
.send({
staffid: 3001,
leavetypeid: 4,
start_date: "2025-01-10",
end_date: "2025-01-12",

});

expect(res.statusCode).toBe(201);
expect(res.body.message).toBe("Your Leave Request Has Been Created Successfully")


leaveId = res.body.leaveid;
});



//leave history
it("should fetch leave history successfully", async () => {
const res = await request(app)
.get("/leave/3001/history")
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(200);

});




it("should fail when staffid is invalid", async () => {
const res = await request(app)
.get("/leave/abs/history")
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(400);
expect(res.body.message).toMatch(/invalid staffid/i);
});


it("should fail when employee not found", async () => {
const res = await request(app)
.get("/leave/9999999/history")
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(400);
expect(res.body.message).toMatch(/employee not found/i);
});



//getleavebyid
it("should fail when leave id is invalid", async () => {
const res = await request(app)
.get("/leave/abc")
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(400);
expect(res.body.message).toMatch(/invalid leaveid/i);
});



it("should fail when leave is not found", async () => {
const res = await request(app)
.get("/leave/999999")
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(400);
expect(res.body.message).toMatch(/leave not found/i);
});




it("should list all leave requests", async () => {
const res = await request(app)
.get("/leave")
.set("Authorization", `Bearer ${Admintoken}`);

expect(res.statusCode).toBe(200);

});


//deleteleave
it("should fail when deleting non-existing leave", async () => {
const res = await request(app)
.delete("/leave/999999")
.set("Authorization", `Bearer ${token}`);

expect(res.statusCode).toBe(400);
expect(res.body.message).toMatch(/leave not found/i);
});

})