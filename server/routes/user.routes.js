import express from 'express'
import { hasAuth,requireSignin,requireDAuth } from './../controllers/auth.controllers'
import { remove,create,list,read,update,userById,getImage,defaultImage, personalInfo } from "./../controllers/user.controllers";

const router = express.Router()

router.route('/api/v1/users')
    .get(requireSignin,list)
    .post(create)

router.param('userId',userById)

router.route('/api/v1/users/:userId')
    .get(requireSignin,read)
    .put(requireSignin,hasAuth,update)
    .delete(requireSignin,hasAuth,remove)

router.route('/api/v1/users/info/:userId')
    .get(requireSignin,requireDAuth,personalInfo)

router.route('/api/v1/users/:userId/image')
    .get(getImage,defaultImage)

export default router;