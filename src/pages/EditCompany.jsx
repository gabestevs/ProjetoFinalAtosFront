import { useEffect } from 'react'
import api from '../services/api';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Header } from '../layout/Header'
import { Back } from '../components/Back'
import { PageTitle } from '../components/PageTitle'
import '../assets/css/forms.css'



const validationFormCompany = yup.object().shape({
    name: yup.string().required('Insira o nome da empresa').min(3, 'O nome precisa de no mínimo 3 caracteres'),
    description: yup.string().max(150, 'A descrição deve ter no máximo 150 caracteres')
})

export function EditCompany() {

    const { id } = useParams()
    const navigate = useNavigate()

    // Handle and Get Info of Form
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(validationFormCompany)
    })

    // Submit API POST
    const editCompany = data => api.put(`/company/update/${id}`, data
    )
    .then((response) => {
        //console.log(response)
        navigate("/")
    })
    .catch((err) => {
        console.log(JSON.stringify(err))
    })


    // GET Company Info
    useEffect(() => {
        api.get(`/company/${id}`)
        .then(response => {
            reset(response.data)
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
        })

    }, [])


    return (
        <>

            <Header />

            <div className="page-content">

            <Back />

            <PageTitle title="Editar Cadastro" />

                <div className="form-box">
                    <form id="formCadastro" onSubmit={handleSubmit(editCompany)}>

                        <div className="form-container">
                            <label htmlFor="name">Empresa:</label><br />
                            <input type="text" name="name" id="name" className="form" {...register("name")} />
                            <p className="error-message">{errors.name?.message}</p>
                        </div>

                        <div className="form-container">
                            <label htmlFor="description">Descritivo da empresa:</label><br />
                            <textarea name="description" id="description" className="form" rows="5" maxLength={150} {...register("description")} ></textarea>
                            <p className="error-message">{errors.description?.message}</p>
                        </div>

                        {/* <div className="form-container">
                            <label htmlFor="image_url">Logotipo: Imagem JPG ou PNG</label><br />
                            <input type="file" name="image_url" id="image_url" className="form" {...register("image_url")} />
                        </div> */}

                        <div className="form-container form-container-color">
                            <div className="swatch">
                                <input type="color" name="color1" id="color1" className="form-color" {...register("color1")} />
                                <div className="swatch-info">
                                    <p>Cor 01</p>
                                </div>
                            </div>
 
                            <div className="swatch">
                                <input type="color" name="color2" id="color2" className="form-color" {...register("color2")} />
                                <div className="swatch-info">
                                    <p>Cor 02</p>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="form-button">Atualizar</button>
                    </form>
                </div>

            </div>

        </>
    )
}