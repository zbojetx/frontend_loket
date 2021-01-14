import React, { useState, useEffect } from 'react'
import { Layout, Select, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Form, Radio } from 'antd';
import styled from 'styled-components';
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import QRCode from "react-qr-code";

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const InputBoxAbove = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px 5px 0px 0px ;
`;
const InputBoxCenter = styled.div`
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    border-bottom: 1px solid #a5b1c2;
    padding: 10px;
`;

const InputBoxBottom = styled.div`
    border-bottom: 1px solid #a5b1c2;
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 0px 0px 5px 5px;
`;

const Judul = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 20px;
    &:focus{
        outline: none;
    }
`;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;

const Buttonx = styled.button`
    margin-top: 20px;
    background-color:#4b7bec;
    border: 1px solid #4b7bec;
    border-radius: 5px;
    color: white;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        border: 1px solid #3498db;
        font-weight: bold;
    }
`;

const Inputx = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;

function PermohonanNew() {

    const [modal, setModal] = useState(false)
    const [id_permohonan, setIdPermohonan] = useState('')
    const [nik, setNik] = useState('')
    const [nama_pemohon, setNamaPemohon] = useState('')
    const [jenis_permohonan, setJenisPermohonan] = useState('')   

    const [listPermohonan, setListPermohonan] = useState()
    const [listJenisPermohonan, setListJenisPermohonan] = useState([])

    useEffect(() => {
        getjenispermohonan()
        getPermohonan()
    }, [])

    const getjenispermohonan = async () => {
        const data = []
        const url = 'getjenispermohonan'
        let jenispermohonan = await getall(url)

        setListJenisPermohonan(jenispermohonan)

    }

    const getPermohonan = async () => {
        const data = []
        const url = 'getpermohonanresmi'
        let permohonanresmi = await getall(url)

        let data_length = permohonanresmi.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                nik: permohonanresmi[i].nik,
                nama_pemohon: permohonanresmi[i].nama_pemohon,
                id_berkas: permohonanresmi[i].id_permohonan,
                jenis_permohonan: permohonanresmi[i].jenis_permohonan,
                // jabatan: pegawai[i].jabatan,
                // eselon: pegawai[i].eselon,
            })
        }
        setListPermohonan(data)
    }

    const getTrackingyId = async (id) => {
        const url = 'gettrackingbyid'
        let track= await getbyid(id, url)
        console.log(track)
       
    }

    const create = async () => {
        if (nik === '' || id_permohonan === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
              id_permohonan,
              nik,
              nama_pemohon,
              jenis_permohonan
            }
            const apiurl = 'createpermohonan';
            console.log(apiurl)
            let createpermohonan = await createupdate(datas, apiurl)
            if (createpermohonan === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                // getpegawai()
                modelTrigger()
                //resetForm()
            } else {
                notification.open({
                    message: 'Gagal Menyimpan Data',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Pemohon',
            key: 'nama_pemohon',
            dataIndex: 'nama_pemohon'
        },
        {
            title: 'NIK',
            key: 'nik',
            dataIndex: 'nik'
        },
        {
            title: 'Jenis Permohonan',
            key: 'jenis_permohonan',
            dataIndex: 'jenis_permohonan'
        },
        {
            title: 'Nomor Berkas',
            key: 'id_berkas',
            dataIndex: 'id_berkas'
        },
        {
            title: 'QR Code',
            key: 'action',
            render: (text, record) => (
               <QRCode value={record.id_berkas}  size={80}/>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" style={{ marginLeft: 10 }} onClick={() => getTrackingyId(record.id_berkas)} type="primary" icon={<InfoCircleOutlined />} >Track</Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        //onConfirm={() => removepagawai(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Print</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const modelTrigger = () => {
        setModal(!modal)
    }

    const onChangeJenisPermohonan = async(value) => {
        setJenisPermohonan(value)
    }

    return (
        <Content
            // className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100%',

            }}
        >

            <Card
                title="Permohonan Baru"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={modelTrigger}>Tambah Permohonan </Button>}
                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20, }}
            />

            <Modal
                title="Tambah Permohonan"
                centered
                visible={modal}
                onOk={create}
                onCancel={modelTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Pemohon</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Nomor Induk Kependudukan (NIK)</Label>
                    <Inputx placeholder="Nomor Induk Kependudukan" value={nik} onChange={e => setNik(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Nama Pemohon</Label>
                    <Inputx placeholder="Nama Pemohon" value={nama_pemohon} onChange={e => setNamaPemohon(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Permohonan</Label>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Nomor Berkas</Label>
                    <Inputx placeholder="Nomor Berkas" value={id_permohonan} onChange={e => setIdPermohonan(e.target.value)} />
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Jenis Permohonan</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Jenis Permohonan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeJenisPermohonan}
                        value={jenis_permohonan}
                    >
                        {listJenisPermohonan.map((data, index) =>
                            <Option value={data.nama_permohonan}>{data.nama_permohonan}</Option>
                        )}
                    </Select>
                </InputBoxBottom>
            </Modal>


           <Table columns={columns} dataSource={listPermohonan} />

        

        </Content>
    )

}

export default PermohonanNew