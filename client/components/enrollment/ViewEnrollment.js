import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Spin, Alert } from "antd";
import { LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { Switch, Link } from "react-router-dom";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { isEmpty } from "lodash";

import EnrollmentContent from "./EnrollmentContent";
import Lesson from "./Lesson";

const { Sider } = Layout;
const { SubMenu } = Menu;

function ViewEnrollment({ match }) {
	const { getEnrollment, enrollment } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const [completedCount, setCompletedCount] = useState(0);
	const [alert, setAlert] = useState(false);

	const [lesson, setLesson] = useState(JSON.parse(localStorage.getItem("lesson")));

	useEffect(() => {
		setLoading(true);
		getEnrollment(authenticated(), match.params);

		setLoading(false);
	}, [match.params]);
	useEffect(() => {
		!isEmpty(enrollment) &&
			setCompletedCount(enrollment.lessonStatus.filter(x => x.complete).length);
		if (enrollment.completed) setAlert(true);
	}, [enrollment]);

	if (loading || isEmpty(enrollment)) return <Spin />;
	return (
		<>
			{alert && <Alert closable message="You've completed this course!" type="warning" />}
			<Layout style={{ minHeight: "95vh" }}>
				<Sider style={{ backgroundColor: "inherit" }}>
					{" "}
					<Menu mode="inline" style={{ height: "100%" }}>
						<Menu.Item icon={<NotificationOutlined />}>
							{completedCount} lessons completed
						</Menu.Item>
						<SubMenu key="sub2" icon={<LaptopOutlined />} title="Lessons">
							{enrollment.course.lessons.map((lesson, i) => (
								<Menu.Item onClick={() => setLesson(i)} key={i}>
									{enrollment.lessonStatus[i].complete ? (
										<p style={{ textDecoration: "line-through" }}>
											{lesson.title}
										</p>
									) : (
										lesson.title
									)}
								</Menu.Item>
							))}
						</SubMenu>
					</Menu>
				</Sider>

				{lesson !== null ? (
					<Lesson
						lessonIndex={lesson}
						setCompletedCount={setCompletedCount}
						enrollment={enrollment}
						setLesson={setLesson}
					/>
				) : (
					<EnrollmentContent enrollment={enrollment} setLesson={setLesson} />
				)}
			</Layout>
		</>
	);
}

export default React.memo(ViewEnrollment);
