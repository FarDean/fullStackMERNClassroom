import React,{useState,useEffect,useContext} from 'react'
import { Layout,Steps ,Row,Divider,Col,Form,Input,Button,message as msg,Modal,Result,Affix,Badge,Drawer} from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { LoadingOutlined } from "@ant-design/icons";
import { authenticated } from "./../../helpers/api-auth";
import { Link } from 'react-router-dom';

const {Step} = Steps

export default function Addlesson({match}) {
    const {addLesson,error,message,setToNull} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [lessons, setLessons] = useState([])
    const [drawerVisible, setDrawerVisible] = useState(false)

    const [form] = Form.useForm();


    useEffect(() => {
        error && msg.error(error)
        return ()=>{
            setToNull()
        }
    }, [error])

    useEffect(() => {
        message && setOpen(true)
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
        setLessons([...lessons,values])
        setLoading(false)
    }
    console.log(lessons);

    function handleAddAnother() {
        setOpen(false)
        form.resetFields()
    }

    return (
        <Layout style={{minHeight:'95vh'}}>
            <Divider orientation="left" style={{marginBottom:'95px'}}>Add Lessons</Divider>
            <Col style={{width:'65%',margin:'0 auto 45px auto',}}>
                <Steps size="small" current={1}>
                    <Step title="Create course" />
                    <Step title="Add lessons" icon={<LoadingOutlined />} />
                    <Step title={'Review '+'&'+' Publish!'} />
                </Steps>
            </Col>
            
                <Form
                    name='add lessons'
                    {...layout}
                    onFinish={onFinish}
                    form={form}
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
                        <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                        </Button>
                        <Link key='kos' to={'/course/review/' + match.params.courseId}><Button key="next">Next!</Button></Link>
                    </Form.Item>
                </Form>
                <Modal
                    visible={open}
                    footer={null}
                    closable={false}
                >
                    <Result
                        status="success"
                        title={message}
                        extra={[
                        <Button onClick={handleAddAnother} type="primary" key="console">
                            Add another lesson!
                        </Button>,
                        <Link key='kos' to={'/course/review/' + match.params.courseId}><Button key="next">Next!</Button></Link>,
                        ]}
                    />
                </Modal>
                <Affix offsetBottom={122} style={{marginLeft:'20px'}}>
                    <Badge count={lessons.length}>
                        <Button onClick={()=>setDrawerVisible(true)}>View added lessons</Button>
                    </Badge>
                </Affix>
                <Drawer
                title="Added lessons"
                placement='left'
                onClose={()=>setDrawerVisible(false)}
                visible={drawerVisible}
                key='left'
                >
                    {lessons.map(lesson=><div style={{color:'#F5DEB3'}}>{lesson.title}</div>)}
                </Drawer>
        </Layout>
    )
}
