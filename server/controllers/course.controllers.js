import Course from './../models/Course'
import ErrorHandler from './../helpers/dbErrorHandler'

const create = async(req,res)=>{
    try {
        const course = new Course(req.body)
        course.save()
        return res.status(201).json({
            message: 'Course Created!',
            course
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: ErrorHandler.getErrorMessage(err)
        })
    }
}

const list = async(req,res)=>{
    try {
        const courses = await Course.find().select('-_v')
        return res.status(200).json(courses)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

