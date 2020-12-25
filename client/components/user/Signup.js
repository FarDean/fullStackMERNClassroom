import React,{useEffect,useState,useContext} from 'react'
import { Layout,Divider } from 'antd';
import { Form, Input, Button} from 'antd';
import {  LockOutlined,MailOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { authenticated } from "./../../helpers/api-auth";
import { message } from 'antd';

export default function Signup() {
    return (
        <Layout>
            <Row style={{marginBottom:'110px'}}>
                <Divider orientation="left">Sign Up</Divider>
            </Row>
            <Row>
                
            </Row>
        </Layout>
    )
}
