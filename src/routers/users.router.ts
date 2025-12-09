import { Express } from "express";
import * as userController from "../controllers/users.controllers";
import { adminOnly} from "../middleware/bearAuth";

const userroutes = (app:Express) => {
    app.post('/users',adminOnly, userController.createUser)
    app.get('/users', userController.listAllUsers)
    app.get('/users/:id', adminOnly,userController.getUserById)
    app.put('/users/:id', adminOnly,userController.updateUser)
    app.put('/users/:id/password', userController.updatepassword)
    app.delete('/users/:id',adminOnly, userController.deleteUser)
    app.post('/login',userController.loginUser)
}

export default userroutes;