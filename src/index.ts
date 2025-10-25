import express from 'express'
import { getPool } from './db/config';
import dotenv from 'dotenv';
import leaverequestroutes from './routers/leaverequest.router';


dotenv.config();
const app = express();

app.use(express.json()); 


app.get('/', (req, res) => {
    res.send("Hello, express API is running...");
});

leaverequestroutes(app)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})
getPool()
    .then(() => console.log("Database connected"))
    .catch((err: any) => console.log("Database connection failed: ", err));