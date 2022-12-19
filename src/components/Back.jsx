import './Back.css'
import { CgChevronLeft } from 'react-icons/cg'
import { Link } from 'react-router-dom'

export function Back(){
    return (
        <>
            <Link to="/" title="Voltar">
                <div className="link-back">
                    <p><CgChevronLeft /> Voltar</p>
                </div>
            </Link>
        </>
    )
}