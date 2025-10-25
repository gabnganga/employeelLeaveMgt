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
        .query('SELECT * FROM leaverequest WHERE staffid=@id')
        return result.recordsets
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
        const results = await pool.request().query('SELECT * FROM leaverequest')
        return results.recordset
}

