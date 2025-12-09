import { getPool } from "../db/config";
import { leaverequests, Newleaverequest, updateleaverequest } from "../types/leaverequest.types";

export const requestleave = async (leave:Newleaverequest) => {
    const pool = await getPool();
    await pool
        .request()
        .input('staffid',leave.staffid)
        .input('leavetypeid', leave.leavetypeid)
        .input('start_date', leave.start_date)
        .input('end_date', leave.end_date)
        .query('INSERT INTO leaverequest (staffid, leavetypeid, start_date, end_date) VALUES(@staffid, @leavetypeid, @start_date, @end_date)')
    return {message:'Your Leave Request Has Been Created Successfully'}
}

export const leavehistory = async(id:number) =>{
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id',id)
        .query(`
            SELECT 
                lr.leaveid,
                lr.staffid,
                lt.leavetypeid,
                lt.leavetype,
                lr.start_date,
                lr.end_date,
                c.status,
                c.comment
            FROM leaverequest lr
            JOIN leavetype lt ON lr.leavetypeid = lt.leavetypeid
            LEFT JOIN comments c ON lr.leaveid = c.leaveid
            WHERE lr.staffid=@id
        `)
    return result.recordset;
}


export const getleavebyid = async(id:number) =>{
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id',id)
        .query('SELECT * FROM leaverequest WHERE leaveid=@id')
        return result.recordset[0]
}



export const Allleaverequests = async (): Promise<leaverequests[]> => {
    const pool = await getPool();
    const results = await pool.request().query(`
        SELECT
            lr.leaveid, 
            u.staffid,
            u.username,
            lt.leavetype,
            lr.start_date,
            lr.end_date,
            c.status,
            c.comment
        FROM leaverequest lr
        JOIN users u ON lr.staffid = u.staffid
        JOIN leavetype lt ON lr.leavetypeid = lt.leavetypeid
        LEFT JOIN comments c ON lr.leaveid = c.leaveid
        WHERE c.status IN ('Pending', 'Approved','Rejected') or c.status IS NULL
        ORDER BY lr.leaveid ASC
    `);

    return results.recordset;
};




export const updateleave = async (id:number, leave:updateleaverequest) => {
    const pool = await getPool();
    await pool
        .request()
        .input('id',id)
        .input('leavetypeid', leave.leavetypeid)
        .input('start_date', leave.start_date)
        .input('end_date', leave.end_date)
        .query('UPDATE leaverequest SET leavetypeid=@leavetypeid, start_date=@start_date, end_date=@end_date  WHERE leaveid=@id')
    return {message:'Your Leave Request Has Been Updated Successfully'}
}


export const deleterequest = async(id:number) =>{
    const pool = await getPool();
        await pool
        .request()
        .input('id',id)
        .query('DELETE FROM leaverequest WHERE leaveid=@id')
        return {message:'Your Leave Request Has Been Deleted Successfully'}
}
