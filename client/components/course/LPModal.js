import React, { useState } from "react";
import { List, Button, Modal, Typography, Carousel, Image } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const contentStyle = {
	height: "160px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79",
};

export default function LPModal({ item }) {
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	function getImgUrl(imgArr) {
		return imgArr.map(img => (
			<Image
				style={contentStyle}
				width={200}
				src={`/api/v1/courses/${item._id}/image/${img._id}`}
				key={img._id}
			/>
		));
	}

	console.log(item);
	return (
		<List.Item>
			<Title level={4}>{item.name}</Title>
			<span style={{ color: "grey" }}>{item.description}</span>
			<Modal
				width="40%"
				title={item.name}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Enroll"
			>
				<section style={{ marginBottom: "15px" }}>
					Description: <Text type="secondary">{item.description}</Text>
				</section>
				<section>
					<div>{getImgUrl(item.images)}</div>
				</section>
				<section style={{ marginTop: "15px" }}>
					Category: <Text type="success">{item.category}</Text>
				</section>
				<section>
					instructor:{" "}
					{item.instructor && (
						<Link to={`/profile/${item.instructor._id}`}>
							<Text type="warning">
								{item.instructor.first_name} {item.instructor.last_name}
							</Text>
						</Link>
					)}
				</section>
				<section>Created: {item.createdAt.slice(0, 10)}</section>
			</Modal>
			<Button onClick={showModal}>Details</Button>
		</List.Item>
	);
}
