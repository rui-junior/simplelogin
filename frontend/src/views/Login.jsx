import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom'
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

            setMessage('Complete corretamente os campos')

        } else {

            Axios.post('http://localhost:8000/', {

                usuario: usuario,
                senha: senha

            }, {
                //Só funcionou com o parametro separado no frontend, erro do cors / TEM QUE SER SEPARADO DO DATA AXIOS
                withCredentials: true
            })

                .then(response => {

                    if(response.data.login){

                        setMessage('Logado com sucesso')
                        setLogged(true)

                    } else {

                        setMessage('Usuário ou senha incorretos')

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

    const logout = () => {

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setLogged(false)
        setMessage('')

    }



    return (

        <Card>

            <form onSubmit={handleSubmit} className={styleCard.form}>

                <label>User Name:</label>
                <input type='text' name='usuario' className={styleInput.input} />

                <label>Password:</label>
                <input type='password' name='senha' className={styleInput.input} />

                <button className={styleButton.register}>Login</button>

            </form>

            <label className={styleMessage.message}>{message}</label>

            <div>
                <label>
                    <Link to="/cadastro">Register a new User</Link>
                </label>
            </div>

            {logged ? (

                <React.Fragment>

                    <button onClickCapture={logout}>Logout</button>

                </React.Fragment>

            ) : ''}

        </Card>

    )

}