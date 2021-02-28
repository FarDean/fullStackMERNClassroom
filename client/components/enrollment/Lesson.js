import React, { useContext } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { GlobalContext } from "./../../context/GlobalContext";

const { Content } = Layout;
const { Link, Title, Paragraph } = Typography;

function Lesson({ match }) {
	const { enrollment } = useContext(GlobalContext);

	return (
		<Layout>
			<Content style={{ padding: "30px 55px" }}>
				{" "}
				<Row justify="center">
					<Title>{enrollment.course.lessons[match.params.lessonId].title}</Title>
				</Row>
				<Row>
					<Paragraph style={{ textAlign: "center" }}>
						<pre>{enrollment.course.lessons[match.params.lessonId].content}</pre>
					</Paragraph>
				</Row>
				<Row>
					Resource Url:
					<Link> {enrollment.course.lessons[match.params.lessonId].resource_url}</Link>
				</Row>
			</Content>
		</Layout>
	);
}

export default React.memo(Lesson);
