import React, { useState, useContext } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import {
	Layout,
	Steps,
	Divider,
	Col,
	Row,
	Card,
	Switch,
	Image,
	Select,
	Upload,
	Button,
	Modal,
	List,
} from "antd";
import { LoadingOutlined, CloseOutlined, CheckOutlined, UploadOutlined } from "@ant-design/icons";
import _ from "lodash";

const { Step } = Steps;
const { Option } = Select;

function slise(date) {
	return date.slice(0, 10);
}

export default function RCmini({ course, match }) {
	const { editCourse } = useContext(GlobalContext);

	const [published, setPublished] = useState(course.published);
	const [category, setCategory] = useState(course.category);

	/**************** Modal********************/
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

	/*********** Upload stuff**************/
	const [fileList, setFileList] = useState([]);

	const handleUpload = () => {
		const formData = new FormData();
		if (!_.isEmpty(fileList))
			fileList.forEach((file, i) => {
				formData.append(`files${i}`, file);
			});
		formData.append("category", category);
		formData.append("published", published);

		for (var key of formData.entries()) {
			console.log(key[0] + ", " + key[1]);
		}

		editCourse(authenticated(), match.params, formData);
	};
	const props = {
		onRemove: file => {
			setFileList(prev => {
				const index = prev.indexOf(file);
				const newFileList = prev.slice();
				newFileList.splice(index, 1);
				return newFileList;
			});
		},
		beforeUpload: file => {
			setFileList(prev => [...prev, file]);
			return false;
		},
		fileList,
	};

	function getImgUrl(course) {
		return course.images.map(image => `/api/v1/courses/${course._id}/image/${image._id}`);
	}

	return (
		<>
			<Layout style={{ minHeight: "95vh" }}>
				<Divider orientation="left" style={{ marginBottom: "95px" }}>
					Review {"&"} Publish
				</Divider>
				<Col style={{ width: "65%", margin: "0 auto 45px auto" }}>
					<Steps size="small" current={3}>
						<Step title="Create course" />
						<Step title="Add lessons" />
						<Step title={"Review & Publish!"} icon={<LoadingOutlined />} />
					</Steps>
				</Col>
				<div className="site-card-wrapper">
					<Row gutter={16}>
						<Col span={6}>
							<Card
								title="Name"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{course.name}
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="Description"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{course.description}
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="Published"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Switch
									checkedChildren={<CheckOutlined />}
									unCheckedChildren={<CloseOutlined />}
									checked={published}
									onChange={checked => setPublished(checked)}
								/>
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="Created at"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{slise(course.createdAt)}
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="Images"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{fileList.length === 0 && (
									<Image.PreviewGroup>
										{getImgUrl(course).map((img, i) => (
											<Image key={i} width={200} src={img} />
										))}
									</Image.PreviewGroup>
								)}

								<Upload {...props}>
									<Button
										disabled={fileList.length === 2}
										icon={<UploadOutlined />}
										style={{ marginTop: "7px" }}
									>
										Change Pictures
									</Button>
								</Upload>
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="Category"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Select
									defaultValue={course.category}
									style={{ width: 140 }}
									onChange={e => setCategory(e)}
								>
									<Option value="Design">Design</Option>
									<Option value="It and Software">It and Software</Option>
									<Option value="Development">Development</Option>
									<Option value="Marketing">Marketing</Option>
								</Select>
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="Lessons"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Button onClick={showModal}>{course.lessons.length} Lessons</Button>
								<Modal
									title="Basic Modal"
									visible={visible}
									onOk={handleOk}
									onCancel={handleCancel}
								>
									<List
										size="small"
										bordered
										dataSource={course.lessons}
										renderItem={item => <List.Item>{item.title}</List.Item>}
									/>
								</Modal>
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="Submit"
								bordered={false}
								style={{
									minHeight: "312px",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Button type="primary" onClick={handleUpload}>
									Submit
								</Button>
							</Card>
						</Col>
					</Row>
				</div>
			</Layout>
		</>
	);
}
