import React,{useState,useEffect,useContext} from 'react'
import { GlobalContext } from "./../../context/GlobalContext";
import { Divider,Layout,Row,Col,Form,Steps,Input,Upload,Button,Select,message as msg, } from "antd";
import { LoadingOutlined,UploadOutlined } from '@ant-design/icons';
import { authenticated } from "./../../helpers/api-auth";
import FormData from 'form-data'
import { Redirect } from "react-router-dom";

const {Step} = Steps;
const {Option} = Select;

export default function Createcourse() {
    const {error,message,setToNull,createCourse,course} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState(null)
    const [image2, setImage2] = useState(null)
    const [category, setCategory] = useState('')

    useEffect(() => {
        error && msg.error(error)
        message && msg.success(message)
        return ()=>{
            setToNull()
        }
    }, [error,message])

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

      const normFile = (e) => {
        // console.log(e.fileList.forEach((file,i)=>{
        //     console.log(file.originFileObj);
        // }))

        const kos = e.fileList.map(file=>{
            return file.originFileObj
        })
        kos[0] && setImages(kos[0])
        kos[1] && setImage2(kos[1])
      };

      function onFinish() {
          setLoading(true)
          const course = new FormData()
          course.append('name',name)
          course.append('description',description)

          images && course.append(`images`,images)
          image2 && course.append('image2',image2)
          
          course.append('category',category)
          for (var key of course.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

          createCourse(authenticated(),course)
          setLoading(false)
          setRedirect(true)
      }



      function onRemove(file) {
          const index = images.indexOf(file)
          const newImages = images.slice()
          newImages.splice(index,1)
          setImages(newImages)
        }


    return (
        <Layout style={{minHeight:'95vh'}}>
            <Divider orientation="left" style={{marginBottom:'95px'}}>Create new Course</Divider>
            <Col style={{width:'65%',margin:'0 auto 45px auto',}}>
                <Steps size="small" current={0}>
                    <Step title="Create course" icon={<LoadingOutlined />} />
                    <Step title="Add lessons" />
                    <Step title={'Review '+'&'+' Publish!'} />
                </Steps>
            </Col>

            <Row justify='center'>
                <Col style={{width:'90%'}}>
                    <Form
                        {...formItemLayout}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='name'
                            label='Name'
                            rules={[
                                {
                                    required:true,
                                    message:'Name of the course is required!'
                                }
                            ]}
                        >
                            <Input onChange={e=>setName(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name='description'
                            label='Description'
                            rules={[
                                {
                                    required:true,
                                    message:'Description is required!'
                                },
                                {
                                    pattern:/^.{15,35}$/,
                                    message:'Description should min 15 and max 35 characters!'
                                }
                            ]}
                        >
                            <Input.TextArea onChange={e=>setDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Image">
                            <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload
                                listType="text"
                                maxCount={2}
                                multiple
                                beforeUpload={false}
                                onRemove={onRemove}
                                >
                                <Button icon={<UploadOutlined />}>Upload (Max: 2)</Button>
                                </Upload>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            name='category'
                            label='Category'
                            rules={[
                                {
                                    required:true,
                                    message:'Please select a category!'
                                }
                            ]}
                        >
                            <Select style={{ width: 120 }} onChange={e=>setCategory(e)}>
                                <Option value="Design">Design</Option>
                                <Option value="It and Software">It and Software</Option>
                                <Option value="Development">Development</Option>
                                <Option value="Marketing">Marketing</Option>
                            </Select>
                        </Form.Item>
                        <Row justify='center'>
                            <Col>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                    Next step: Add Lessons!
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {redirect && <Redirect to={`/course/addlesson/${course._id}`}  />}
        </Layout>
    )
}
