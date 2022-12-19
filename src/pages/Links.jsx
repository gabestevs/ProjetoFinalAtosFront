import { useState, useEffect } from 'react'
import api from '../services/api'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CgTrash, CgLink } from 'react-icons/cg'
import { Header } from '../layout/Header'
import { Back } from '../components/Back'
import { PageTitle } from '../components/PageTitle'
import './Links.css'


const validationFormLink = yup.object().shape({
    name: yup.string().required('Insira a que se refere o link'),
    link: yup.string().required('Insira a url do link').max(300, 'O link deve ter no máximo 300 caracteres')
})

export function Links(props){

    const { id, name } = useParams()
    const navigate = useNavigate()
    const [links, setLinks] = useState([])
    const [option, setOption] = useState()
    const [valueInput, setValueInput] = useState()

    // Handle and Get Info of Form
    const { register, handleSubmit, formState: {errors, reset, setValue}} = useForm({
        resolver: yupResolver(validationFormLink)
    })


    // GET Links
    useEffect(() => {
        api.get(`/company/${id}/links`)
        .then(response => {
            setLinks(response.data)
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
        })

    }, [])


    // Submit API POST
    const addLink = (data, e) => api.post(`/company/${id}/link`, data)
    .then(response => {
        //console.log([...links])
        let newLinks = [...links, response.data]
        setLinks(newLinks)
        e.target.reset();
    })
    .catch((err) => {
        console.log(JSON.stringify(err))
    })

    function deleteLink(id){
        api.delete(`/links/${id}`)
        setLinks(links.filter(item => item.id !== id))
    }

    function urlMount(){
        return `${window.location.protocol}//${window.location.hostname}/cardcompany/${id}/${name}`
    }

    const handleChange = e => {
        switch(e.target.value) {
            case 'site' :
                console.log("Escolheu site")
                setValue('link', 'https://')
            break
            case 'instagram' :
                console.log("Escolheu Instagram")
            break
            case 'facebook' :
                console.log("Escolheu Facebook")
            break
            case 'linkedin' :
                console.log("Escolheu Linkedin")
            break
            case 'whatsapp' :
                console.log("Escolheu Whatsapp")
            break
            default :
                console.log("Escolheu outro") 
        }
      }

    return (
        <>

            <Header />

            <div className="page-content">

                <Back />

                <div className="pageSubTitle">
                    <h3>{`${name}`}</h3>
                </div>
                
                <PageTitle title="Criar Links" />            

                <div className="list-link">


                    <div className="links-content">
                    {links.map(item => {
                        return (
                            <div className="link-item" key={item.id}>

                                <div className="link-item-text">
                                    <p>{`${item.name}`}</p>
                                    <h3>{`${item.link}`}</h3>
                                </div>

                                <div className="link-item-actions">
                                    <a href={`${item.link}`} className="action-link action-go" target="_blank" title="Acessar o link"><CgLink /></a>
                                    <span className="action-link action-delete" onClick={() => deleteLink(item.id)} title="Excluir link"><CgTrash /></span>
                                </div>
                            </div>
                        )
                    })}
                    </div>

                    <div className="form-links-box">
                        <h3>Adicione um link:</h3>
                        <form id="form-link" onSubmit={handleSubmit(addLink)}>

                            <div className="form-link-container">    

                                <div className="form-link-item">
                                    <select name="name" id="name" className="form-add-link" {...register("name")} onChange={handleChange}>
                                        <option value="">Escolha um tipo</option>
                                        <option value="site">Site Institucional</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="linkedin">Linkedin</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                    <p className="error-message">{errors.name?.message}</p>
                                </div>

                                <div className="form-link-item">
                                    <input type="text" name="link" id="link" className="form-add-link form-add-link-url" placeholder="Adicione o link" {...register("link")} />
                                    <p className="error-message">{errors.link?.message}</p>
                                </div>

                                <div className="form-link-item">
                                    <button type="submit" className="form-add-link-button">Adicionar</button>
                                </div>

                            </div>

                        </form>

                        
                    </div>
                </div>

                <div className="form-address">
                    <input value={urlMount()} className="form-address-item" /><Link to={`/cardcompany/${id}/${name}`} className="link-pagina"> Ver Página</Link>
                </div>

            </div>
        </>
    )
}