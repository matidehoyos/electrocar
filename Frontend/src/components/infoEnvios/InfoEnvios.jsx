import HeaderCarrusel from '../headerCarrusel/HeaderCarrusel';
import { FaTruck } from 'react-icons/fa';
import style from './InfoEnvios.module.css'

const InfoEnvios = () => {

  return (
    <div className={style.container}>
        <div className={style.carrusa}>
          <HeaderCarrusel />
        </div>
        <div className={style.text}>
            <p><FaTruck /></p>
            <div className={style.first}>
            <h4>ENVIO GRATIS<br/> A TODO EL PAÍS</h4>
            <h5>CON TU COMPRA <br/> MAYOR A $40.000</h5>
            </div>
        </div>
    </div>
  );
};

export default InfoEnvios;