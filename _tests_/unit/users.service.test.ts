import * as userRepository from "../../src/repositories/users.repository";
import * as userServices from "../../src/services/users.services";
import { User } from "../../src/types/users.types";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//mocking external dependencies
jest.mock("../../src/repositories/users.repository")
jest.mock("bcrypt")
jest.mock('jsonwebtoken')




describe("User Service Test Suite", ()=>{
    afterEach(() => {
        jest.clearAllMocks()
    })

//create user

   it("should hash password and save user", async()=>{
        const mockUser = {
                staffid: 6793,
                username: "felis",
                email: "felis@gmail.com",
                password: "123456",
                role: "Employee"
        };
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");

    (userRepository.createUser as jest.Mock).mockResolvedValue({message: "User has been created successfully"});

        const result= await userServices.createUser(mockUser)

        expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10)
        expect(userRepository.createUser).toHaveBeenCalled()
        expect(result).toEqual({message: "User has been created successfully"})


   })
//list all users
    it("should return a list of users", async()=>{
        const mockUsers = [{
                staffid: 8042,
                username: "ADMIN",
                email: "adm@gmail.com",
                password: "hashedpassword",
                role: "Admin"
        },
    {
                staffid: 8002,
                username: "Gabriel",
                email: "gab@gmail.com",
                password: "hashedpassword",
                role: "Employee"      
    }];
    
        (userRepository.getAllUsers as jest.Mock).mockResolvedValue(mockUsers)

        const users = await userServices.listUsers()
        expect(users).toEqual(mockUsers)
        })
    


//getuserbyid
        it("should return user by id", async()=>{
           const mockUser = {
                staffid: 6793,
                username: "felis",
                email: "felis@gmail.com",
                password: "123456",
                role: "Employee"
        };

        (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser)

        const user = await userServices.getUserById(6793)
        expect(user).toEqual(mockUser)
        expect(userRepository.getUserById).toHaveBeenCalledWith(6793);

        })

//updateuser
    it("should update user", async()=>{
        const mockUser = {
                staffid: 6793,
                username: "felis",
                email: "felis@gmail.com",
                password: "123456",
                role: "Employee",
                
        };
    (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (userRepository.updateUser as jest.Mock).mockResolvedValue( {message: 'User has been updated successfully'})

    const result = await userServices.updateUser(6793, mockUser)

        expect(result).toEqual( {message: 'User has been updated successfully'})
        expect(userRepository.getUserById).toHaveBeenCalledWith(6793)
        expect(userRepository.updateUser).toHaveBeenCalled()
    })

    
//updatepassword
    it("should update password", async()=>{
        const mockUser = {
                staffid: 6793,
                username: "felis",
                email: "felis@gmail.com",
                password: "123456",
                role: "Employee"
        };

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (userRepository.updatepassword as jest.Mock).mockResolvedValue( {message: 'User has been updated successfully'})

    const result = await userServices.updatepassword(6793, mockUser)

        expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10)
        expect(userRepository.getUserById).toHaveBeenCalledWith(6793)
        expect(userRepository.updatepassword).toHaveBeenCalled()
        expect(result).toEqual({message: "User has been updated successfully"})
    })


//deleteuser
    it("should delete a user", async()=>{
                const mockUser = {
                staffid: 6793,
                username: "felis",
                email: "felis@gmail.com",
                password: "123456",
                role: "Employee"
        };
    (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);
    (userRepository.deleteUser as jest.Mock).mockResolvedValue({ message: "User has been deleted successfully" })

    const result = await userServices.deleteUser(6793)

    expect(result).toEqual({ message: "User has been deleted successfully" })
    expect(userRepository.getUserById).toHaveBeenCalledWith(6793);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(6793);
    })
})

//login successful
    it("should login a user successful", async()=>{
        const mockUser = {
                staffid: 6793,
                username: "felis",
                email: "felis@gmail.com",
                password: "hashedpassword",
                role: "Employee"
        };

    (userRepository.getUserbyEmail as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mocked-jwt-token");

    const result = await userServices.loginUser("felis@gmail.com","123456")

     expect(result).toEqual({
      message: "Login successful",
      token: "mocked-jwt-token",
      user: {
        Staffid: 6793,
        Email: "felis@gmail.com",
        Username: "felis",
        role: "Employee",
      }, 
    });
    expect(userRepository.getUserbyEmail).toHaveBeenCalledWith("felis@gmail.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashedpassword");
    expect(jwt.sign).toHaveBeenCalled();

    })