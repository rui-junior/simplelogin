const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    usuario: {

        type: String,
        require: true,
        // colletion: 'login'

    },

    senha: {

        type: String,
        require: true,
        // colletion: 'login'

    },
    
})

module.exports = mongoose.model('loginuser', Schema)