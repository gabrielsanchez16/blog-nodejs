const postControllers = require('./post.controllers')


const getAll = (req, res) => {
    const data = postControllers.getAllPost();
    res.status(200).json({ items: data.length, post: data })
}


const getById = (req, res) => {
    const id = req.params.id;

    const data = postControllers.getPostById(id)

    if (data) {
        res.status(200).json(data)
    } else {
        res.status(404).json({ message: `el post con el id ${id} no existe` })
    }
}


const register = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ message: 'Missing Data' })
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image 
    ) {
        return res.status(400).json({
            message: 'All fiels must be completed', fields: {
                title: 'string',
                content: 'string',
                header_image: 'string'
        }});
    } else {
        const response = postControllers.createPost(data)
        return res.status(201).json({ message: `post created succesfuly with id: ${response.id}`, post: response })
    };


}

const remove = (req, res) => {
    const id = req.params.id;
    const data = postControllers.deletePost(id);

    if (data) {
        return res.status(200).json({ message: "Post delete correct" });
    } else {
        return res.status(400).json({ message: "Invalid id" });
    }
}

const edit = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    if (!Object.keys(data).length) {
        return res.staus(400).json({ message: 'Missing Data' })
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image 
    ) {
        return res.status(400).json({
            message: 'All fiels must be completed', fields: {
                title: 'string',
                content: 'string',
                header_image: 'string'
            },
        });
    } else {
        const response = postControllers.editPost(id, data)

        return res.status(200).json({
            message: 'post edited succesfuly',
            post: response
        })
    }
}



module.exports = {
    getAll,
    getById,
    edit,
    remove,
    register
}