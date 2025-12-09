import { getPool } from "../db/config";
import { User } from "../types/users.types";



export const createUser = async (user: User) => {
  const pool = await getPool();
  await pool
    .request()
    .input('staffid',user.staffid)
    .input('username',user.username)
    .input('email',user.email)
    .input('password',user.password)
    .input('role',user.role)
    .query( 'INSERT INTO users (staffid, username, email, password, role) VALUES (@staffid, @username, @email, @password, @role)');
  return { message: "User has been created successfully" };
};


export const getAllUsers = async (): Promise<User[]> => {
  const pool = await getPool();
  const result = await pool
  .request()
  .query('SELECT * FROM users');
  return result.recordset;
};


export const getUserById = async (id: number)=>{
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", id)
    .query("SELECT * FROM users WHERE staffid=@id");
  return result.recordset[0];
};



export const updateUser = async (id: number, user: User) => {
  const pool = await getPool();
  await pool
    .request()
    .input('id',id)
    .input('username',user.username )
    .input('email',user.email )
    .input('role',user.role )
    .query('UPDATE users SET username=@username, email=@email, role=@role  WHERE staffid=@id');
return { message: 'User has been updated successfully'};
};

export const updatepassword = async (id: number, user: User) => {
  const pool = await getPool();
  await pool
    .request()
    .input('id',id)
    .input('password',user.password)
    .query('UPDATE users SET  password=@password WHERE staffid=@id');
return { message: 'User has been updated successfully'};
};



export const deleteUser = async (id: number) => {
  const pool = await getPool();
  await pool
  .request()
  .input("id", id)
  .query("DELETE FROM users WHERE staffid=@id");
  return { message: "User has been deleted successfully" };
};

export const getUserbyEmail = async (email: string): Promise<User| null> => {
      const pool = await getPool();
      const result = await pool
      .request()
      .input('email',email)
      .query('SELECT * FROM users WHERE email = @email')
      
  
    return result.recordset[0] || null;
}