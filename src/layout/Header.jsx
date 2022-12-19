import './Header.css'
import logo from '../assets/img/logo-company-card-branco.png'
import { Link } from 'react-router-dom'
// import { Menu } from './Menu'

export function Header(){
    return (
        <>
            <header className="header">
                <Link to={'/'}>
                    <div className="logo">
                        <img src={logo} alt="Linkatalog" />
                    </div>
                </Link>

                {/* <Menu /> */}
            </header>
        </>
    )
}