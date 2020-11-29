import User from './../models/User'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import { userById } from './user.controllers';

const signin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error: 'Please fill in all fields!'
            })
        }
    
        const user = await User.findOne({email})
        if(!user)return res.status(404).json({
            error: 'User not found!'
        })
    
        if(!user.matchPasswords(password)) return res.status(400).json({
            error: 'Wrong password!'
        })
    
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    
        res.cookie('t',token)
    
        return res.status(302).json(token)
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            error: 'Signing in failed!'
        })
    }
}

const signout = (req,res)=>{
    res.clearCookie('t')
    return res.status(200).json({
        message: 'Signed out!'
    })
}

const requireSignin = expressJwt({
    secret: 'kos',
    userProperty: 'auth',
    algorithms: ['HS256']
})

const hasAuth = async (req,res,next)=>{
    try {
        const user = await User.findById(req.auth._id)
        const autherized = req.auth && req.auth._id === user._id || user.isAdmin
        if(!autherized) return res.status(401).json({
            error: 'You are not autherized!'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong!'
        })
    }
    return next()
}

const hasAdminAuth = async (req,res,next)=>{
    try {
        const user = await User.findById(req.auth._id)
        const autherized = req.auth && user.isAdmin
        if(!autherized) return res.status(401).json({
            error: 'You are not autherized!'
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: 'Something went wrong!'
        })
    }

    return next()
}

const verify =async (req,res)=> {
    try {
        let user = await User.findById(req.params.userId)
        if(user.verified){
            return res.status(200).json({
                message: "You've already confirmed your email!"
            })
        }
        if(user.salt == req.params.verifyToken){
            user.verified = true
            await user.save()
            return res.status(200).json({
                message: 'Your account has been verified!'
            })
        }else{
            return res.status(400).json({
                error: 'Ivalid verify token!'
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong!'
        })
    }
}

export {hasAuth,requireSignin,signin,signout,hasAdminAuth,verify}