import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from './PostPago.module.css'
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import NavBar from '../../components/navBar/NavBar';

export default function PostPago() {
    const [paymentInfo, setPaymentInfo] = useState(null)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const payment_id = params.get('payment_id')
    const preference_id = params.get('preference_id')
    
    const obj = {
        payment_id,
        preference_id
    }


    useEffect(() => {
        const searchPay = async () => {
            try {
                const response = await axios('/successpayment', {params: obj});
                const search = await axios(`/getpreference/id?id=${response.data.id}`);
                if (search.status !== 200) {
                    throw new Error(`Error: Received status code ${search.status}`);
                }
                setPaymentInfo(search.data);
            } catch (error) {
                console.error(error);
            }
        }

        localStorage.removeItem('carrito');
        searchPay();
    }, [])


    return (
        <div>
            {
                !paymentInfo
                    ? 
                    "Hola"
                    :
                    (<div className={style.container}>
                        <div className={style.confirmation}>
                            <NavBar />
                            <div className={style.status}>
                                <h3>{paymentInfo?.infoMp.status === 'approved' ? <FcApproval className={style.iconStatus} /> : <FcHighPriority className={style.iconStatus} />}{paymentInfo?.infoMp.status}</h3>
                            </div>
                        </div>
                        
                          <div className={style.containerBox}>
                                <div className={style.containerTitle}>
                                    <h4>Información de la transacción</h4>
                                </div>
                                <div className={style.info}>
                                    <p>Pay id:</p>
                                    <span> {paymentInfo?.infoMp.payId}</span>
                                    <p>Productos:</p>
                                    {
                                        paymentInfo?.productos?.map((elem,index) => (
                                            <h6 key={index}>{elem.quantity} {elem.title}</h6>
                                        ))
                                    }
                                    <p>Total:</p>
                                    <span>ARG ${paymentInfo?.infoMp.totalPaid} </span>
                                    <p>Metodo de pago:</p>
                                    <span> {paymentInfo?.infoMp.payment_type_id}</span>
                                    <p>Fecha de aprobacion:</p>
                                    <span> {paymentInfo?.infoMp.date_approved}</span>
                                    <p>Email:</p>
                                    <span> {paymentInfo?.infoMp.emailMp}</span>
                                </div>
                                <div className={style.containerButton}>
                                    <Link to='/'>
                                        <button>Volver a la página</button>
                                    </Link>
                                </div>
                        </div>
                    </div>)
    }
        </div>
    )
}
