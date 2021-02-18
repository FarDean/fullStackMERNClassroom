import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { Divider, Layout, List, Button } from "antd";

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
			<List
				size="large"
				dataSource={publishedCourses}
				renderItem={item => (
					<List.Item>
						<p>{item.name}</p>
						<span style={{ color: "grey" }}>{item.description}</span>

						<Button>Details</Button>
					</List.Item>
				)}
			/>
		</Layout>
	);
}
