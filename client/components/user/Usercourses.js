import React,{useEffect,useState,useContext} from 'react'
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { Spin,List,Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function Usercourses({match}) {
    const {courseByUser,getCourseByUser} = useContext(GlobalContext)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getCourseByUser(authenticated(),match.params)
        setLoading(false)
    }, [])

    if(loading) return <Spin />
    return (
        <>

            <List
                bordered
                dataSource={courseByUser}
                renderItem={item => (
                    <List.Item>
                    <ExclamationCircleOutlined style={{color:'orange',marginRight:'2px'}} /><Typography.Text style={{marginRight:'15px'}} type={item.published ? 'success':'warning'}>{item.published ? 'Published':'Draft'}</Typography.Text> {item.name}
                    </List.Item>
                )}
            />
        </>
    )
}
