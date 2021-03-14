import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { decodedJwt, authenticated } from "./../../helpers/api-auth";
import {
	Upload,
	message as msg,
	Row,
	Col,
	Form,
	Divider,
	Input,
	Select,
	Switch,
	Button,
	Popconfirm,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import FormData from "form-data";
import { Redirect } from "react-router-dom";
import Layout from "antd/lib/layout/layout";
import jwtDecode from "jwt-decode";

export default function Editprofile({ match }) {
	const {
		message,
		error,
		getPersonalInfo,
		setToNull,
		updateUser,
		personalInfo,
		deleteUser,
	} = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState(`/api/v1/users/${match.params.userId}/image`);
	const [imageHash, setImageHash] = useState(Date.now());
	const [redirect, setRedirect] = useState(false);
	const [deleteRedirect, setdeleteRedirect] = useState(false);

	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [description, setDescription] = useState("");
	const [isTeacher, setIsTeacher] = useState(personalInfo.isTeacher);
	const [isAdmin, setIsAdmin] = useState(personalInfo.isAdmin);

	function onFinish() {
		setLoading(true);
		let updatedUser = new FormData();
		Boolean(first_name) && updatedUser.append("first_name", first_name);
		Boolean(last_name) && updatedUser.append("last_name", last_name);
		Boolean(email) && updatedUser.append("email", email);
		Boolean(phone) && updatedUser.append("phone", phone);
		Boolean(password) && updatedUser.append("password", password);
		Boolean(description) && updatedUser.append("description", description);
		updatedUser.append("isTeacher", isTeacher);
		decodedJwt(authenticated()).isAdmin && updatedUser.append("isAdmin", isAdmin);

		// for (var key of updatedUser.entries()) {
		// 	console.log(key[0] + ", " + key[1]);
		// }
		updateUser(authenticated(), match.params, updatedUser);

		setLoading(false);
		setRedirect(true);
	}

	const prefixSelector = (
		<Form.Item
			name="prefix"
			noStyle
			rules={[
				{
					required: true,
					message: "Please choose an area code!",
				},
			]}
		>
			<Select style={{ width: 70 }}>
				<Select.Option value="98">+98</Select.Option>
			</Select>
		</Form.Item>
	);

	const formItemLayout = {
		labelCol: {
			xs: { span: 22 },
			sm: { span: 24, offset: 2 },
			md: { span: 3 },
			lg: { span: 10 },
			xl: { span: 8 },
		},
		wrapperCol: {
			xs: { span: 22, offset: 2 },
			sm: { span: 20, offset: 3 },
			md: { span: 18, offset: 4 },
			lg: { span: 16, offset: 5 },
			xl: { span: 14, offset: 6 },
		},
	};

	useEffect(() => {
		setLoading(true);
		getPersonalInfo(authenticated(), match.params);

		setLoading(false);
	}, []);

	useEffect(() => {
		error && msg.error(error);
		message && msg.success(message);
		return () => {
			setToNull();
		};
	}, [error, message]);

	// function beforeUpload(file) {
	//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	//   if (!isJpgOrPng) {
	//     message.error('You can only upload JPG/PNG file!');
	//   }
	//   const isLt2M = file.size / 1024 / 1024 < 2;
	//   if (!isLt2M) {
	//     message.error('Image must smaller than 2MB!');
	//   }
	//   return isJpgOrPng && isLt2M;
	// }

	const handleChange = info => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			setLoading(false);
		}
		setImageUrl(`${imageUrl}?${imageHash}`);
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	// Delete stuff (popconfirm)
	function onConfirm() {
		setLoading(true);
		deleteUser(authenticated(), match.params);
		setLoading(false);
		setdeleteRedirect(true);
	}

	return (
		<Layout style={{ minHeight: "95vh" }}>
			<Divider orientation="left" style={{ marginBottom: "95px" }}>
				Edit Profile
			</Divider>

			<Row justify="center">
				<Form.Item>
					<Upload
						name="image"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						headers={{ Authorization: "Bearer " + authenticated() }}
						method="put"
						action={"/api/v1/users/" + match.params.userId}
						onChange={handleChange}
					>
						{!loading ? (
							<img
								src={imageUrl}
								key={Date.now()}
								alt="avatar"
								style={{ width: "100%" }}
							/>
						) : (
							uploadButton
						)}
					</Upload>
				</Form.Item>
			</Row>
			<Row>
				<Form
					{...formItemLayout}
					initialValues={personalInfo}
					style={{ width: "90%" }}
					onFinish={onFinish}
				>
					<Form.Item>
						<Form.Item
							name="first_name"
							label="First Name"
							rules={[
								{
									required: true,
									message: "Please input your first name!",
								},
							]}
						>
							<Input onChange={e => setFirst_name(e.target.value)} />
						</Form.Item>
						<Form.Item
							name="last_name"
							label="Last name"
							rules={[
								{
									required: true,
									message: "Please input your last name!",
								},
							]}
						>
							<Input onChange={e => setLast_name(e.target.value)} />
						</Form.Item>
						<Form.Item
							name="email"
							label="email"
							rules={[
								{
									required: true,
									message: "Please input your Email!",
								},
								{
									pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
									message: "This email is not valid!",
								},
							]}
						>
							<Input onChange={e => setEmail(e.target.value)} />
						</Form.Item>
						<Form.Item
							name="phone"
							label="Mobile"
							rules={[
								{
									required: true,
									message: "Please input a phone number",
								},
							]}
						>
							<Input
								addonBefore={prefixSelector}
								style={{ width: "100%" }}
								onChange={e => setPhone(e.target.value)}
							/>
						</Form.Item>
						{/* <Form.Item name='password' label='Password' rules={[
                      {
                          required: true,
                          message: 'Password is Required!'
                      },
                      {
                          pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                          message: 'Password must be Minimum eight characters, at least one letter and one number!'
                      }
                  ]} hasFeedback>
                      <Input.Password onChange={e=>setPassword(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                      name="confirm"
                      label="Confirm Password"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                      {
                          required: true,
                          message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                          validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                          }

                          return Promise.reject('The two passwords that you entered do not match!');
                          },
                      }),
                      ]}
                  >
                      <Input.Password />
                  </Form.Item> */}
						<Form.Item label="Description" name="description">
							<Input.TextArea
								allowClear
								onChange={e => setDescription(e.target.value)}
								placeholder="Write something about yourself!"
							/>
						</Form.Item>
						<Form.Item label="Teacher" name="isTeacher">
							<Switch
								checkedChildren="Yes"
								unCheckedChildren="No"
								checked={isTeacher}
								onChange={checked => setIsTeacher(checked)}
							/>
						</Form.Item>
						{decodedJwt(authenticated()).isAdmin && (
							<Form.Item label="Admin" name="isAdmin">
								<Switch
									checkedChildren="Yes"
									unCheckedChildren="No"
									checked={isAdmin}
									disabled={!decodedJwt().isAdmin}
									onChange={checked => setIsAdmin(checked)}
								/>
							</Form.Item>
						)}
						<Row justify="center">
							<Col>
								<Form.Item>
									<Button type="primary" htmlType="submit" loading={loading}>
										Submit
									</Button>
								</Form.Item>
							</Col>
							<Col>
								<Popconfirm
									title="Do you want to delete your account?"
									onConfirm={onConfirm}
									okButtonProps={loading}
								>
									<Button type="dashed" danger style={{ marginLeft: "25px" }}>
										Delete Account
									</Button>
								</Popconfirm>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</Row>
			{redirect && <Redirect push to={`/profile/${jwtDecode(authenticated())._id}`} />}
			{deleteRedirect && <Redirect push to="/" />}
		</Layout>
	);
}
