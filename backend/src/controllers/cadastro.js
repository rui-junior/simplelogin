
const schema = require('../database/schema')
const bcrypt = require('bcrypt')

exports.cadastro = async (req, res) => {

    const { usuario, senha } = req.body

    const salt = await bcrypt.genSaltSync(10);
    let passwordhash = await bcrypt.hash(senha, salt);
    
    const dados = new schema({

        usuario: usuario,
        senha: passwordhash

    })

    const user = schema.findOne({usuario : usuario})
    .then(user => {
        
        if(user){

            res.send({ "login": false })
            return
            
        }
        
        try {
            
            dados.save()
            res.send({ "login": true })
            
        } catch (error) {
            
            res.send(error)
            
        }

    })



}
