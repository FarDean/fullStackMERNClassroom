import React,{useState,useEffect,useContext} from 'react'
import { Layout,Steps ,Row,Divider,Col,Form,Input,Button,message as msg,Modal,Result} from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { LoadingOutlined } from "@ant-design/icons";
import { authenticated } from "./../../helpers/api-auth";
import { Link } from 'react-router-dom';

const {Step} = Steps

export default function Addlesson({match}) {
    const {course,getCourse,addLesson,error,message,setToNull} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        setLoading(true)
        getCourse(match.params)
        setLoading(false)
    }, [])

    useEffect(() => {
        error && msg.error(error)

        return ()=>{
            setToNull()
        }
    }, [error])

    useEffect(() => {
        message && setOpen(true)
        return () => {
            setToNull()
        }
    }, [message])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 9 },
      };
    const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
    };

    function onFinish(values) {
        setLoading(true)
        addLesson(authenticated(),match.params,values)
        console.log(values);
        setLoading(false)
    }
    console.log(message);

    return (
        <Layout>
            <Divider orientation="left" style={{marginBottom:'95px'}}>Add Lessons</Divider>
            <Col style={{width:'65%',margin:'0 auto 45px auto',}}>
                <Steps size="small" current={1}>
                    <Step title="Create course" />
                    <Step title="Add lessons" icon={<LoadingOutlined />} />
                    <Step title="Publish!" />
                </Steps>
            </Col>
            
                <Form
                    name='add lessons'
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='title'
                        label='Title'
                        rules={[{ required: true, message: 'Please Add a title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='content'
                        label='Content'
                        rules={[{ required: true, message: 'Please Add some content!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name='resource_url'
                        label='Reference'
                        rules={[
                            {
                                pattern:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, message: 'Please input a valid URL!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Modal
                    visible={open}
                    footer={null}
                >
                    <Result
                        status="success"
                        title={message}
                        extra={[
                        <Button type="primary" key="console">
                            Add another lesson!
                        </Button>,
                        <Link to='/'><Button key="next">Next!</Button></Link>,
                        ]}
                    />
                </Modal>
        </Layout>
    )
}
