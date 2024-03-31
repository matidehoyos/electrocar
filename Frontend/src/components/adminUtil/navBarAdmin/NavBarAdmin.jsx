import style from "./NavBarAdmin.module.css";
import { Link } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import { useEffect, useState } from "react";



const NavBarAdmin = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const handleShowMenu = () => {
    setIsVisible(!isVisible);
  }

  const ocultarMenu = () => {
    const menu = document.querySelector(`.${style.menu}`);
    menu.style.left = "-800px";
  }


  return (
    <div className={style.NavBarContainer}>
      
        <div className={style.logo}>
          <Link to="/admin">
            <h3>ELECTROAUTO</h3> 
           </Link>
        </div>
      
      <div className={style.menu} onClick={ocultarMenu} style={isVisible ? { left: '0px' } : { left: '-800px' }}>
        <nav>
          <ul>
            <li>
              <Link to="/admin/mensajes">Mensajes</Link>
            </li>
            <li>
              <Link to="/admin/users">Todos los usuarios</Link>
            </li>
            <li>
              <Link to="/admin/productosAdmin">Todos los productos</Link>
            </li>
            <li>
              <Link to="/admin/createProduct">Crear nuevo producto</Link>
            </li>
            <li>
              <Link to="/admin/ventas">ventas</Link>
            </li>
          </ul>
        </nav>
        <div className={style.home}>
              <Link to="/"><button>Ir a la página</button></Link>
        </div>
      </div>
      <div className={style.hamburgContainer}>
              <button className={style.menuButton} onClick={handleShowMenu}><FiMenu /></button>
      </div>
    </div>
  );
};

export default NavBarAdmin;
