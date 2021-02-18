import React, { useState } from "react";
import { List, Button, Modal, Typography } from "antd";

const { Title } = Typography;

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

	return (
		<List.Item>
			<p>{item.name}</p>
			<span style={{ color: "grey" }}>{item.description}</span>
			<Modal
				width="80%"
				title={item.name}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Enroll"
			>
				<p>{item.description}</p>
			</Modal>
			<Button onClick={showModal}>Details</Button>
		</List.Item>
	);
}
