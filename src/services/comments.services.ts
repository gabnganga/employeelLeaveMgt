import * as commentsrepository from "../repositories/comments.repository"
import { NewComment } from "../types/comments.types"


export const getcommentsbyid = async(id:number) =>{
if(isNaN(id)){
    throw new Error('invalid comment id')
}
const existingcomment = await commentsrepository.getcommentbyid(id)
if(!existingcomment){
    throw new Error('comment not available')
}
return existingcomment;
}


export const newcomment = async (comment: NewComment) => await commentsrepository.newcomment(comment);


export const updatecomment = async(id:number, comment:NewComment) => {
      if(isNaN(id)){
        throw new Error('Invalid comment id')
    }
    const existingcomment = await commentsrepository.getcommentbyid(id)
    if(!existingcomment){
        throw new Error('Comment Not Found')
    }
    return await commentsrepository.updatecomment(id,comment)

}


