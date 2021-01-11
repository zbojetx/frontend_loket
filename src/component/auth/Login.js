import React, { useEffect, useState } from 'react'
import { Layout, Modal, Row, Col, notification } from 'antd'
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { Link, browserHistory } from 'react-router';
import {
    login,loginLoket
} from './../../api/api';
import {
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const endpoint = process.env.REACT_APP_ENDPOINT_URL


const App = () => {

    const [nik, setNik] = useState('');
    const [email, setEmail] = useState('');
   
    const dispatch = useDispatch();

    useEffect(() => {
        //localStorage.clear();
        const savedDatas = localStorage.getItem('isLogin')
        console.log(`endpoint ${endpoint}`)
        console.log(`save data ${savedDatas}`)
        if (savedDatas !== null && savedDatas.accessToken !== null) {
            dispatch({ type: "SAVEDATAS" })
            browserHistory.push('/dashboard')
        } else {
            console.log('null')
        }
    }, [])

    const loginFunc = async () => {
        if (email === '' || nik === '') {
            notification.open({
                message: 'Gagal Login',
                description:
                    'Form username atau password tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                nik,
                email
            }
            const cek = await loginLoket(datas)
            if (cek === 1) {
                browserHistory.push('/dashboard')
                const savedDatas = JSON.parse(localStorage.getItem('isLogin'))
                console.log(savedDatas)
            } else {
                notification.open({
                    message: 'anda bukan petugas loket',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }


    return (
        <div className="form-body">
            <div className="website-logo">
                <a href="#">
                    <div className="logo">
                        <img className="logo-size" src={require('./../../assets/images/sambas.png')} alt="" />
                    </div>
                </a>
            </div>
            <div className="row">
                <div className="img-holder">
                    <div className="bg"></div>
                    <div className="info-holder">
                        <img src={require('./../../assets/images/graphic2.svg')} alt="" />
                    </div>
                </div>
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Login Loket</h3>
                        
                            <>
                                <form>
                                    <input className="form-control" type="text" name="nik" placeholder="Nomor Induk Kependudukan" onChange={e => setNik(e.target.value)} required />
                                    <input className="form-control" type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                                </form>
                                <div className="form-button">
                                    <button id="submit" type="submit" className="ibtn" onClick={loginFunc}>Login</button>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default App