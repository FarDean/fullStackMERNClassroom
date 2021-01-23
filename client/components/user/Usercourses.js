import React,{useEffect,useState,useContext} from 'react'
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { Spin,List,Typography } from "antd";

export default function Usercourses({match}) {
    const {message,error,courseByUser,getCourseByUser} = useContext(GlobalContext)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getCourseByUser(authenticated(),match.params)
        setLoading(false)
    }, [])

    console.log(courseByUser);

    if(loading) return <Spin />
    return (
        <>

            <List
                bordered
                dataSource={courseByUser}
                renderItem={item => (
                    <List.Item>
                    <Typography.Text mark>{item.published ? 'Published':'Not published yet'}</Typography.Text> {item.name}
                    </List.Item>
                )}
            />
        </>
    )
}
