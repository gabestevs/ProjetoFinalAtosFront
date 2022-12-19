import { useState, useEffect } from 'react'
import api from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { CgPen, CgTrash, CgAdd } from 'react-icons/cg'
import { Header } from '../layout/Header'
import { Links } from './Links'
import { Page } from './Page'
import './Dashboard.css'

export function Dashboard() {

    const [list, setList] = useState([])
    const navigate = useNavigate()

    // GET Companies
    useEffect(() => {
        api.get('/company/')
            .then(response => {
                setList(response.data)
            })
            .catch((err) => {
                console.log(JSON.stringify(err))
            })
    }, [])

    function deleteCompany(id){
        api.delete(`/company/delete/${id}`)
        setList(list.filter(item => item.id !== id))
    }

    return (
        
        <>

            <Header />

            <div className="page-content">

                <div className="page-title">
                    <h1>Empresas</h1>
                </div>

                <div className="blocks">

                    <div className="block-link" key={`add`}>
                        <Link to="/add-company">
                            <div className="block-item">
                                <span className="icon-add"><CgAdd /></span>
                                <p>Adicionar Empresa</p> 
                            </div>
                        </Link>
                    </div>

                    {list.map(item => {
                        
                        return (
                            
                            <div className="block-link" key={`${item.id}`}>
                                <Link to={`/links/${item.id}/${item.name}`} className="block-link">
                                    <div className="block-item">        
                                        <p>{`${item.name}`}</p>
                                    </div>
                                </Link>

                                <div className="block-options">
                                    <Link className="botao-acao botao-editar" to={`/edit-company/${item.id}`} title="Editar"><CgPen /></Link>
                                    <span className="botao-acao botao-excluir" onClick={() => deleteCompany(item.id)} title="Excluir"><CgTrash /></span>
                                </div>
                            </div>
                            

                        )

                    })}

                </div>

            </div>

        </>
    )
}