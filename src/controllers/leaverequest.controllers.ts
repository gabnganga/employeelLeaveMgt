import {Request, Response} from "express";
import * as leaverequest from "../services/leaverequest.services"

export const requestleave = async (req:Request, res:Response) => {
    
    try {
        const leave =req.body;
        const result = await leaverequest.requestleave(leave);

        res.status(201).json(result);
} catch (error) {
    res.status(500).json({error: 'Internal Server error'})
}}


export const leavehistory = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)

    try{
        const result = await leaverequest.leavehistory(id)
        res.status(200).json(result)
    } catch (error:any) {
            if(error.message === 'Invalid Staffid') {
        res.status(400).json({message:'Invalid Staffid'})
    } else if (error.message == 'Employee not Found!') {
        res.status(400).json({message:'Employee not Found!'})
    } else {
    res.status(500).json({error: 'Internal Server error'})
    }
    }

}

export const getleavebyid = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)

    try{
        const result = await leaverequest.getleavebyid(id)
        res.status(200).json(result)
    } catch (error:any) {
            if(error.message === 'Invalid leaveid') {
        res.status(400).json({message:'Invalid leaveid'})
    } else if (error.message == 'Leave Not Found') {
        res.status(400).json({message:'Leave Not Found'})
    } else {
    res.status(500).json({error: 'Internal Server error'})
    }
    }

}

export const listallrequests = async (req:Request,res:Response) =>  {
    try {
        const leaves = await leaverequest.listrequests()
        res.status(200).json(leaves)
    } catch (error) {
        res.status(500).json({error: 'Internal Server error'})
    }
}




export const updateleave= async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    const leave = req.body
    try{
        const result = await leaverequest.updateleave(id, leave)
        res.status(200).json(result)
    } catch (error:any) {
            if(error.message === 'Invalid leaveid') {
        res.status(400).json({message:'Invalid leaveid'})
    } else if (error.message == 'Leave Not Found') {
        res.status(400).json({message:'Leave Not Found'})
    } else {
    res.status(500).json({error: 'Internal Server error'})
    }
    }

}

export const deleteleave = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)

    try{
        const result = await leaverequest.deleteleave(id)
        res.status(200).json(result)
    } catch (error:any) {
        if(error.message === 'Invalid leaveid') {
            res.status(400).json({message:'Invalid leaveid'})
    } else if (error.message == 'Leave Not Found') {
        res.status(400).json({message:'Leave Not Found'})
    } else {
    res.status(500).json({error: 'Internal Server error'})
    }
}
}


