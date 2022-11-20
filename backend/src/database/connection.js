const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://ruijr:Mustang1970%23@cluster0.zt73cv9.mongodb.net/?retryWrites=true&w=majority/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /* other options */
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((erro) => console.log(erro))

module.exports = connection