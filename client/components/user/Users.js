import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { Layout, List, Avatar, Row, Col, Divider } from "antd";
import { message as msg } from "antd";
import { authenticated } from "./../../helpers/api-auth";
import { Link } from "react-router-dom";

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
