import React, { useState, useEffect } from 'react';
import { Link, browserHistory, Redirect } from 'react-router';
import { Layout, Menu, Divider, Typography, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MobileTwoTone,
    SkinOutlined,
    ShoppingCartOutlined,
    SoundTwoTone ,
    FolderOpenTwoTone ,
    ProfileTwoTone,
    ShopTwoTone,
    AppstoreTwoTone,
    SnippetsTwoTone,
    DatabaseTwoTone,
    CrownTwoTone,
    DashboardTwoTone,
    LogoutOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { isLogin } from './reducer/LocalStorage';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
const { Title } = Typography;


export default function Master(props) {
    const [collapsed, setCollapsed] = useState(false);
    const datasFromReducer = useSelector(state => state.savedDatas)
    const [datas, setDatas] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const dispatch = useDispatch();
    const [login, setLogin] = useState(true)

    useEffect(async () => {
        await isLoginFunc()
        // if(login === false){
        //    return  <Redirect to={'/'} />
        // }
    }, [])

    const isLoginFunc = async () => {
        const loginDatas = await isLogin()
        console.log(loginDatas)
        if (loginDatas !== null) {
            setLogin(true)
            setDatas(loginDatas)
            setDataUsers(loginDatas.data[0])
        } else {
            setLogin(false)
        }
        console.log(loginDatas)
    }

    const logout = async () => {
        localStorage.clear()
        setLogin(false)
        window.location.href = '/';
    }

    const toggle = () => {
        setCollapsed(!collapsed)
        console.log(dataUsers)
    }

    const toLogin = () => {
        window.location.href = '/';
    }

    if (login) {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white' }}>
                    <div className="logo" style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>e-superdina</div>
                 
                        <Menu mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" onClick={() => browserHistory.push('/dashboard')} >
                                <DashboardTwoTone twoToneColor="#eb2f96" />
                                <span>Dashboard</span>
                            </Menu.Item>
                            <SubMenu key="stppd"
                                title={
                                    <span>
                                        <SnippetsTwoTone twoToneColor="#f0932b" />
                                        <span>Pra Berkas</span>
                                    </span>
                                }>
                                <Menu.Item key="7" onClick={() => browserHistory.push('/pranerkasnew')}>
                                    <span>Baru</span>
                                </Menu.Item>
                                <Menu.Item key="8" onClick={() => browserHistory.push('/praberkasproccess')}>
                                    <span>Proses</span>
                                </Menu.Item>
                                <Menu.Item key="8" onClick={() => browserHistory.push('/praberkasfinish')}>
                                    <span>Selesai</span>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="permohonan"
                                title={
                                    <span>
                                        <FolderOpenTwoTone twoToneColor="#2c3e50" />
                                        <span>Permohonan</span>
                                    </span>
                                }>
                                <Menu.Item key="sub_permohonan" onClick={() => browserHistory.push('/permohonannew')}>
                                    <span>Baru</span>
                                </Menu.Item>
                                <Menu.Item key="sub_formulir" onClick={() => browserHistory.push('/permohonanproccess')}>
                                    <span>Proses</span>
                                </Menu.Item>
                                <Menu.Item key="sub_formulir" onClick={() => browserHistory.push('/permohonanfinish')}>
                                    <span>Selesai</span>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    )

                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <div style={{ paddingRight: 20, float: 'right' }}>
                            <span style={{ fontWeight: 'bold', marginRight: 20 }}>{dataUsers.nama}</span><Button type="danger" onClick={logout} icon={<LogoutOutlined />}></Button>
                        </div>
                    </Header>
                    {props.children}
                </Layout>
            </Layout>
        )
    } else {
        return toLogin()
    }
}