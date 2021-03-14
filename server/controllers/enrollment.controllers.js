import ErrorHandler from "./../helpers/dbErrorHandler";
import Enrollment from "../models/Enrollment";

const find = async (req, res, next) => {
	try {
		const enrollment = await Enrollment.findOne({
			student: req.auth._id,
			course: req.course._id,
		});
		if (!enrollment) {
			return next();
		} else {
			return res.status(200).json({
				enrollment,
				message:
					"You have already enrolled to this course!, Go to your Profile page and start learning!",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

const create = async (req, res) => {
	let newEnrollment = {
		course: req.course._id,
		student: req.auth._id,
	};
	newEnrollment.lessonStatus = req.course.lessons.map(lesson => {
		return { lesson: lesson, complete: false };
	});

	const enrollment = new Enrollment(newEnrollment);

	try {
		await enrollment.save();
		return res.status(200).json({
			enrollment,
			message: "Successfully enrolled!",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

const enrollmentById = async (req, res, next, id) => {
	try {
		const enrollment = await Enrollment.findById(id)
			.populate({ path: "course", populate: { path: "instructor" } })
			.populate("student", "_id first_name last_name");
		if (!enrollment)
			return res.status(404).json({
				error: "Enrollment not Found!",
			});
		req.enrollment = enrollment;
		return next();
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Couldnt retrieve the enrollment!",
		});
	}
};

const read = (req, res) => {
	return res.status(200).json(req.enrollment);
};

const complete = async (req, res) => {
	try {
		let updatedEnrollment = {};
		updatedEnrollment["lessonStatus.$.complete"] = req.body.complete;
		if (req.body.courseCompleted) updatedEnrollment.completed = req.body.courseCompleted;

		await Enrollment.updateOne(
			{ "lessonStatus._id": req.body.lessonStatusId },
			{ $set: updatedEnrollment }
		);
		return res.status(200).json({
			message: "Done!",
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
		const enrollments = await Enrollment.find({ student: req.auth._id }).populate("course");
		return res.status(200).json(enrollments);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

const stats = async (req, res) => {
	try {
		let stats = {};
		stats.totalEnrolled = await Enrollment.find({ course: req.course._id }).countDocuments();
		stats.totalCompleted = await Enrollment.find({ course: req.course._id })
			.exists("completed", true)
			.countDocuments();
		return res.status(200).json(stats);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: ErrorHandler.getErrorMessage(err),
		});
	}
};

export { create, find, enrollmentById, read, complete, list, stats };
