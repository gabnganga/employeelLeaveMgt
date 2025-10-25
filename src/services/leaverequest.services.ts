import * as leaverequest from "../repositories/leaverequest.repository"
import { Newleaverequest, updateleaverequest } from "../types/leaverequest.types"

export const requestleave = async(leave: Newleaverequest) => await leaverequest.requestleave(leave)




export const leavehistory = async(id:number) =>{
    if(isNaN(id)){
        throw new Error('Invalid Staffid')
    }
    const existingstaff = await leaverequest.leavehistory(id)
    if(!existingstaff){
        throw new Error('Employee not Found!')
    }
    return existingstaff;
}

export const getleavebyid = async(id:number) =>{
    if(isNaN(id)){
        throw new Error('Invalid leaveid')
    }
    const existingleave = await leaverequest.getleavebyid(id)
    if(!existingleave){
        throw new Error('Leave Not Existing!')
    }
    return existingleave;
}


export const listrequests = async () => await leaverequest.Allleaverequests()


