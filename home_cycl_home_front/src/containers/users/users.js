import { useNavigate } from "react-router-dom";

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import { Button, Empty, message, Modal, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../actions/user";

export default function Users() {
  const [loading, setLoading] = useState(true)
  const [datas, setDatas] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  
  const nav = useNavigate()

    useEffect(() => {
      fetchUsers()
    }, [])

    const fetchUsers = async() => {
      await getUsers().then((res) => {
          setDatas(res.data)
          setLoading(false)
      });
    }

    const showModal = (id) => {
      setCurrentId(id)
      setIsModalOpen(true);
    };
    
    const handleOk = () => {
      handleDelete(currentId)
      message.success("Utilisateur supprimé")
      setCurrentId(null)
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setCurrentId(null)
      setIsModalOpen(false);
    };

    const handleDelete = (id) => {
      deleteUser(id)
      setDatas((prevDatas) => prevDatas.filter(user => user.id !== id))
    }

    const columns = [
        {
            title: 'Prénom',
            dataIndex: 'firstname',
            key: 'firstname',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Nom',
            dataIndex: 'lastname',
            key: 'lastname',
            render: (text) => <div>{text}</div>,
        },
        {
          title: 'Numéro',
          dataIndex: 'number',
          key: 'number',
          render: (text) => <div>{text}</div>,
        },
        {
            title: 'Adresse',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <div>{text.value}</div>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          render: (text) => <div>{text}</div>,
        },
        {
          title: 'Rôle',
          key: 'role',
          dataIndex: 'role',
          render: (role) => (
            <Tag color={role === "admin" ? "red" : role === "tech" ? "orange" : "geekblue"} key={role}>
                {role.toUpperCase()}
            </Tag>
          ),
        },
        {
          key: 'show',
          dataIndex: 'show',
          render: (_, column) => (
            <Button type="primary" onClick={() => nav(`/user/show/${column.id}`)} >
              <EyeOutlined/>
            </Button>
          ),
        },
        {
          key: 'delete',
          dataIndex: 'delete',
          render: (_, column) => (
            <Button type="primary" danger onClick={() => showModal(column.id)} >
              <DeleteOutlined/>
            </Button>
          ),
        },
      ];

    if (loading) {
      return <Spin size="large" style={styles.spinner} />;
    }

    return (
      <>
        <Button type="primary" style={styles.button} onClick={() => nav('/user/new')}>Ajouter</Button>
        <Table columns={columns} dataSource={datas} locale={{
          emptyText: <Empty description="Aucun utilisateur trouvé" />,
        }}/>
        <Modal 
          okType="danger" 
          okText="Valider" 
          cancelText="Annuler" 
          title="Supprimer définitivement l'utilisateur ?" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}/>
      </>
    )
}

const styles = {
  spinner: {
    display: 'block',
    margin: '100px auto'
  },
  button: {
    marginBottom: 20
  }
}