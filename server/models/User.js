import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        trim:true,
        required:'Firstname is required!'
    },
    last_name:{
        type:String,
        trim:true,
        required:'Firstname is required!'
    },
    image:{
        data:Buffer,
        contentType:String
    },
    email:{
        type:String,
        unique:'Email already exists!',
        required:'Email is required!',
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address!']
    },
    phone:{
        type:Number,
        trim:true,
        required: 'Phone number is required!'
    },
    password:{
        type:String,
        required: 'Password is required!',
        match:[/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Password must be Minimum eight characters, at least one letter and one number!']
    },
    salt:String,
    title:{
        type:String,
        default: 'Normal User'
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isTeacher:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

UserSchema.methods={
    encryptPassword: function(text){
        return crypto.createHmac('sha256',this.salt).update(text).digest('hex')
    },
    matchPasswords: function(text){
        return this.encryptPassword(text) === this.password
    }
}


UserSchema.pre('save', function () {
    this.salt = crypto.randomBytes(20).toString('hex')
    this._password = this.password
    this.password = this.encryptPassword(this._password)
})


UserSchema.path('phone').validate(function(v){
    if(this.phone && this.phone.toString().length !== 10){
        this.invalidate('phone','Phone number must be 10 digits!')
    }
})



const User = mongoose.model('User',UserSchema)
export default User;