import React,{useState,useEffect,useContext} from 'react'
import { Link } from "react-router-dom";
import { Layout } from 'antd';
import { Typography } from 'antd';
import { Row, Col, Space } from 'antd';

import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Title } = Typography;

export default function Home() {
    const [burgerOpen, setBurgerOpen] = useState(false)

    return (
        <Layout>
            <Header>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Title type="warning" level={3}>Hi mother fucker</Title>
                    </Col>
                    
                    <Col className='hide'>
                        <Space size={25}>
                            <Link to='/signin'><Typography.Link level={4}>kos</Typography.Link></Link>
                            <Typography.Link>Sign In</Typography.Link>
                            <Link to='/signin'><Typography.Link>Sign In</Typography.Link></Link>
                            <Link to='/signin'><Typography.Link>Sign In</Typography.Link></Link>
                        </Space>
                    </Col>
                    {burgerOpen ? <MenuFoldOutlined style /> : <MenuUnfoldOutlined style={{fontSize:'25px',color: 'lime'}} />}
                    
                </Row>
            </Header>
        </Layout>
    )
}
