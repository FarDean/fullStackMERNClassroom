import app from './express'

app.listen(process.env.PORT,(err)=>{
    if(err) console.error(err)
    console.log(`Server connected on ${process.env.PORT}`);
})