import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { Divider, Layout, List, Col, Typography } from "antd";
import LPModal from "./LPModal";

const { Text, Link, Title } = Typography;

export default function ListPublishedCourses() {
	const { message, error, getPublishedCourses, setToNull, publishedCourses } = useContext(
		GlobalContext
	);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getPublishedCourses();
		return () => {
			setToNull();
		};
	}, []);

	console.log(publishedCourses);
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
