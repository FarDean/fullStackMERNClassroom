import React from "react";

import { Layout, Row, Col, Typography, Button } from "antd";

const { Content } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

function EnrollmentContent({ enrollment, setLesson }) {
	return (
		<Layout>
			<Content>
				<Row justify="center">
					<Title style={{ marginTop: "39px" }}>
						Are you ready to learn some new stuff?
					</Title>
				</Row>
				<Row style={{ minHeight: "444px" }}>
					<Col
						style={{
							textAlign: "center",
							padding: "85px 33px",
						}}
						span={12}
						offset={6}
					>
						{localStorage.getItem("lesson") ? (
							<Button type="primary" block>
								Continue Learning!
							</Button>
						) : (
							<Button onClick={() => setLesson(0)} type="primary" block>
								Let's Get Started!
							</Button>
						)}
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default EnrollmentContent;
