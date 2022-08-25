const router = require('express').Router()

const postServices = require('./post.http')


router.route('/')
    .post(postServices.register)
    .get(postServices.getAll)


router.route('/:id')
    .get(postServices.getById)


module.exports ={
    router
}