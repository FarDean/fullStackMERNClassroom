import React,{useState,useContext,useEffect} from 'react'
import { Divider,Layout,Col,Form,Row,Button,Input,message as msg } from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated,dAuth as da,decodedJwt } from "./../../helpers/api-auth";
import { Redirect } from "react-router-dom";

export default function DAuth() {
    const {error,message,dAuth,setToNull} = useContext(GlobalContext)

    const [loading, setLoading] = useState(false)

    const layout = {
        xs: { span: 22 },
        sm: { span: 20 },
        md: {span:16},
        lg: {span:12},
        xl: {span:10}
    };

    function onFinish(values) {
        setLoading(true)
        dAuth(authenticated(),values)
        setLoading(false)
    }

    useEffect(() => {
        error && msg.error(error)
        message && msg.success(message)
        return ()=>{
            setToNull()
        }
    }, [error,message])


    return (
        <Layout style={{minHeight:'95vh'}}>
            <Divider orientation="left" style={{marginBottom:'95px'}}>Confirm your password</Divider>
            <Row justify='center'>
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
            </Row>
            {da() && <Redirect  to={`/profile/edit/${decodedJwt()._id}`}  /> }
        </Layout>
    )
}
