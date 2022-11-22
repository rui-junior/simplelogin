const schema = require('../database/schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {

    const {usuario, senha} = req.body

    const dadosBD = await schema.findOne({ usuario: usuario })

    if(dadosBD){

        if(bcrypt.compareSync(senha, dadosBD.senha)){

            const token = await jwt.sign(

                {"id": dadosBD._id},
                'secret',
                { expiresIn: 300 }
        
            )

            res.cookie('token', token)
            res.status(202).send({ 'login': true })
            
            return
            
        }
        
        res.send({ 'login': false })
        return

    }

    res.send({ 'login': false })

}