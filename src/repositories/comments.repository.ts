import { getPool } from "../db/config"
import { NewComment } from "../types/comments.types";

 export const getcommentbyid = async(id:number) =>{
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id',id)
        .query('SELECT * FROM comments WHERE commentid = @id')
        return result.recordset[0]
 }


 export const newcomment = async (comment: NewComment) => {
     const pool = await getPool();
     await pool
         .request()
         .input('leaveid',comment.leaveid)
         .input('comment', comment.comment)
         .input('status', comment.status)
         .input('managerid', comment.managerid)
         .query('INSERT INTO comments (leaveid, comment, status, managerid) VALUES(@leaveid, @comment, @status, @managerid)')
     return {message:'Your comment Has Been Created Successfully'}
 }

 export const updatecomment = async (id:number, comment:NewComment) => {
     const pool = await getPool();
     await pool
        .request()
        .input('id',id)
         .input('leaveid',comment.leaveid)
         .input('comment', comment.comment)
         .input('status', comment.status)
         .input('managerid', comment.managerid)
        .query('UPDATE comments SET leaveid=@leaveid, comment=@comment, status=@status, managerid=@managerid WHERE commentid=@id')
    return {message:'Your Comment Has Been Updated Successfully'}
}