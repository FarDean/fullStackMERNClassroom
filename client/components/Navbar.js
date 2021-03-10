import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Typography } from "antd";
import { Row, Col } from "antd";
import { Menu } from "antd";
import { Drawer, Avatar } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { authenticated } from "./../helpers/api-auth";
import jwt_decode from "jwt-decode";
import useAuth from "./../context/useAuth";
import MediaQuery from "react-responsive";

const { Header } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

export default function Navbar() {
	const [burgerOpen, setBurgerOpen] = useState(false);
	const [current, setCurrent] = useState("home");

	const [visible, setVisible] = useState(false);

	const user = useAuth();

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	function handleClick(e) {
		setCurrent(e.key);
	}
	console.log(user);

	return (
		<Layout>
			<Header style={{ backgroundColor: "wheat" }}>
				<Row justify="space-between" align="middle">
					<Col>
						<Title level={3}>Hi mother fucker</Title>
					</Col>

					<MediaQuery minWidth={800}>
						<Col>
							<Menu
								onClick={handleClick}
								selectedKeys={[current]}
								mode="horizontal"
								style={{ backgroundColor: "inherit" }}
							>
								<Menu.Item key="home">
									<Link to="/">Home</Link>
								</Menu.Item>
								{!authenticated() && (
									<Menu.Item key="signin">
										<Link to="/signin">Sign In</Link>
									</Menu.Item>
								)}
								{!authenticated() && (
									<Menu.Item key="signup">
										<Link to="/signup">Sign Up</Link>
									</Menu.Item>
								)}
								{authenticated() && (
									<Menu.Item key="profile">
										<Link to={`/profile/${jwt_decode(authenticated())._id}`}>
											Profile
										</Link>
									</Menu.Item>
								)}

								<Menu.Item key="users">
									<Link to="/users">Users</Link>
								</Menu.Item>
								<Menu.Item key="courses">
									<Link to="/courses">Courses</Link>
								</Menu.Item>
								{user && (
									<Menu.Item key="avatar">
										<Avatar src={`/api/v1/users/${user._id}/image`} />
									</Menu.Item>
								)}
							</Menu>
						</Col>
					</MediaQuery>

					<MediaQuery maxWidth={799}>
						<Col onClick={showDrawer}>
							{burgerOpen ? (
								<div className="icon">
									<MenuFoldOutlined />
								</div>
							) : (
								<div className="icon">
									<MenuUnfoldOutlined />
								</div>
							)}
						</Col>
					</MediaQuery>
				</Row>
			</Header>
			<Drawer
				title="Menu"
				placement="right"
				closable={true}
				onClose={onClose}
				visible={visible}
			>
				<Menu
					onClick={handleClick}
					selectedKeys={[current]}
					mode="vertical-left"
					style={{ backgroundColor: "inherit" }}
				>
					<Menu.Item key="home">
						<Link to="/">Home</Link>
					</Menu.Item>
					{!authenticated() && (
						<Menu.Item key="signin">
							<Link to="/signin">Sign In</Link>
						</Menu.Item>
					)}
					{!authenticated() && (
						<Menu.Item key="signup">
							<Link to="/signup">Sign Up</Link>
						</Menu.Item>
					)}
					{authenticated() && (
						<Menu.Item key="profile">
							<Link to={`/profile/${jwt_decode(authenticated())._id}`}>Profile</Link>
						</Menu.Item>
					)}

					<Menu.Item key="users">
						<Link to="/users">Users</Link>
					</Menu.Item>
					<Menu.Item key="courses">
						<Link to="/courses">Courses</Link>
					</Menu.Item>
				</Menu>
			</Drawer>
		</Layout>
	);
}
