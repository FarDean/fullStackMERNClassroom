import Course from "./../models/Course";
import ErrorHandler from "./../helpers/dbErrorHandler";
import { extend } from "lodash";
import formidable from "formidable";
import fs from "fs";

const create = async (req, res, next) => {
	try {
		let form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				return res.status(400).json({
					error: "Photos couldn't be uploaded!",
				});
			}
			let course = new Course(fields);
			course.instructor = req.auth._id;

			if (files) {
				for (let i in files) {
					course.images.push({
						data: fs.readFileSync(files[i].path),
						contentType: files[i].type,
					});
				}
			}

			await course.save();

			return res.status(201).json({
				message: "Course Created!",
				course,
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

const list = async (req, res) => {
	try {
		const courses = await Course.find().select("-_v").populate("instructor");
		return res.status(200).json(courses);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

const courseById = async (req, res, next, id) => {
	try {
		const course = await Course.findById(id).populate("instructor");
		if (!course) {
			return res.status(404).json({
				error: "Course doesn't exists!",
			});
		}
		req.course = course;
		return next();
	} catch (err) {
		return res.status(500).json({
			error: "Could not retrive course!",
		});
	}
};

const read = (req, res) => {
	req.course.lessons = undefined;
	return res.status(200).json(req.course);
};

const readAll = (req, res) => {
	if (req.profile._id.equals(req.course.instructor._id) || req.profile.isAdmin)
		return res.status(200).json(req.course);
	// console.log(req.course.instructor);
	return res.status(401).json({
		error: "You are not authorized!",
	});
};

const update = async (req, res) => {
	try {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, async (err, fields, files) => {
			if (err) {
				return res.status(400).json({
					error: "Photo couldn't be uploaded!",
				});
			}

			let course = req.course;
			course = extend(course, fields);
			if (fields.lessons) {
				course.lessons = JSON.parse(fields.lessons);
			}
			if (files) {
				const arr = [];
				for (let i in files) {
					arr.push({
						data: fs.readFileSync(files[i].path),
						contentType: files[i].type,
					});
				}
				course.images = arr;
			}

			await course.save();
			return res.status(201).json({
				message: "Course Upldated!",
				course,
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

const remove = async (req, res) => {
	try {
		const course = req.course;
		await course.remove();
		return res.status(200).json({
			message: "Course Deleted!",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

const getImage = (req, res) => {
	const photo = req.course.images.find(x => x._id == req.params.imageId);
	if (!photo) return res.status(404).json({ error: "Photo not found!" });
	res.set("Content-Type", photo.contentType);
	return res.send(photo.data);
};

// Adding lessons
const newLesson = async (req, res) => {
	try {
		const lesson = req.body;
		if (lesson) {
			const updatedCourse = await Course.findByIdAndUpdate(
				req.course._id,
				{ $push: { lessons: lesson } },
				{ new: true }
			).populate("instructor");
			return res.status(200).json({
				course: updatedCourse,
				message: "Lesson Added!",
			});
		} else {
			return res.status(400).json({
				error: "No lessons!",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

// Find Courses of a specific User
const listByInstructor = async (req, res) => {
	try {
		const courses = await Course.find({ instructor: req.profile._id }).populate("instructor");
		return res.status(200).json(courses);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

// List published
const listPublished = async (req, res) => {
	try {
		const courses = await Course.find({ published: true }).populate("instructor");
		return res.status(200).json(courses);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

export {
	getImage,
	list,
	create,
	remove,
	update,
	read,
	courseById,
	newLesson,
	listByInstructor,
	listPublished,
	readAll,
};
