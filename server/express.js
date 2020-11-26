if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
import express from 'express'
const app = express()

import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'

app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())

app.get('/',(req,res)=>{
    return res.send('Hi Motherfucker!')
})

export default app;