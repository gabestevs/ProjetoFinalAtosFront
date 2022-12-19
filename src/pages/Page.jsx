import { useState, useEffect } from 'react'
import api from '../services/api'
import './Page.css'
import { useParams } from 'react-router-dom'
import { CgFacebook, CgTwitter,  } from 'react-icons/cg'
import { IoLogoWhatsapp } from 'react-icons/io'

export function Page(){

    const { id } = useParams()
    const [company, setCompany] = useState([])
    const [links, setLinks] = useState([])


    // GET Links
    useEffect(() => {

        api.get(`/company/${id}`)
        .then(response => {
            setCompany(response.data)
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
        })

        api.get(`/company/${id}/links`)
        .then(response => {
            setLinks(response.data)
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
        })

    }, [])

    function urlMount(){
        return `${window.location.protocol}//${window.location.hostname}/cardcompany/${id}/${name}`
    }

    return (
        <>

            <div className="page-final-container">
        
                <header className="top" style={{ width:'100%', height:'15px', backgroundImage: `linear-gradient(to left, ${company.color1}, ${company.color2})` }}>
                </header>

                <div className="page-final-title">
                    <h1 style={{ background: `linear-gradient(to left, ${company.color1}, ${company.color2})` }}>{company.name}</h1>
                </div>

                <div className="page-final-links">
                    {links.map(item => {
                        return (
                            <a href={`${item.link}`} target="_blank" key={item.id}><div className="page-final-links-item">{`${item.name} | ${item.link}`}</div></a>
                        )
                    })}
                </div>

                <div className="page-final-share">
                    <ul>
                        <li className="page-final-share-item"><a href={`https://www.facebook.com/share.php?u=${urlMount}`} className="facebook-color" target="_blank"><CgFacebook /></a></li>
                        <li className="page-final-share-item"><a href={`http://twitter.com/home?status=${urlMount}`} className="twitter-color" target="_blank"><CgTwitter /></a></li>
                        <li className="page-final-share-item"><a href={`whatsapp://send?text==${urlMount}`} className="whatsapp-color" target="_blank"><IoLogoWhatsapp /></a></li>
                    </ul>
                </div>

                <footer className="page-final-footer">
                    <p>CardCompany 2022 - Academia Java - AtoS</p>
                </footer>

            </div>
        </>
    )
}