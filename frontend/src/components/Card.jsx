import React, { useState } from "react";
import Axios from "axios";

import styleCard from './css/card.module.css'
import styleInput from './css/input.module.css'
import styleButton from './css/button.module.css'
import styleMessage from './css/message.module.css'


export default () => {

    const [message, setMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        const usuario = e.target.elements.usuario.value;
        const senha = e.target.elements.senha.value;

        if (usuario === '' || senha === '') {

            setMessage('Complete corretamente os campos')

        } else {

            // POST request using axios inside useEffect React hook
            Axios.post('http://localhost:8000/', {

                usuario,
                senha,

            })
                .then(response => {

                    if(response.data.login == null){

                        setMessage('O usuário não existe')
                        return

                    }

                    if(!response.data.login){

                        setMessage('Senha incorreta')
                        return

                    }

                    if(response.data.login){

                        const token = response.data.token
                        document.cookie = "token=" + token
                        setMessage('Logado com Sucesso')
                        
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

        <div className={styleCard.card}>

            <form onSubmit={handleSubmit} className={styleCard.form}>

                <input type='text' name='usuario' className={styleInput.input} />
                <input type='password' name='senha' className={styleInput.input} />
                <button className={styleButton.register}>Login</button>

            </form>

            <label className={styleMessage.message}>{message}</label>
        </div>

    )

}