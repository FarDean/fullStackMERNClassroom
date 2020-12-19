import express from 'express'
import { hasAuth,requireSignin } from './../controllers/auth.controllers'
import { remove,create,list,read,update,userById,getImage,defaultImage } from "./../controllers/user.controllers";

const router = express.Router()

router.route('/api/v1/users')
    .get(list)
    .post(create)

router.param('userId',userById)

router.route('/api/v1/users/:userId')
    .get(requireSignin,read)
    .put(requireSignin,hasAuth,update)
    .delete(requireSignin,hasAuth,remove)

router.route('api/v1/users/:userId/image')
    .get(getImage,defaultImage)

export default router;