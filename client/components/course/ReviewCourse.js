import React,{useEffect,useState,useContext} from 'react'
import { Layout,Divider ,Col,Steps} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated,decodedJwt } from "./../../helpers/api-auth";

const {Step} = Steps;

export default function ReviewCourse({match}) {
    const {error,message,course,getCoursePrivate,setToNull} = useContext(GlobalContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCoursePrivate(authenticated(),match.params,decodedJwt()._id)
        setLoading(false)
    }, [])

    console.log(course);
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
        </Layout>
    )
}
