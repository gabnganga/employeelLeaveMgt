import * as commentscontrollers from "../controllers/comments.controller"
import { Express } from "express";


const commentsrouters = (app:Express) => {
        app.get('/approvals/:id',commentscontrollers.getcommentbyid)
        app.post('/approvals',commentscontrollers.newcomment)
        app.put('/approvals/:id',commentscontrollers.updatecomment)
}

export default commentsrouters;
