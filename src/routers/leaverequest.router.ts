import { Express } from "express";
import * as leaverequest from "../controllers/leaverequest.controllers"


const requestleaveroutes = (app:Express) => {
        app.post('/leave',leaverequest.requestleave)
        app.get('/leave/:id/history',leaverequest.leavehistory)
        app.get('/leave/:id',leaverequest.getleavebyid)
        app.get('/leave', leaverequest.listallrequests)
        app.put('/leave/:id',leaverequest.updateleave)
        app.delete('/leave/:id',leaverequest.deleteleave)
}

export default requestleaveroutes;