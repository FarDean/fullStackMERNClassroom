import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { Layout } from 'antd';
import { Typography } from 'antd';
import { Row, Col, Space } from 'antd';
import { Menu } from 'antd';
import { Drawer, Button } from 'antd';
import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons'

import MediaQuery from 'react-responsive'

const { Header } = Layout
const { Title } = Typography;
const { SubMenu } = Menu;

export default function Navbar() {
    const [burgerOpen, setBurgerOpen] = useState(false)
    const [current, setCurrent] = useState('home')

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };

    function handleClick(e) {
        console.log('click ', e);
        setCurrent(e.key)
    }
    return (
        <Layout>
            <Header style={{backgroundColor:'wheat'}}>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Title level={3}>Hi mother fucker</Title>
                    </Col>
                    
                    <MediaQuery minWidth={800}>
                        <Col>
                            <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' style={{backgroundColor:'inherit'}}>

                                <Menu.Item key='signin'>
                                    <Link to='/signin'>Sign In</Link>
                                </Menu.Item>
                                <Menu.Item key='home'>
                                    <Link to='/'>Home</Link>
                                </Menu.Item>
                                <Menu.Item key='signup'>
                                    <Link to='/signup'>Sign Up</Link>
                                </Menu.Item>

                            </Menu>
                        </Col>

                    </MediaQuery>
                    
                    <MediaQuery maxWidth={799}>
                        <Col onClick={showDrawer}>
                            {burgerOpen ? <div className='icon'><MenuFoldOutlined /></div>  : <div className='icon'><MenuUnfoldOutlined /></div> }
                        </Col>
                    </MediaQuery>
                    
                </Row>
            </Header>
            <Drawer
                title="Menu"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
            >
                <Menu onClick={handleClick} selectedKeys={[current]} mode='vertical-left' style={{backgroundColor:'inherit'}}>
                    <Menu.Item key='home'>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key='signin'>
                        <Link to='/signin'>Sign In</Link>
                    </Menu.Item>
                    <Menu.Item key='signup'>
                        <Link to='/signup'>Sign Up</Link>
                    </Menu.Item>

                </Menu>
            </Drawer>
        </Layout>
    )
}
