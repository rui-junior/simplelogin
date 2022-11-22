import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Axios from "axios";

//components
import Card from '../components/Card'

import styleCard from '../components/css/card.module.css'
import styleInput from '../components/css/input.module.css'
import styleButton from '../components/css/button.module.css'
import styleMessage from '../components/css/message.module.css'

export default () => {

    const [message, setMessage] = useState('')
    const [logged, setLogged] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        const usuario = e.target.elements.usuario.value;
        const senha = e.target.elements.senha.value;

        if (usuario === '' || senha === '') {

            setMessage('Preencha os dados corretamente')

        } else {

            Axios.post('http://localhost:8000/cadastro', {

                usuario,
                senha,

            })

                .then(response => {

                    if(!response.data.login){

                        setMessage('User already exists')
                        setLogged(false)
                        
                    } else {

                        setLogged(true)

                    }

                    

                })

                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                })

            setMessage('')

        }

    }

    return (

        <Card>

            <form onSubmit={handleSubmit} className={styleCard.form}>

                <label>Register a Username and a Password</label>
                <label>Username:</label>
                <input type='text' name='usuario' className={styleInput.input} />

                <label>Password:</label>
                <input type='password' name='senha' className={styleInput.input} />

                <button className={styleButton.register}>Register</button>

            </form>

            <label className={styleMessage.message}>{message}</label>

            <div>
                <label>
                    <Link to="/">Login</Link>
                </label>
            </div>

            { logged ? <Navigate to="/" replace={true} /> : '' }


        </Card>

    )

}