import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id]);

    useEffect(() => {
        axios.get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
                const found = genres.find(value => data.genre === value.name)
                if (found) {
                    setGenreId(found.id)
                }
            })
    }, [data])

    // Custom Header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = event => {
        setGenreId(event.target.value)
    }

    const onChange = field => event => {
        setForm({
            ...form,
            [field]: event.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios.put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId
        })
            .then(res => {
                setSuccess(true)
            });
    }

    if (success) {
        return <Redirect to="/series" />
    }

    return (
        <section>
            <header style={masterHeader}>
                <section className="h-100" style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <figure className="col-3">
                                <img src={data.poster} alt={data.name} className="img-fluid img-thumbnail" />
                            </figure>
                            <section className="col-8">
                                <h1 className="font-weight-bold text-white">{data.name}</h1>
                                <div className="lead text-white">
                                    { data.status === 'VISTO' && <Badge color='success'>Visto</Badge>}
                                    { data.status === 'INEDITO' && <Badge color='warning'>Ainda não vi</Badge>}
                                    <p>Gênero: {data.genre}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </header>
            <section className="container">
                <button className="btn btn-primary" onClick={() => { setMode('EDIT') }}>Editar</button>
            </section>
            {
                mode === 'EDIT' &&
                <div className="container">
                    <h1>Editar série</h1>
                    <button className="btn btn-primary" onClick={() => { setMode('INFO') }}>Cancelar</button>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Insira uma nova série" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Comentários</label>
                            <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="name" placeholder="Comentários sobre a série" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Gêneros</label>
                            <select className="form-control" onChange={onChangeGenre} value={genreId}>
                                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'VISTO'} name="status" id="visto" value="VISTO" onChange={seleciona('VISTO')} />
                            <label className="form-check-label" htmlFor="visto">
                                VISTO  </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'INEDITO'} name="status" id="inedito" value="INEDITO" onChange={seleciona('INEDITO')} />
                            <label className="form-check-label" htmlFor="inedito">
                                INÉDITO </label>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={save}>Salvar</button>
                    </form>
                </div>
            }
        </section>
    )
}

export default InfoSerie;