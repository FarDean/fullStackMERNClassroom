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
	Image,
	Drawer,
	Typography,
} from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { EditOutlined, BookTwoTone } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Usercourses from "./Usercourses";
import _ from "lodash";
import slugify from "slugify";
import { Helmet } from "react-helmet";

const { Meta } = Card;
const { Content } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

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

	function getImgUrl(courseId, imgId) {
		return (
			<Image
				width={100}
				height={100}
				src={`/api/v1/courses/${courseId}/image/${imgId}`}
				key={imgId}
			/>
		);
	}
	if (_.isEmpty(user) || loading) return <Spin />;
	return (
		<Layout>
			<Helmet>
				<title>
					FarDean's Classroom - {user.first_name} {user.last_name}
				</title>

				<meta
					name="title"
					content={`FarDean's Classroom ${user.first_name} ${user.last_name}`}
				/>
				<meta
					name="description"
					content="A classroom app made by React.
                It's only a Demo"
				/>

				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content={`FarDean's Classroom ${user.first_name} ${user.last_name}`}
				/>
				<meta
					property="og:description"
					content="A classroom app made by React.
                It's only a Demo"
				/>

				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:title"
					content={`FarDean's Classroom ${user.first_name} ${user.last_name}`}
				/>
				<meta
					property="twitter:description"
					content="A classroom app made by React.
                It's only a Demo"
				/>
			</Helmet>
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
				<Drawer
					title="Enrolled Courses"
					placement="top"
					closable={true}
					onClose={handleCancel}
					visible={visible}
					height={600}
				>
					{userEnrollments.map(enrollment => (
						<Link
							to={`/enrollments/${enrollment._id}/${slugify(enrollment.course.name)}`}
							key={enrollment._id}
						>
							<Row gutter={[8, 32]}>
								<Col
									span={6}
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<p>{enrollment.course.name}</p>
								</Col>
								<Col
									span={6}
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Image.PreviewGroup>
										{enrollment.course.images.map(img =>
											getImgUrl(enrollment.course._id, img._id)
										)}
									</Image.PreviewGroup>
								</Col>
								<Col
									span={6}
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text type="success">
										[{enrollment.lessonStatus.filter(x => x.complete).length}]
										out of {enrollment.lessonStatus.length} lessons compeleted
									</Text>
								</Col>
								<Col
									span={6}
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									{enrollment.createdAt.slice(0, 10)}
								</Col>
							</Row>
						</Link>
					))}
				</Drawer>
			</Content>
		</Layout>
	);
}
