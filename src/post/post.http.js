const postControllers = require("./post.controllers");

const getAll = (req, res) => {
  const data = postControllers.getAllPosts();
  res.status(200).json({ items: data.length, users: data });
};

const getById = (req, res) => {
  const id = req.params.id;
  const data = postControllers.getPostById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `The user with the id ${id} does not exits` });
  }
};

// "id": "uuid",
// "title": "string",
// "content":"string",
// "header_image": "url_to_img",
// "user_id": "uuid",//Aqui hara referencia al usuario de tu userDB
// "published": true

const register = (req, res) => {
  const data = req.body;
  const user = req.user.id;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content  
  ) { 
    return res.status(400).json({
      message: "These fields must be completed",
      fields: {
        title: "string",
        content:"string"
      },
    });
  } else {
    const response = postControllers.createPost(data, user);
    return res
      .status(201)
      .json({
        message: `Post created succesfully with id: ${response.id}`,
        post: response,
      });
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  const user = req.user.id
  const data = postControllers.deletePost(id, user);

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = req.user.id
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content  
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content:"string"
      },
    });
  } else {
    const response = postControllers.editPost(id, data, user)
    return res.status(200).json({
      message: 'Post edited succesfully',
      post: response
    })
  }
};


const getAllUserPosts = (req, res) => {
  const id = req.user.id;
  const data = postControllers.getAllPostByUser(id)
  res.status(200).json(data)
}

const getEspecificUserPost = (req, res) => {
    const id = req.params.id;
    const user = req.user.id;
    const data = postControllers.getUserPostById(user, id);
    if(data){
    res.status(200).json(data)
    }else{
    res.status(404).json({message: 'Post doest not exist'})
    }
}


module.exports = {
    getEspecificUserPost,
    getAllUserPosts,
    remove,
    edit,
    register,
    getAll,
    getById
};