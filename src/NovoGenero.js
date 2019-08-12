import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    
    
    const onChange = event => {
        setName(event.target.value)
    } 

    const save = () => {
        axios.post('/api/genres', { name })
        .then(res => {
            setSuccess(true)
        });
    }

    if (success) {
        return <Redirect to="/generos" />
    }

    return (
        <div className="container">
            <h1>Gêneros</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Novo gênero</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Insira um novo gênero" />
                </div>
                <button type="button" className="btn btn-primary" onClick={save}>Salvar</button>
            </form>
        </div>
    )
}

export default NovoGenero;