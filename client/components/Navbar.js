import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout } from "antd";
import { Typography } from "antd";
import { Row, Col } from "antd";
import { Menu } from "antd";
import { Drawer, Avatar, Button, Dropdown } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { authenticated, decodedJwt } from "./../helpers/api-auth";
import useAuth from "./../context/useAuth";
import MediaQuery from "react-responsive";
import { GlobalContext } from "./../context/GlobalContext";

const { Header } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

export default function Navbar() {
	const [burgerOpen, setBurgerOpen] = useState(false);
	const [current, setCurrent] = useState("home");
	const { signOut } = useContext(GlobalContext);
	const history = useHistory();

	const [visible, setVisible] = useState(false);

	const { user } = useAuth();

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	function handleClick(e) {
		setCurrent(e.key);
	}

	function logout() {
		signOut().then(() => history.push("/"));
	}
	const dropDownMenu = user ? (
		<Menu>
			<Menu.Item>
				<Link to={`/profile/${decodedJwt()._id}`}>Profile</Link>
			</Menu.Item>
			<Menu.Item onClick={logout}>Log Out</Menu.Item>
		</Menu>
	) : null;

	return (
		<Layout>
			<Header style={{ backgroundColor: "wheat" }}>
				<Row justify="space-between" align="middle">
					<Col>
						<Title level={3}>Classroommm...</Title>
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

								<Menu.Item key="users">
									<Link to="/users">Users</Link>
								</Menu.Item>
								<Menu.Item key="courses">
									<Link to="/courses">Courses</Link>
								</Menu.Item>
								{user && (
									<Menu.Item key="avatar">
										<Dropdown overlay={dropDownMenu}>
											<Link to={`/profile/${decodedJwt()._id}`}>
												<Avatar src={`/api/v1/users/${user._id}/image`} />
												{"  "}
												{user.first_name}
											</Link>
										</Dropdown>
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
							<Link to={`/profile/${decodedJwt()._id}`}>Profile</Link>
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
