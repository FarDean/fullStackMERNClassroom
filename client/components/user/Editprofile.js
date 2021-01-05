import React,{useContext,useEffect,useState,useRef} from 'react'
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated,dAuth } from "./../../helpers/api-auth";
import { Layout,Divider,Form,Input,Row,Col,Button,Select,Upload, Modal,Image  } from "antd";
import { PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { message as msg}  from "antd";

export default function Editprofile({match}) {
    const {error,personalInfo,getPersonalInfo,setToNull,user} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)

    const layout = {
        xs: { span: 22 },
        sm: { span: 20 },
        md: {span:16},
        lg: {span:12},
        xl: {span:10}
    };

    function onFinish(user) {
        setLoading(true)
        getPersonalInfo(authenticated(),match.params,user)
        setLoading(false)
    }


    useEffect(() => {
        error && msg.error(error)
        return () => {
            setToNull()
        }
    }, [error])

    // form Component
    function Passform() {
        return (
            <Col  {...layout}>
                <Form onFinish={onFinish}>
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            }
                        ]}
                    >
                        <Input.Password placeholder='Confirm Your Paaswrd' />
                    </Form.Item>
                    <Row justify='center'>
                        <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                            </Button>
                        </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        )
    }


    // edit component
    function Edit() {
        const [imageUrl, setImageUrl] = useState(`/api/v1/users/${user._id}/image`)
        const [loading, setLoading] = useState(false)
        const [img, setImg] = useState(undefined)


        const prefixSelector = (
            <Form.Item name="prefix" noStyle rules={[
                {
                    required:true,
                    message: 'Please choose an area code!'
                }
            ]}>
              <Select style={{ width: 70 }}>
                <Select.Option value="98">+98</Select.Option>
              </Select>
            </Form.Item>
          );
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

        //   Upload
        const onFinish = (user) => {
            setLoading(true)
            console.log(user)
            setLoading(false)
        };



        return (
            <Col style={{width:'90%'}}>
                <Row justify='center' style={{marginBottom:'25px'}}>
                    <Image
                        width={100}
                        src={imageUrl}
                        onLoad={URL.revokeObjectURL(imageUrl)}
                    />
                </Row>
                    
                <Form initialValues={personalInfo}
                    onFinish={onFinish}
                    {...formItemLayout}
                >
                    <Form.Item style={{overflow:'hidden'}} label='Profile Photo'>
                        <Input type='file' onChange={e=>console.log(URL.createObjectURL(e.target.files[0]))} />
                    </Form.Item>
                    <Form.Item
                        name='first_name'
                        label='First Name'
                        rules={[
                            {
                                required:true,
                                message: 'Please input your first name!'
                            }
                        ]}
                    >
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
                                Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        )
    }

    return (
        <Layout style={{minHeight:'95vh'}}>
            <Divider orientation="left" style={{marginBottom:'95px'}}>Edit Profile</Divider>
            <Row justify='center'>
                {!dAuth() ? <Passform />: <Edit />}
            </Row>
        </Layout>
    )
}

