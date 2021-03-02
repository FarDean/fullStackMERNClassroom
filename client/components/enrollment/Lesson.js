import React, { useState } from "react";
import { Layout, Row, Typography, Divider, Button } from "antd";

const { Content } = Layout;
const { Link, Title, Paragraph } = Typography;

function Lesson({ lessonIndex, enrollment, setLesson }) {
	const [loading, setLoading] = useState(false);

	function onClick() {
		setLoading(true);
		localStorage.setItem("lesson", JSON.stringify(lessonIndex + 1));
		setLesson(prev => prev + 1);
		//complete goes here
		setLoading(false);
	}

	function onClick2() {
		setLoading(true);
		// complete goes here
		setLoading(false);
	}

	console.log("index", lessonIndex);

	return (
		<Layout>
			<Divider>Lesson {lessonIndex + 1}</Divider>
			<Content style={{ padding: "30px 55px" }}>
				{" "}
				<Row justify="center">
					<Title>{enrollment.course.lessons[lessonIndex].title}</Title>
				</Row>
				<Row>
					<Paragraph style={{ textAlign: "center" }}>
						<pre>{enrollment.course.lessons[lessonIndex].content}</pre>
					</Paragraph>
				</Row>
				<Row>
					Resource Url:
					<Link> {enrollment.course.lessons[lessonIndex].resource_url}</Link>
				</Row>
				{lessonIndex === enrollment.course.lessons.length - 1 ? (
					<Row style={{ marginTop: "65px" }} justify="center">
						<Button onClick={onClick2} type="primary">
							Complete!
						</Button>
					</Row>
				) : (
					<Row style={{ marginTop: "65px" }} justify="center">
						<Button onClick={onClick} type="primary">
							Complete {"&"} next!
						</Button>
					</Row>
				)}
			</Content>
		</Layout>
	);
}

export default React.memo(Lesson);
