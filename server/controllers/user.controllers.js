import User from './../models/User'
import ErrorHandler from './../helpers/dbErrorHandler'
import { extend } from "lodash";

const create=async(req,res)=>{
    try {
        const user =new User(req.body) 
        await user.save()
        return res.status(201).json({
            message: 'user created'
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: ErrorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req,res)=>{
    try {
        const users =await User.find().select('-salt -password -email -phone -__v')
        return res.status(200).json(users)
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: ErrorHandler.getErrorMessage(err)
        })
    }
}

const userById = async(req,res,next,id)=>{
    try {
        const user = await User.findById(id).select('-salt -password')
        if(!user){
            return res.status(404).json({
                error: 'User not found!'
            })
        }
        req.profile = user
        return next()
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            error: 'User doesnt exist!'
        })
    }
}

const read = (req,res)=>{
    let user = req.profile
    if(!user.isAdmin){
        user.email= undefined
        user.phone = undefined
    }
    return res.status(200).json(user)
}

const update = async(req,res)=>{
    try {
        let user =req.profile
        user = extend(user,req.body)
        await user.save()
        return res.status(201).json({
            user:{
                first_name:user.first_name,
                last_name:user.last_name,
            },
            message:"user updated"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}
const remove = async(req,res)=>{
    try {
        const user = req.profile
        await user.remove()
        return res.status(200).json({
            message:"user deleted!"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

export {remove,create,list,read,update,userById}