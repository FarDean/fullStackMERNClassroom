import React, { useState, useContext, useEffect } from "react";
import { Layout, Row, Typography, Divider, Button, message as msg } from "antd";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { Redirect } from "react-router-dom";

const { Content } = Layout;
const { Link, Title, Paragraph } = Typography;

function Lesson({ lessonIndex, enrollment, setCompletedCount, setLesson, match }) {
	const [loading, setLoading] = useState(false);
	const { completeLesson } = useContext(GlobalContext);
	const token = authenticated();
	const [redirect, setRedirect] = useState(false);

	function onClick() {
		setLoading(true);
		localStorage.setItem(`${match.params.enrollmentId}`, JSON.stringify(lessonIndex + 1));
		completeLesson(token, enrollment._id, {
			complete: true,
			lessonStatusId: enrollment.lessonStatus[lessonIndex]._id,
		});
		setCompletedCount(prev => (prev += 1));
		setLesson(prev => prev + 1);
		//complete goes here
		setLoading(false);
	}

	function onClick2() {
		setLoading(true);
		completeLesson(token, enrollment._id, {
			courseCompleted: true,
			complete: true,
			lessonStatusId: enrollment.lessonStatus[lessonIndex]._id,
		});
		setRedirect(true);
		setLoading(false);
	}

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
				{enrollment.lessonStatus[lessonIndex].complete ? null : lessonIndex ===
				  enrollment.course.lessons.length - 1 ? (
					<Row style={{ marginTop: "65px" }} justify="center">
						<Button loading={loading} onClick={onClick2} type="primary">
							Complete!
						</Button>
					</Row>
				) : (
					<Row style={{ marginTop: "65px" }} justify="center">
						<Button loading={loading} onClick={onClick} type="primary">
							Complete {"&"} next!
						</Button>
					</Row>
				)}
			</Content>
			{redirect && <Redirect to="/" />}
		</Layout>
	);
}

export default React.memo(Lesson);
