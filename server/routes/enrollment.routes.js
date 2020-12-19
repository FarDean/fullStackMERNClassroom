import express from 'express'
import { isStudent, requireSignin } from '../controllers/auth.controllers'
import { courseById } from '../controllers/course.controllers'
import { complete, create, enrollmentById, find , read, list,stats} from '../controllers/enrollment.controllers'

const router = express.Router()


// Enroll Course
router.route('/api/v1/enrollment/new/:courseId')
    .get(requireSignin,find,create)

router.param('courseId',courseById)

router.param('enrollmentId',enrollmentById)

// get Enrollment
router.route('/api/v1/enrollments/:enrollmentId')
    .get(requireSignin,isStudent,read)

// Complete Course
router.route('/api/v1/enrollment/complete/:enrollmentId')
    .put(requireSignin,isStudent,complete)

router.route('/api/v1/enrollments')
    .get(requireSignin,list)


// Stats
router.route('/api/v1/stats/:courseId')
    .get(stats)

export default router;