const schema = require('../database/schema')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {

    const {usuario, senha} = req.body

    const dadosBD = await schema.findOne({ usuario })

    if(!dadosBD){

        res.send({ 
            "login": null
        })
        return

    }

    if(dadosBD.senha !== senha){

        res.send({ 
            "login": false
        })
        return

    }

    const token = await jwt.sign(

        {"id": dadosBD._id},
        'secret',
        { expiresIn: 300 }

    )

    // res.cookie('token', token, { httpOnly: true })

    res.send({
        "login": true,
        "token": token
    })

}