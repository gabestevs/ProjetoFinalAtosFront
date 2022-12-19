import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../layout/Header'
import { Back } from '../components/Back'
import { PageTitle } from '../components/PageTitle'

export function NotFound(){
    return (
        <>

            <Header />

            <div className="page-content">

            <Back />

            

            <div className="page-error">
                <PageTitle title="Erro 404" />
                <div className="pageSubTitle">
                    <h3>Página não encontrada</h3>
                </div>
                <Link to="/" style={{color:`#fff`, textDecoration:`none`, marginTop:`30px`}}>Ir para o painel</Link>
            </div>

            </div>
        </>
    )
}