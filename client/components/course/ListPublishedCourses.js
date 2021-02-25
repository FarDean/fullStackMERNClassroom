import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { Divider, Layout, List, Col, Spin, message as msg } from "antd";
import LPModal from "./LPModal";

const layout = {
	xs: { span: 24 },
	sm: { span: 20, offset: 2 },
	md: { span: 16, offset: 4 },
	lg: { span: 14, offset: 5 },
	xl: { span: 12, offset: 6 },
};

export default function ListPublishedCourses() {
	const { error, message, getPublishedCourses, setToNull, publishedCourses } = useContext(
		GlobalContext
	);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getPublishedCourses();
		setLoading(false);
	}, []);

	useEffect(() => {
		error && msg.error(error);
		message && msg.success(message);
		return () => {
			setToNull();
		};
	}, [error, message]);

	if (loading) return <Spin />;
	return (
		<Layout style={{ minHeight: "95vh" }}>
			<Divider orientation="left" style={{ marginBottom: "95px" }}>
				Published Courses
			</Divider>
			<Col {...layout}>
				<List
					size="large"
					dataSource={publishedCourses}
					renderItem={item => <LPModal item={item} />}
				/>
			</Col>
		</Layout>
	);
}
