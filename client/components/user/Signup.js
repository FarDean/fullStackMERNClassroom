import React,{useEffect,useState,useContext} from 'react'
import { Layout,Divider } from 'antd';
import { Form, Input, Button,Select} from 'antd';
import {  LockOutlined,MailOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { authenticated } from "./../../helpers/api-auth";
import { message as msg } from 'antd';
import { GlobalContext } from './../../context/GlobalContext'
import {Redirect} from 'react-router-dom'

const { Option } = Select;



export default function Signup() {
    const {error,message,registerUser,setToNull} = useContext(GlobalContext)
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [loading, setLoading] = useState(false)

    const onFinish = (user) => {
        setLoading(true)
        registerUser(user)
        setLoading(false)
    };

    useEffect(() => {
        error && msg.error(error)
        message && msg.success(message)
        return ()=>{
            setToNull()
        }
    }, [error,message])

    console.log(message);
    console.log(error);

    
    const formItemLayout = {
        labelCol: {
          xs: { span: 22 },
          sm: { span:24,offset: 2},
          md: { span: 3},
          lg: { span: 4},
          xl: { span: 5}
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20,offset:2 },
            md: {span:14,offset:0},
            lg: {span:12,offset:0},
            xl: {span:10,offset:0}
        },
      };
    
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="98">+98</Option>
          </Select>
        </Form.Item>
      );

    return (
        <Layout style={{minHeight:'95vh'}}>

            <Divider orientation="left" style={{marginBottom:'95px'}}>Sign Up</Divider>


            <Row justify='center'>
                <Col style={{width:'90%'}}>
                
                    <Form 
                        initialValues={{
                            prefix:'98'
                        }}
                        {...formItemLayout}
                        scrollToFirstError
                        onFinish={onFinish}
                    >
                        
                                <Form.Item name='first_name' label='First name' rules={[
                                        {
                                            required:true,
                                            message: 'Please input your first name!'
                                        }
                                    ]}>
                                    <Input />
                                </Form.Item>

                                    <Form.Item name='last_name' label='Last name' rules={[
                                        {
                                            required:true,
                                            message: 'Please input your last name!'
                                        }
                                    ]}>
                                        <Input />
                                    </Form.Item>

                        <Form.Item name='email' label='email' rules={[
                            {
                                required:true,
                                message: 'Please input your Email!'
                            },
                            {
                                pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'This email is not valid!'
                            }
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='phone' label='Mobile' rules={[
                            {
                                required:true,
                                message: 'Please input a phone number'
                            },
                            {
                                len:10,
                                message: 'Phone must be exactly 10 digits!'
                            }
                        ]}>
                            <Input addonBefore={prefixSelector} style={{width:'100%'}} />
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[
                            {
                                required: true,
                                message: 'Password is Required!'
                            },
                            {
                                pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Password must be Minimum eight characters, at least one letter and one number!'
                            }
                        ]} hasFeedback>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Row justify='center'>
                            <Col>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                    Register
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                    </Form>
                </Col>
            </Row>
            {message && <Redirect push to='/signin' />}
        </Layout>
    )
}
