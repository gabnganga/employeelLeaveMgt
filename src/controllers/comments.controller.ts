import * as commentsservices from "../services/comments.services"
import {Request, Response} from "express";

export const getcommentbyid = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    
    try{
        const result = await commentsservices.getcommentsbyid(id)
        res.status(200).json(result)
    }catch (error:any) {
        if(error.message === 'invalid comment id') {
            res.status(400).json({message:'invalid comment id'})
        }else if(error.message == 'comment not available'){
            res.status(400).json({message:'comment not available'})
        }else{
            res.status(500).json({error:'Internal Server Error'})
        }
    }
}

export const newcomment = async (req:Request, res:Response) => {
    
    try {
        const comment =req.body;
        const result = await commentsservices.newcomment(comment);
        res.status(201).json(result);
} catch (error) {
    res.status(500).json({error: 'Internal Server error'})
}}


export const updatecomment= async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    const comment = req.body
    try{
        const result = await commentsservices.updatecomment(id, comment)
        res.status(200).json(result)
    } catch (error:any) {
            if(error.message === 'Invalid comment id') {
        res.status(400).json({message:'Invalid comment id'})
    } else if (error.message == 'Comment Not Found') {
        res.status(400).json({message:'Comment Not Found'})
    } else {
    res.status(500).json({error: 'Internal Server error'})
    }
    }

}

