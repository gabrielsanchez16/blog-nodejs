const router = require('express').Router()
const passport = require('passport')
const { roleAdmindMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http.js')
const postServices = require('../post/post.http.js')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)
    

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}),userServices.editMyUser)
    .delete(passport.authenticate('jwt',{session: false}), userServices.deleteMyUser)
    .get(passport.authenticate('jwt',{session: false}),userServices.getMyUser)

router.route('/:id') //*
    .get(passport.authenticate('jwt', {session: false}), userServices.getById)
    .put(passport.authenticate('jwt', {session: false}),roleAdmindMiddleware,userServices.edit)
    .delete(passport.authenticate('jwt', {session: false}),roleAdmindMiddleware,userServices.remove)

router.route('/me/posts')
    .get(passport.authenticate('jwt',{session: false}), postServices.getAllUserPosts)
    
router.route('/me/posts/:id')
    .get(passport.authenticate('jwt',{session: false}), postServices.getEspecificUserPost)
    .put(passport.authenticate('jwt',{session: false}), postServices.edit)
    .delete(passport.authenticate('jwt',{session:false}), postServices.remove)
    
exports.router = router 