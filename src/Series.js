import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Series = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/api/series').then(res => {
            setData(res.data.data);
        })
    }, [])

    const deleteSerie = id => {
        axios.delete('/api/series/' + id)
        .then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }

    const renderizaLinha = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => {deleteSerie(record.id)}}>Remover</button>
                    <Link className="btn btn-info" to={'/series/' + record.id}>INFO</Link>
                </td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <h1>Séries</h1>
                <Link to='/series/novo' className="btn btn-info">Nova série</Link>
                <div className="alert alert-warning" role="alert">
                    Você não possui séries criadas!
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Séries</h1>
            <Link to='/series/novo' className="btn btn-info">Nova série</Link>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
            {/* <pre>{JSON.stringify(data)}</pre> */}
        </div>
    )
}

export default Series;
