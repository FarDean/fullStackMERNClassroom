import express from "express";
import {
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
} from "./../controllers/course.controllers";
import { hasAdminAuth, isTeacher, requireSignin } from "./../controllers/auth.controllers";
import { userById } from "./../controllers/user.controllers";

const router = express.Router();

router
	.route("/api/v1/courses")
	.get(requireSignin, hasAdminAuth, list)
	.post(requireSignin, isTeacher, create);

router.param("courseId", courseById);
router.param("userId", userById);
// router.param('imageId')

router
	.route("/api/v1/courses/:courseId")
	.put(requireSignin, isTeacher, update)
	.get(read)
	.delete(requireSignin, isTeacher, remove);

router.route("/api/v1/courses/:courseId/image/:imageId").get(getImage);

// List courses of specific user
router.route("/api/v1/courses/by/:userId").get(requireSignin, listByInstructor);

// Add Lessons
router.route("/api/v1/courses/:courseId/lesson/new").put(requireSignin, isTeacher, newLesson);

// List Published Courses
router.route("/api/v1/published").get(listPublished);

// get course for edit
router.route("/api/v1/courses/:courseId/:userId").get(requireSignin, readAll);

export default router;
