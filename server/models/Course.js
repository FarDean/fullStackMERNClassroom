import mongoose from 'mongoose'

const LessonSchema = new mongoose.Schema({
    title:String,
    content:String,
    resource_url:String
})

const Lesson = mongoose.model('Lesson',LessonSchema)

const CourseSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: 'Name is Required'
    },
    description: {
        type: String,
        trim: true,
        required: 'Description is Required'
    },
    images: [{
        data:Buffer,
        contentType: String
    }],
    category: {
        type: String,
        required: 'Category is Required',
    },
    published: {
        type: Boolean,
        default:false
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lessons:[LessonSchema]
},{
    timestamps:true
})

const Course = mongoose.model('Course',CourseSchema)
export default Course;
