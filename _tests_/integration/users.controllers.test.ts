import request from "supertest"
import app from "../../src/index"
import { getPool } from "../../src/db/config"
import bcrypt from "bcrypt"

let pool:any
let token:any
beforeAll(async () => {
    pool = await getPool()

    const hashedpassword = await bcrypt.hash("tester",10)


        await pool.request().query(`
        INSERT INTO users (staffid, username, email, password, role) 
        VALUES (2673,'API Tester', 'tester@tester.com', '${hashedpassword}', 'Admin')
            `);
        
     const loginRes = await request(app)
    .post("/login")
    .send({
      email: "tester@tester.com",
      password: "tester"
    });

  token = loginRes.body.token;
});


afterAll(async () => {
    await pool.request().query("DELETE FROM users WHERE email LIKE '%@tester.com'")
    await pool.close()
})

describe("User API Integration Test Suite", () => {

    it("should authenticate a user and return a token", async() =>{
        const res = await request(app).post('/login').send({
            email: "tester@tester.com",
            password: "tester"
        });

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty("token");
        expect(res.body.message).toMatch(/Login successful/i)
        expect(res.body.user.Email).toBe("tester@tester.com")
    });

    it("should fail with a wrong password", async() =>{
        const res = await request(app).post('/login').send({
            email: "tester@tester.com",
            password: "wrongpass"
        });
        expect(res.statusCode).toBe(401)
        expect(res.body.error).toMatch(/invalid credentials/i)
        });

    it("should fail with a non existence user on login ", async() =>{
        const res = await request(app).post('/login').send({
            email: "nonexistent@tester.com",
            password: "tester"
        });
        expect(res.statusCode).toBe(404)
        expect(res.body.error).toMatch(/User not found/i)
        });
    


        //Get all users
        it("should fetch all users successfully", async () => {

        const res = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");
       
        });

        //get user by id

            it("should fetch a user by id successfully", async () => {
            const res = await request(app)
                .get("/users/2673")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("email");
            expect(res.body.email).toBe("tester@tester.com");
            });

              it("should fail when staffid is invalid", async () => {
                const res = await request(app)
                .get("/users/abc")
                .set("Authorization", `Bearer ${token}`);

                expect(res.statusCode).toBe(400);
                expect(res.body.message).toMatch(/invalid staffid/i);
             });

               it("should return error if user not found", async () => {
                const res = await request(app)
                .get("/users/999999")
                .set("Authorization", `Bearer ${token}`);

                expect(res.statusCode).toBe(400);
                expect(res.body.message).toMatch(/user not found/i);
            });
    

    //create user


     it("should create a new user successfully", async () => {
                const res = await request(app)
                .post("/users")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    staffid: 3333,
                    username: "New User",
                    email: "newuser@tester.com",
                    password: "pass123",
                    role: "Employee"
                });

                expect(res.statusCode).toBe(201);
                expect(res.body.message).toBe("User has been created successfully");
            });

        
    //update user

      it("should update a user successfully", async () => {
                const res = await request(app)
                .put("/users/2673")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    username: "Updated Tester",
                    email: "tester@tester.com",
                    role: "Employee"
                });

                expect(res.statusCode).toBe(200);
            });



      it("should fail to update non-existing user", async () => {
            const res = await request(app)
            .put("/users/999999")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "salavender@gmail.com"
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toMatch(/user not found/i);
        });


        //update password
       it("should update password successfully", async () => {
                    const res = await request(app)
                    .put("/users/2673/password")
                    
                    .send({
                        password: "tester"
                    });

                    expect(res.statusCode).toBe(200);
                });   




        //deleteuser

      it("should delete a user successfully", async () => {
            const res = await request(app)
            .delete("/users/3333")
            .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            });

    
    it("should fail to delete non-existing user", async () => {
            const res = await request(app)
            .delete("/users/999999")
            .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toMatch(/user not found/i);
          });      

})
