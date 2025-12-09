import app from "./index";
import dotenv from 'dotenv';
import { getPool } from './db/config';


dotenv.config();





const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})


getPool()
    .then(() => console.log("Database connected"))
    .catch((err: any) => console.log("Database connection failed: ", err));