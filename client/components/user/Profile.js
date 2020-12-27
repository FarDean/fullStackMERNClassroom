import React,{useContext,useEffect,useState} from 'react'
import { Layout,Row,Col,Card,Avatar } from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
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

    console.log(user);
    console.log(error);
    return (
        <Layout>
            <Content className="site-layout-background" style={{minHeight:'95vh'}}>
                <Row>
                    <Col span={10} offset={7} style={{border:'1px solid black'}}>
                        <Card>
                            {/* <Meta avatar={<Avatar src='/api/v1/users/:userId/image' />} /> */}
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}
