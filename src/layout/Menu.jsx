import './Menu.css'
import { Link } from 'react-router-dom'

export function Menu(){
    return (
        <>
            <div className="menu">
                <ul>
                    <li><Link to="/add-company">Adicionar empresa</Link></li>
                    <li><Link to="/add-company">Ver empresa</Link></li>
                </ul>
            </div>
        </>
    )
}