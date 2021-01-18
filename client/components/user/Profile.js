import React,{useContext,useEffect,useState} from 'react'
import { Layout,Row,Col,Card,Avatar,Tooltip, Button, Divider } from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Header, Content, Sider } = Layout;

export default function Profile({match}) {
    const [loading, setLoading] = useState(false)
    const {readUser,error,user} = useContext(GlobalContext)

    useEffect(() => {
        setLoading(true)
        const jwt = authenticated()
        readUser(jwt,match.params)
        setLoading(false)
    }, [match.params])

    function checkAuth() {
        if(authenticated()){
            if(jwt_decode(authenticated()).isAdmin || jwt_decode(authenticated())._id === user._id){
                return <Tooltip placement="top" title='Edit Profile'>
                    <Link to={`/profile/edit/${jwt_decode(authenticated())._id}`}><Button><EditOutlined key="edit" /></Button></Link>
                    </Tooltip>

            }else return null
        }else return null
    }

    const editAction = (
        jwt_decode(authenticated()).isAdmin || jwt_decode(authenticated())._id === user._id && 
        <Tooltip placement="top" title='Edit Profile'>
        <Link to={`/profile/edit/${jwt_decode(authenticated())._id}`}><Button><EditOutlined key="edit" /></Button></Link>
        </Tooltip>
    )

    const addCourseAction = (
        jwt_decode(authenticated())._id === user._id && user.isTeacher &&
        <Link to='/course/add'><Button type='primary'>Create new course</Button></Link>
    )

    return (
        <Layout>
            <Content className="site-layout-background" style={{minHeight:'95vh'}}>
            <Divider orientation="left" style={{marginBottom:'95px'}}>Profile</Divider>
                <Row>
                    <Col span={10} offset={7} style={{border:'1px solid black'}}>
                        <Card
                            cover={<img alt='kos' src={`/api/v1/users/${match.params.userId}/image`} />}
                            actions={[
                                editAction,
                                addCourseAction
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src={`/api/v1/users/${match.params.userId}/image`} />} 
                                title={`${user.first_name} ${user.last_name}`}
                                description={user.description}
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}
