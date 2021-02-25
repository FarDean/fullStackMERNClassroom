import React, { useContext, useEffect, useState } from "react";
import {
	Layout,
	Row,
	Col,
	Card,
	Avatar,
	Tooltip,
	Button,
	Divider,
	Tabs,
	Spin,
	Badge,
	Modal,
} from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { EditOutlined, BookTwoTone } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Usercourses from "./Usercourses";
import _ from "lodash";

const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;

const layout = {
	xs: { span: 24 },
	sm: { span: 20, offset: 2 },
	md: { span: 14, offset: 5 },
	lg: { span: 12, offset: 6 },
	xl: { span: 10, offset: 7 },
};

export default function Profile({ match }) {
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const { readUser, user, getAllEnrollments, userEnrollments } = useContext(GlobalContext);

	/*********** Modal **********/

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	useEffect(() => {
		readUser(authenticated(), match.params);
		getAllEnrollments(authenticated());
		setLoading(false);
	}, [match.params]);

	/***** card actions ******/
	const editAction =
		jwt_decode(authenticated()).isAdmin ||
		(jwt_decode(authenticated())._id === user._id && (
			<Tooltip placement="top" title="Edit Profile">
				<Link to={`/profile/edit/${jwt_decode(authenticated())._id}`}>
					<Button>
						<EditOutlined key="edit" />
					</Button>
				</Link>
			</Tooltip>
		));

	const addCourseAction = jwt_decode(authenticated())._id === user._id && user.isTeacher && (
		<Link to="/course/add">
			<Button type="primary">Create new course</Button>
		</Link>
	);

	const notCompletedEnrollments = userEnrollments.filter(enrollment => !enrollment.completed);

	const enrollmentAction = jwt_decode(authenticated())._id === user._id && (
		<Badge size="small" count={notCompletedEnrollments.length}>
			<Button onClick={showModal}>
				<BookTwoTone />
				Enrolled Courses
			</Button>
		</Badge>
	);

	console.log(userEnrollments);
	if (_.isEmpty(user) || loading) return <Spin />;
	return (
		<Layout>
			<Content className="site-layout-background" style={{ minHeight: "95vh" }}>
				<Divider orientation="left" style={{ marginBottom: "95px" }}>
					Profile
				</Divider>
				<Row>
					<Col {...layout}>
						<Tabs>
							<TabPane key="1" tab="Info">
								<Card
									cover={
										<img
											alt="kos"
											src={`/api/v1/users/${match.params.userId}/image`}
										/>
									}
									actions={[editAction, enrollmentAction, addCourseAction]}
								>
									<Meta
										avatar={
											<Avatar
												src={`/api/v1/users/${match.params.userId}/image`}
											/>
										}
										title={`${user.first_name} ${user.last_name}`}
										description={user.description}
										style={{ margin: "10px" }}
									/>
									<Card.Grid>Role : {user.title}</Card.Grid>
									<Card.Grid>Joined : {user.createdAt.substr(0, 10)}</Card.Grid>
								</Card>
							</TabPane>
							<TabPane key="2" tab="Courses created">
								<Usercourses match={match} />
							</TabPane>
						</Tabs>
					</Col>
				</Row>
				<Modal
					title="Enrolled Courses"
					visible={visible}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					{userEnrollments.map(enrollment => (
						<p>{enrollment.course.name}</p>
					))}
				</Modal>
			</Content>
		</Layout>
	);
}
