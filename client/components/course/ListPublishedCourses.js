import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { Divider, Layout, List, Col, Spin, message as msg } from "antd";
import LPModal from "./LPModal";

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
			<Col span={16} offset={4}>
				<List
					size="large"
					dataSource={publishedCourses}
					renderItem={item => <LPModal item={item} />}
				/>
			</Col>
		</Layout>
	);
}
