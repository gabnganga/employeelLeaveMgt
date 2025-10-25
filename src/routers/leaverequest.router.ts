import { Express } from "express";
import * as leaverequest from "../controllers/leaverequest.controllers"


const requestleaveroutes = (app:Express) => {
        app.post('/leave',leaverequest.requestleave)
        app.get('/history/:id',leaverequest.leavehistory)
       app.get('/requests/:id',leaverequest.getleavebyid)
        app.get('/leave', leaverequest.listallrequests)

}

export default requestleaveroutes;