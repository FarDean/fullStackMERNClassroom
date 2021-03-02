import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Spin } from "antd";
import { LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { Switch, Link } from "react-router-dom";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { isEmpty } from "lodash";
import slugify from "slugify";

import EnrollmentContent from "./EnrollmentContent";
import Lesson from "./Lesson";

const { Sider } = Layout;
const { SubMenu } = Menu;

function ViewEnrollment({ match }) {
	const { getEnrollment, enrollment } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);

	const [lesson, setLesson] = useState(JSON.parse(localStorage.getItem("lesson")));

	useEffect(() => {
		setLoading(true);
		getEnrollment(authenticated(), match.params);
		setLoading(false);
	}, [match.params]);

	console.log(enrollment);
	console.log(lesson);

	if (loading || isEmpty(enrollment)) return <Spin />;
	return (
		<Layout style={{ minHeight: "95vh" }}>
			<Sider style={{ backgroundColor: "inherit" }}>
				{" "}
				<Menu mode="inline" style={{ height: "100%" }}>
					<Menu.Item icon={<NotificationOutlined />}>
						{enrollment.lessonStatus.filter(x => x.complete).length} lessons completed
					</Menu.Item>
					<SubMenu key="sub2" icon={<LaptopOutlined />} title="Lessons">
						{enrollment.course.lessons.map((lesson, i) => (
							<Menu.Item onClick={() => setLesson(i)} key={i}>
								{lesson.title}
							</Menu.Item>
						))}
					</SubMenu>
				</Menu>
			</Sider>
			{lesson !== null ? (
				<Lesson lessonIndex={lesson} enrollment={enrollment} setLesson={setLesson} />
			) : (
				<EnrollmentContent enrollment={enrollment} setLesson={setLesson} />
			)}
		</Layout>
	);
}

export default React.memo(ViewEnrollment);
