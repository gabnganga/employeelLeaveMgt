import * as userRepository from "../repositories/users.repository";
import { User } from "../types/users.types";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const createUser = async (user: User) => {
     if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
        console.log(user.password);
    }
  return await userRepository.createUser(user);

}

export const listUsers = async () => await userRepository.getAllUsers();



export const getUserById = async (id: number) => {
  if (isNaN(id)) {
    throw new Error("Invalid staffid");
  }

  const existingUser = await userRepository.getUserById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  return existingUser;
};


export const updateUser = async (id: number, user: User) => {

  if (isNaN(id)) {
    throw new Error("Invalid staffid");
  }

  const existingUser = await userRepository.getUserById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  return await userRepository.updateUser(id, user);
}



export const updatepassword = async (id: number, user: User) => {
       if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
        console.log(user.password);
    }
  if (isNaN(id)) {
    throw new Error("Invalid staffid");
  }

  const existingUser = await userRepository.getUserById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  return await userRepository.updatepassword(id, user);
}



export const deleteUser = async (id: number) => {
  if (isNaN(id)) {
    throw new Error("Invalid staffid");
  }

  const existingUser = await userRepository.getUserById(id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  return await userRepository.deleteUser(id);
}



export const loginUser = async (email: string, password: string) => {
    // 1. Find user by email
    const user = await userRepository.getUserbyEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    // 2. Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // 3. Create JWT payload
    const payload = {
        sub: user.staffid,    // Subject (user ID)
        username: user.username,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
    }

    // 4. Generate JWT token
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error('JWT secret not defined');
    const token = jwt.sign(payload, secret);

    // 5. Return token + user details (without password)
    return {
        message: 'Login successful',
        token,
        user: {
           Staffid: user.staffid,
            Email: user.email,
            Username: user.username,
            role: user.role,
        }
    }
}