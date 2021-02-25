import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { Divider, Layout, List, Col, Spin } from "antd";
import LPModal from "./LPModal";

export default function ListPublishedCourses() {
	const { getPublishedCourses, setToNull, publishedCourses } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getPublishedCourses();
		setLoading(false);
		return () => {
			setToNull();
		};
	}, []);

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
