import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { List, Button, Modal, Typography, Image, message as msg, Spin } from "antd";
import { Link } from "react-router-dom";
import { authenticated } from "./../../helpers/api-auth";
import { Redirect } from "react-router-dom";

const { Text, Title } = Typography;

const contentStyle = {
	height: "160px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79",
};

export default function LPModal({ item }) {
	const { enroll, error, message, setToNull } = useContext(GlobalContext);
	const [visible, setVisible] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		if (!authenticated()) return setRedirect(true);
		setLoading(true);
		enroll(authenticated(), item._id);
		setLoading(false);
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
				cancelText="Close"
			>
				{loading ? (
					<Spin />
				) : (
					<>
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
					</>
				)}
			</Modal>
			<Button onClick={showModal}>Details</Button>
			{redirect && <Redirect to="/signin" />}
		</List.Item>
	);
}
