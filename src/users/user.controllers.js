const uuid = require('uuid')
const crypt = require('../utils/crypt.js')

const userDB = [{
    "id": "c38c070f-4512-4065-bf1c-8b0d09cd4571",
    "first_name": "alejandro",
    "last_name": "sanchez",
    "email": "gabriel@gmail.com",
    "password": "$2b$10$Ab55gIlT3Lm3xA2kVRczCOYujRTny2SziPkQW.r083xu3j.tlgXmm",
    "phone": "",
    "birthday_date": "DD/MM/YYYY",
    "rol": "admind",
    "profile_image": "",
    "country": "string",
    "is_active": true,
    "verified": false
},{
    "id": "e91a4d77-664d-4ce5-8b81-78f90856bfd5",
    "first_name": "pibe",
    "last_name": "valderrama",
    "email": "valderrama@gmail.com",
    "password": "$2b$10$s0hOZfda/gLCXNS/EveTcuo42W3fLvwYBFTvoTrJjfgnZTHzKOYTm",
    "phone": "3146036737",
    "birthday_date": "16/08/1965",
    "rol": "normal",
    "profile_image": "g334dg",
    "country": "colombia",
    "is_active": true,
    "verified": false
  }]



const getAllUsers = () => {
    return userDB;
}


const getUserById = (id) => {
    const data = userDB.filter(item => item.id === id)
    return data ? data[0] : false;

    //? select * from users where id = ${id};
}

const createUser = (data) => {
    const newUser = {
        id: uuid.v4(), //obligatorio y unico
        first_name: data.first_name, //obligatorio
        last_name: data.last_name, //obligatorio
        email: data.email, //obligatorio
        password: crypt.hashPassword(data.password), //obligatorio
        phone: data.phone ? data.phone : '', //unico
        birthday_date: data.birthday_date, //obligatorio
        rol: "normal", //obligatorio y por defecto normal
        profile_image: data.profile_image ? data.profile_image : "",
        country: data.country, //obligatorio
        is_active: true, //obligatorio y por defecto true
        verified: false, //obligatorio y por defecto false
    }
    userDB.push(newUser);
    return newUser;
};


const deleteUser = (id) => {
    const index = userDB.findIndex(item => item.id = id)
    if (index !== -1) {
        userDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

const editUser = (id, data) => {
    const index = userDB.findIndex(item => item.id = id)
    if (index !== -1) {
        userDB[index] = {
            id: id, //obligatorio y unico
            first_name: data.first_name, //obligatorio
            last_name: data.last_name, //obligatorio
            email: data.email, //obligatorio
            password: userDB[index].password, //obligatorio
            phone: data.phone, //unico
            birthday_date: data.birthday_date, //obligatorio
            rol: data.rol, //obligatorio y por defecto normal
            profile_image: data.profile_image,
            country: data.country, //obligatorio
            is_active: data.is_active, //obligatorio y por defecto true
            verified: false //obligatorio y por defecto false
        }
        return userDB[index]
    } else {
        return createUser(data)
    }
}

const getUserByEmail = (email) => {
    const data = userDB.filter(item => item.email === email)
    return data ? data[0] : false;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail
}