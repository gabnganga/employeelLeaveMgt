import express from 'express'
import leaverequestroutes from './routers/leaverequest.router';
import userroutes from './routers/users.router';
import commentsrouters from './routers/comments.routers';
import cors from 'cors'
import reportsRoutes from './routers/reports.routers';



const initializeApp = () =>{

    const app = express();

    app.use(express.json()); 
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET","POST","PUT", "DELETE"],
    }))


        leaverequestroutes(app)
        userroutes(app)
        commentsrouters(app)
        reportsRoutes(app)

    app.get('/', (_, res) => {
        res.send("Hello, express API is running...");
    });

    return app;

}

const app = initializeApp();

export default app;



