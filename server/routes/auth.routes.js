import express from 'express'
import { signin,signout,verify } from "./../controllers/auth.controllers";

const router = express.Router()

router.route('/auth/signin')
    .post(signin)

router.route('/auth/signout')
    .get(signout)

router.route('/auth/verify/:userId/:verifyToken')
    .get(verify)

export default router;