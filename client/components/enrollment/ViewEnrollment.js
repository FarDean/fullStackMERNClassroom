import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Spin } from "antd";
import { LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { Switch, Link } from "react-router-dom";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { isEmpty } from "lodash";
import slugify from "slugify";
import Lesson from "./Lesson";
import PrivateRoute from "./../../helpers/PrivateRoute";

const { Sider } = Layout;
const { SubMenu } = Menu;

function ViewEnrollment({ match }) {
	const { getEnrollment, enrollment } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const [selectedKey, setSelectedKey] = useState(null);

	useEffect(() => {
		setLoading(true);
		getEnrollment(authenticated(), match.params);
		setSelectedKey(match.params.lessonId);
		setLoading(false);
	}, [match.params]);

	if (loading || isEmpty(enrollment)) return <Spin />;
	return (
		<Layout style={{ minHeight: "95vh" }}>
			<Sider style={{ backgroundColor: "inherit" }}>
				{" "}
				<Menu
					mode="inline"
					defaultSelectedKeys={[selectedKey]}
					defaultOpenKeys={["sub2"]}
					style={{ height: "100%" }}
				>
					<Menu.Item icon={<NotificationOutlined />}>
						{enrollment.lessonStatus.filter(x => x.complete).length} lessons completed
					</Menu.Item>
					<SubMenu key="sub2" icon={<LaptopOutlined />} title="Lessons">
						{enrollment.course.lessons.map((lesson, i) => (
							<Menu.Item key={i}>
								<Link
									to={`/enrollments/${enrollment._id}/${slugify(
										enrollment.course.name
									)}/${i}`}
								>
									{lesson.title}
								</Link>
							</Menu.Item>
						))}
					</SubMenu>
				</Menu>
			</Sider>

			<Switch>
				<PrivateRoute
					path="/enrollments/:enrollmentId/:slug/:lessonId"
					component={Lesson}
				/>
			</Switch>
		</Layout>
	);
}

export default React.memo(ViewEnrollment);
