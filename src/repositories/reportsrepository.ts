
import { getPool } from "../db/config";


export const statusSummary = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT
      COALESCE(c.status, 'Pending') AS status,
      COUNT(*) AS total
    FROM leaverequest lr
    LEFT JOIN comments c ON lr.leaveid = c.leaveid
    GROUP BY c.status
  `);
  return result.recordset;
};


export const leaveTypeUsage = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT
      lt.leavetype,
      COUNT(*) AS total
    FROM leaverequest lr
    INNER JOIN leavetype lt ON lr.leavetypeid = lt.leavetypeid
    GROUP BY lt.leavetype
  `);
  return result.recordset;
};

export const topLeaveTakers = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT
      u.username,
      COUNT(*) AS totalLeaves
    FROM leaverequest lr
    INNER JOIN users u ON lr.staffid = u.staffid
    GROUP BY u.username
    ORDER BY totalLeaves DESC
    OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
  `);
  return result.recordset;
};


export const totalEmployees = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT COUNT(*) AS totalEmployees FROM users;
  `);
  return result.recordset[0].totalEmployees;
};

export const employeesOnLeaveToday = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT
      COUNT(DISTINCT lr.staffid) AS employeesOnLeave
    FROM leaverequest lr
    LEFT JOIN comments c ON lr.leaveid = c.leaveid
    WHERE
      CAST(GETDATE() AS DATE) BETWEEN lr.start_date AND lr.end_date
      AND c.status = 'Approved';
  `);
  return result.recordset[0].employeesOnLeave;
};


export const monthlyLeaveTrend = async () => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT
      FORMAT(lr.start_date, 'yyyy-MM') AS month,
      COUNT(*) AS totalLeaves
    FROM leaverequest lr
    GROUP BY FORMAT(lr.start_date, 'yyyy-MM')
    ORDER BY month DESC;
  `);
  return result.recordset;
};
