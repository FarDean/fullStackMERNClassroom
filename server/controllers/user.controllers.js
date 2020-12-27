import User from './../models/User'
import ErrorHandler from './../helpers/dbErrorHandler'
import { extend } from "lodash";
import formidable from 'formidable'
// import defaultproImage from './../../client/assets/images/default-avatar-profile-icon.jpg'
import defaultproImage from './../../client/assets/images/kos.jpg'
import path from 'path'
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
    user.email= undefined
    user.phone = undefined
    return res.status(200).json(user)
}

const personalInfo = (req,res)=>{
    return res.status(200).json(req.profile)
}

const confirmPassword = async(req,res,next)=>{
    try {
        const user = await User.findById(req.auth._id)
        const password = req.body.password
        if(!password) return res.status(400).json({
            error: 'Enter password!'
        })
        if(!user.matchPasswords(password)) return res.status(400).json({
            error: 'Wrong password!',
            u:user.matchPasswords(password),
            user
        })
        return next()
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const update = async(req,res)=>{
    try {
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req,async(err,fields,files)=>{
            if(err){
                return res.status(400).json({
                    error: "Photo couldn't be uploaded!"
                })
            }
            if(fields.isAdmin && !req.auth.isAdmin){
                return res.status(400).json({
                    error: 'You dont have permission to change user roles!'
                })
            }
            let user = req.profile
            user = extend(user,fields)

            if(files.image){
                user.image.data =fs.readFileSync(files.image.path)
                user.image.contentType = files.image.type
            }

            await user.save()
            return res.status(201).json({
                message: 'User Upldated!',
                user
            })
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

const getImage = async(req,res,next)=>{
    if(req.profile.data){
        res.set('Content-Type',req.profile.image.contentType)
        res.send(req.profile.image.data)
    }
    return next()
}

const defaultImage = async(req,res)=>{
    return res.sendFile(path.join(__dirname +'/' + defaultproImage))
}

export {remove,create,list,read,update,userById,defaultImage,getImage,confirmPassword,personalInfo}