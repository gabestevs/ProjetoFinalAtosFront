import React from 'react'

export function Footer(){

    const getYear = () => {
        let ano = new Date().getFullYear()
        return ano
    }

    return (
        <>
            <footer className="footer">
                <p>{getYear()} | Linkatalog | Projeto final Academia Java por Jonatas Gaspar</p>
            </footer>
        </>
    )
}