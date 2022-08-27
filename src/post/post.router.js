const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const postServices = require('./post.http')

router.route('/') //* /api/v1/post/
    .get(postServices.getAll)
    .post(passport.authenticate('jwt',{session: false}), postServices.register)


router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),postServices.getById)

exports.router = router