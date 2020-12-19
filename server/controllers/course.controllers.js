import Course from './../models/Course'
import ErrorHandler from './../helpers/dbErrorHandler'
import { extend } from "lodash";
import formidable from 'formidable'
import fs from 'fs'

const create = async(req,res)=>{
    try {
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req,async(err,fields,files)=>{
            if(err){
                return res.status(400).json({
                    error: "Photo couldn't be uploaded!"
                })
            }
            let course = new Course(fields)
            course.instructor = req.auth._id

            // const course = new Course({
            //     name:fields.name,
            //     description: fields.description,
            //     image: fields.image,
            //     category: fields.category,
            //     instructor:req.auth._id
            // })
            if(files.image){
                course.image.data =fs.readFileSync(files.image.path)
                course.image.contentType = files.image.type
            }

            await course.save()
            return res.status(201).json({
                message: 'Course Created!',
                course
            })
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
        const courses = await Course.find().select('-_v').populate('instructor')
        return res.status(200).json(courses)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const courseById = async(req,res,next,id)=>{
    try {
        const course = await Course.findById(id).populate('instructor')
        if(!course){
            return res.status(404).json({
                error:"Course doesn't exists!"
            })
        }
        req.course = course
        return next()
    } catch (err) {
        return res.status(500).json({
            error: "Could not retrive course!"
        })
    }
}

const read = (req,res)=>{
    return res.status(200).json(req.course)
}

const update =async (req,res)=>{
    try {
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req,async(err,fields,files)=>{
            if(err){
                return res.status(400).json({
                    error: "Photo couldn't be uploaded!"
                })
            }
            let course = req.course
            course = extend(course,fields)
            if(fields.lessons){
                course.lessons = JSON.parse(fields.lessons)
            }
            if(files.image){
                course.image.data =fs.readFileSync(files.image.path)
                course.image.contentType = files.image.type
            }

            await course.save()
            return res.status(201).json({
                message: 'Course Upldated!',
                course
            })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: ErrorHandler.getErrorMessage(err)
        })
    }
}

const remove = async(req,res)=>{
    try {
        const course = req.course
        await course.remove()
        return res.status(200).json({
            message: 'Course Deleted!'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const getImage = (req,res)=>{
    res.set('Content-Type',req.course.image.contentType)
    return res.send(req.course.image.data)
}

// Adding lessons
const newLesson = async(req,res)=>{
    try {
        const lesson = req.body.lesson
        if(lesson){
            const updatedCourse = await Course.findByIdAndUpdate(req.course._id,{$push:{lessons:lesson}},{new:true}).populate('instructor') 
            return res.status(200).json(updatedCourse)
        }else{
            return res.status(400).json({
                error: 'No lessons!'
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: ErrorHandler.getErrorMessage(err)
        })
    }
}

// Find Courses of a specific User
const listByInstructor = async (req,res)=> {
    try {
        const courses = await Course.find({instructor: req.profile._id}).populate('instructor')
        return res.status(200).json(courses)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

// List published 
const listPublished = async(req,res)=>{
    try {
        const courses = await Course.find({published:true}).populate('instructor')
        return res.status(200).json(courses)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }    
}

export {getImage,list,create,remove,update,read,courseById,newLesson,listByInstructor,listPublished}