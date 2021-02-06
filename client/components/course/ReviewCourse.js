import React,{useEffect,useState,useContext} from 'react'
import { Layout,Divider,Row ,Col,Steps,Form,Spin,Input,Upload,Button,Select,message as msg} from "antd";
import { LoadingOutlined,UploadOutlined } from "@ant-design/icons";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated,decodedJwt } from "./../../helpers/api-auth";

const {Step} = Steps;
const {Option} = Select;

export default function ReviewCourse({match}) {
    const {error,message,course,getCoursePrivate,setToNull} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)

    const [fileList, setFileList] = useState([])

    const [images, setImages] = useState(null)
    const [image2, setImage2] = useState(null)

    useEffect(() => {
        setLoading(true)
        getCoursePrivate(authenticated(),match.params,decodedJwt()._id)
        setLoading(false)
    }, [])

    // const newFileList =fileList
    // for(let i= 0;i<course.images.length;i++){
    //     newFileList.push({id:i+1,name:`image${i}`,url:`/api/v1/courses/${course._id}/image/${course.images[i]._id}`})
    // }
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

      function beforeUpload(file) {
        setFileList([...fileList,file])
    }

    function onRemove(file) {
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index,1)
        setFileList(newFileList)
      }

    console.log(fileList);
    if(loading || !course) return <Spin />
    return (
        <Layout style={{minHeight:'95vh'}}>
            <Divider orientation="left" style={{marginBottom:'95px'}}>Review {'&'} Publish!</Divider>
            <Col style={{width:'65%',margin:'0 auto 45px auto',}}>
                <Steps size="small" current={2}>
                    <Step title="Create course" />
                    <Step title="Add lessons" />
                    <Step title={'Review '+'&'+' Publish!'} icon={<LoadingOutlined />} />
                </Steps>
            </Col>
            <Form>
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
                        fileList={fileList}
                        beforeUpload={beforeUpload}
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
        </Layout>
    )
}
