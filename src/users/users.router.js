const router = require('express').Router()
const passport = require('passport')
const { roleAdmindMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)
    

router.route('/me',)
    .put(passport.authenticate('jwt',{session: false}),userServices.editMyUser)
    .delete(passport.authenticate('jwt',{session: false}), userServices.deleteMyUser)
    .get(passport.authenticate('jwt',{session: false}),userServices.getMyUser)

router.route('/:id') //*
    .get(passport.authenticate('jwt', {session: false}), userServices.getById)
    .put(passport.authenticate('jwt', {session: false}),roleAdmindMiddleware,userServices.edit)
    .delete(passport.authenticate('jwt', {session: false}),roleAdmindMiddleware,userServices.remove)
    
exports.router = router 