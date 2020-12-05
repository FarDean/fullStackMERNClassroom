if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
import express from 'express'
const app = express()

import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'

import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'

import {compile} from './devBundle'
compile(app)

const CURRENT_WORKING_DIRECTORY = process.cwd()
import path from 'path'

import Template from './../template'

app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())

app.use('/dist',express.static(path.join(CURRENT_WORKING_DIRECTORY,'dist')))

app.use('/',userRouter)
app.use('/',authRouter)

app.get('/',(req,res)=>{
    return res.send(Template())
})

app.use((err,req,res,next)=>{
    if(err.name === 'UnautherizedError'){
        
        res.status(401).json({
            error:err.name + ": " + err.message
        })
    }else if(err){
        res.status(400).json({
            error:err.name + ": " +err.message
        })
    }
})

export default app;