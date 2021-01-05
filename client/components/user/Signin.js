import React,{useEffect,useState,useContext} from 'react'
import { GlobalContext } from './../../context/GlobalContext'
import { Redirect,Link } from "react-router-dom";
import { Layout,Divider } from 'antd';
import { Form, Input, Button} from 'antd';
import {  LockOutlined,MailOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { authenticated } from "./../../helpers/api-auth";
import { message } from 'antd';



export default function Signin() {
    const {signIn,error,setToNull} = useContext(GlobalContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    function onFinish() {
        setLoading(true)
        const user = {
            email,
            password
        }

        signIn(user,setLoading(false))
    }

    useEffect(() => {
        error && message.error(error)
        return () => {
            setToNull()
        }
    }, [error])

    const layout = {
        xs: { span: 20 },
        sm: { span: 16 },
        md: {span:12},
        lg: {span:8},
        xl: {span:6}
    };

    return (
        <Layout style={{minHeight:'95vh'}}>
            <Row style={{marginBottom:'110px'}}>
                <Divider orientation="left">Sign In</Divider>
            </Row>
            <Row justify='center' align='middle'>
                <Col {...layout} >
                    <Form name='login'  className="login-form" onFinish={onFinish}>
                        <Form.Item name='email' rules={[{ required: true, message: 'Please input your Email!' },{type: 'email',message: 'The input is not valid E-mail!'}]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" onChange={e=>{setEmail(e.target.value)}} />
                        </Form.Item>
                        <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={e=>{setPassword(e.target.value)}}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Row justify='space-around' align='middle'>
                                <Col>
                                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                    Log in
                                    </Button>
                                </Col>
                                <Col>
                                    Or <Link to='/signup'>register now!</Link>

                                </Col>
                            </Row>
                            
                            
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
            

            {authenticated() && <Redirect push to='/' />}
        </Layout>
    )
}
