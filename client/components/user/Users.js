import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { Layout, List, Avatar, Row, Col, Divider } from "antd";
import { message as msg } from "antd";
import { authenticated } from "./../../helpers/api-auth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const layout = {
	xs: { span: 24 },
	sm: { span: 20, offset: 2 },
	md: { span: 14, offset: 5 },
	lg: { span: 12, offset: 6 },
	xl: { span: 10, offset: 7 },
};

export default function Users() {
	const { listUsers, error, users, setToNull } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		listUsers(authenticated());
		setLoading(false);
	}, []);

	useEffect(() => {
		error && msg.error(error);
		return () => {
			setToNull();
		};
	}, [error]);

	return (
		<Layout style={{ minHeight: "95vh" }}>
			<Helmet>
				<title>FarDean's Classroom - Users</title>

				<meta name="title" content="FarDean's Classroom - Users" />
				<meta
					name="description"
					content="A classroom app made by React.
                It's only a Demo"
				/>

				<meta property="og:type" content="website" />
				<meta property="og:title" content="FarDean's Classroom - Users" />
				<meta
					property="og:description"
					content="A classroom app made by React.
                It's only a Demo"
				/>

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content="FarDean's Classroom - Users" />
				<meta
					property="twitter:description"
					content="A classroom app made by React.
                It's only a Demo"
				/>
			</Helmet>
			<Divider orientation="left">Users</Divider>
			<Row style={{ marginTop: "50px" }}>
				<Col {...layout}>
					<List
						itemLayout="horizontal"
						loading={loading}
						dataSource={users}
						renderItem={user => (
							<List.Item key={user._id}>
								<List.Item.Meta
									avatar={<Avatar src={`/api/v1/users/` + user._id + `/image`} />}
									title={
										<Link to={"/profile/" + user._id}>
											{user.first_name} {user.last_name}
										</Link>
									}
									description={user.description}
								/>
								<div>{user.title}</div>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</Layout>
	);
}
