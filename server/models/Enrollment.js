import mongoose from 'mongoose'

const EnrollSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    lessonStatus:[{
        lesson:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Lesson'
        },
        complete: Boolean
    }],
    completed:Boolean
},{
    timestamps:true
})

const Enrollment = mongoose.model('Enrollment',EnrollSchema)
export default Enrollment;