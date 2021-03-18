import React, { useCallback, useContext, useEffect, useState } from "react";
import { Layout, Menu, Spin, Alert, message as msg } from "antd";
import { LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { isEmpty } from "lodash";

import EnrollmentContent from "./EnrollmentContent";
import Lesson from "./Lesson";

const { Sider } = Layout;
const { SubMenu } = Menu;

function ViewEnrollment({ match }) {
	const { getEnrollment, enrollment, error, message, setToNull } = useContext(GlobalContext);
	const [loading, setLoading] = useState(true);
	const [completedCount, setCompletedCount] = useState(0);
	const [alert, setAlert] = useState(false);

	const [lesson, setLesson] = useState(
		JSON.parse(localStorage.getItem(`${match.params.enrollmentId}`))
	);

	useEffect(() => {
		setLoading(true);
		getEnrollment(authenticated(), match.params);
		setLoading(false);
	}, [match.params]);

	useEffect(() => {
		!isEmpty(enrollment) &&
			setCompletedCount(enrollment.lessonStatus.filter(x => x.complete).length);
		if (enrollment.completed) setAlert(true);
		return () => setAlert(false);
	}, [enrollment]);
	useEffect(() => {
		error && msg.error(error);
		message && msg.success(message);
		return () => {
			setToNull();
		};
	}, [error, message]);

	const setLessonStorage = i => {
		localStorage.setItem(`${match.params.enrollmentId}`, JSON.stringify(i));
		setLesson(i);
	};

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
								<Menu.Item onClick={() => setLessonStorage(i)} key={i}>
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
						match={match}
					/>
				) : (
					<EnrollmentContent enrollment={enrollment} setLesson={setLesson} />
				)}
			</Layout>
		</>
	);
}

export default React.memo(ViewEnrollment);
