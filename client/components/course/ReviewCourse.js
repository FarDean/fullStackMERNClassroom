import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated, decodedJwt } from "./../../helpers/api-auth";
import {
	message as msg,
	Layout,
	Steps,
	Divider,
	Col,
	Row,
	Card,
	Switch,
	Spin,
	Image,
	Select,
	Upload,
	Button,
} from "antd";
import { LoadingOutlined, CloseOutlined, CheckOutlined, UploadOutlined } from "@ant-design/icons";
import _ from "lodash";

const { Step } = Steps;
const { Option } = Select;

function slise(date) {
	return date.slice(0, 10);
}

function getImgUrl(course) {
	return course.images.map(image => `/api/v1/courses/${course._id}/image/${image._id}`);
}

export default function ReviewCourse({ match }) {
	const { message, error, setToNull, getCoursePrivate, course, editCourse } = useContext(
		GlobalContext
	);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getCoursePrivate(authenticated(), match.params, decodedJwt()._id);
		setLoading(false);
		return () => {
			setToNull();
		};
	}, []);

	const [published, setPublished] = useState(course.published);
	const [category, setCategory] = useState(course.category);

	/*********** Upload stuff**************/
	const [fileList, setFileList] = useState([]);

	const handleUpload = () => {
		const formData = new FormData();
		if (_.isEmpty(fileList))
			fileList.forEach(file => {
				formData.append("files[]", file);
			});
		formData.append("category", category);
		formData.append("published", published);

		// for (var key of formData.entries()) {
		// 	console.log(key[0] + ", " + key[1]);
		// }

		setLoading(true);
		editCourse(authenticated(), match.params, formData);
		setLoading(false);
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

	useEffect(() => {
		error && msg.error(error);
		message && msg.success(message);
		return () => {
			setToNull();
		};
	}, [error, message]);

	/************************************/
	console.log(category);
	/************************************/

	console.log(published);
	if (loading || _.isEmpty(course)) return <Spin />;
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
								{course.lessons.length} Lessons
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
								<Button onClick={handleUpload}>Submit</Button>
							</Card>
						</Col>
					</Row>
				</div>
			</Layout>
		</>
	);
}
