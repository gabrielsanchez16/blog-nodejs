const uuid = require('uuid')

const postDB = [
    {

    }
]



const getAllPost = () => {
    return postDB;
}


const getPostById = (id) => {
    const data = postDB.filter(item => item.id === id)
    return data ? data[0] : false;

    //? select * from users where id = ${id};
}


const createPost = (data) => {
    const newPost = {
        id: uuid.v4(), //obligatorio y unico
        title: data.title,
        content: data.content,
        header_image: data.header_image,
        user_id: "uuid",//Aqui hara referencia al usuario de tu userDB
        published: true
    }
    postDB.push(newPost);
    return newPost;
};



const deletePost= (id) => {
    const index =postDB.findIndex(item => item.id = id)
    if (index !== -1) {
        postDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

const editPost = (id, data) => {
    const index = postDB.findIndex(item => item.id = id)
    if (index !== -1) {
        postDB[index] = {
            id: id, //obligatorio y unico
            title: data.title,
            content: data.content,
            header_image: data.header_image,
            user_id: "uuid",//Aqui hara referencia al usuario de tu userDB
            published: true
        }
        return postDB[index]
    } else {
        return createPost(data)
    }
}



module.exports = {
    getAllPost,
    getPostById,
    deletePost,
    editPost,
    createPost
}