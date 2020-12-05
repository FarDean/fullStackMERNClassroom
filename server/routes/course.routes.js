import express from 'express'

const router = express.Router()

router.route('/api/v1/courses')
    .get()
    .post()

router.param('courseId')

router.route('/api/v1/courses/:courseId')
    .put()
    .get()
    .delete()

export default router;