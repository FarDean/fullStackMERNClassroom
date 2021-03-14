import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { authenticated, dAuth, decodedJwt } from "../../helpers/api-auth";
import { Layout, Divider, Form, Input, Row, Col, Button, Select, Switch, Modal, Image } from "antd";
import { message as msg } from "antd";
import FormData from "form-data";
import { Redirect } from "react-router-dom";
import _ from "lodash";

export default function Editpro({ match }) {
	const { error, personalInfo, getPersonalInfo, setToNull, updateUser, message } = useContext(
		GlobalContext
	);
	const [loading, setLoading] = useState(false);

	const layout = {
		xs: { span: 22 },
		sm: { span: 20 },
		md: { span: 16 },
		lg: { span: 12 },
		xl: { span: 10 },
	};

	function onFinish(values) {
		setLoading(true);
		getPersonalInfo(authenticated(), match.params, values);
		setLoading(false);
	}

	useEffect(() => {
		error && msg.error(error);
		message && msg.success(message);
		return () => {
			setToNull();
		};
	}, [error, message]);

	// form Component
	function Passform() {
		return (
			<Col {...layout}>
				<Form onFinish={onFinish}>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password placeholder="Confirm Your Paaswrd" />
					</Form.Item>
					<Row justify="center">
						<Col>
							<Form.Item>
								<Button type="primary" htmlType="submit" loading={loading}>
									Submit
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Col>
		);
	}

	// edit component
	function Edit() {
		const [imageUrl, setImageUrl] = useState(`/api/v1/users/${match.params.userId}/image`);
		const [loading, setLoading] = useState(false);

		const [image, setImage] = useState(null);
		const [first_name, setFirst_name] = useState("");
		const [last_name, setLast_name] = useState("");
		const [email, setEmail] = useState("");
		const [phone, setPhone] = useState("");
		const [password, setPassword] = useState("");
		const [isTeacher, setIsTeacher] = useState(personalInfo.isTeacher);
		const [isAdmin, setIsAdmin] = useState(personalInfo.isAdmin);
		const [redirect, setRedirect] = useState(false);

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
				lg: { span: 4 },
				xl: { span: 5 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20, offset: 2 },
				md: { span: 14, offset: 0 },
				lg: { span: 12, offset: 0 },
				xl: { span: 10, offset: 0 },
			},
		};

		//   Upload
		const onClick = e => {
			e.preventDefault();
			setLoading(true);
			let updatedUser = new FormData();
			image && updatedUser.append("image", image);
			Boolean(first_name) && updatedUser.append("first_name", first_name);
			Boolean(last_name) && updatedUser.append("last_name", last_name);
			Boolean(email) && updatedUser.append("email", email);
			Boolean(phone) && updatedUser.append("phone", phone);
			Boolean(password) && updatedUser.append("password", password);
			updatedUser.append("isTeacher", isTeacher);
			decodedJwt(authenticated()).isAdmin && updatedUser.append("isAdmin", isAdmin);

			// for (var key of updatedUser.entries()) {
			//     console.log(key[0] + ', ' + key[1]);
			// }
			updateUser(authenticated(), match.params, updatedUser);

			setLoading(false);
			setRedirect(true);
		};

		function onChange(e) {
			setImageUrl(URL.createObjectURL(e.target.files[0]));
			setImage(e.target.files[0]);
		}

		function revokeUrl() {
			setTimeout(() => {
				URL.revokeObjectURL(imageUrl);
			}, 10000);
		}

		return (
			<Col style={{ width: "90%" }}>
				<Row justify="center" style={{ marginBottom: "25px" }}>
					<Image width={100} src={imageUrl} onLoad={revokeUrl} />
				</Row>

				<Form initialValues={personalInfo} {...formItemLayout}>
					<Form.Item name="photo" style={{ overflow: "hidden" }} label="Profile Photo">
						<Input type="file" onChange={onChange} />
					</Form.Item>
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
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Password is Required!",
							},
							{
								pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message:
									"Password must be Minimum eight characters, at least one letter and one number!",
							},
						]}
						hasFeedback
					>
						<Input.Password onChange={e => setPassword(e.target.value)} />
					</Form.Item>
					<Form.Item
						name="confirm"
						label="Confirm Password"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please confirm your password!",
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}

									return Promise.reject(
										"The two passwords that you entered do not match!"
									);
								},
							}),
						]}
					>
						<Input.Password />
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
								<Button
									onClick={onClick}
									type="primary"
									htmlType="submit"
									loading={loading}
								>
									Submit
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
				{redirect && <Redirect push to="/users" />}
			</Col>
		);
	}

	return (
		<Layout style={{ minHeight: "95vh" }}>
			<Divider orientation="left" style={{ marginBottom: "95px" }}>
				Edit Profile
			</Divider>
			<Row justify="center">{_.isEmpty(personalInfo) ? <Passform /> : <Edit />}</Row>
		</Layout>
	);
}
