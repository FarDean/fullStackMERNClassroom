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
	const { message, error, setToNull, getCoursePrivate, course } = useContext(GlobalContext);
	const [loading, setLoading] = useState(true);

	const [published, setPublished] = useState(course.published);
	const [category, setCategory] = useState(course.category);
	const [image1, setImage1] = useState(null);
	const [image2, setImage2] = useState(null);

	/*********** Upload stuff**************/
	const props = {
		onRemove: file => {
			this.setState(state => {
				const index = state.fileList.indexOf(file);
				const newFileList = state.fileList.slice();
				newFileList.splice(index, 1);
				return {
					fileList: newFileList,
				};
			});
		},
		beforeUpload: file => {
			this.setState(state => ({
				fileList: [...state.fileList, file],
			}));
			return false;
		},
		fileList,
	};

	useEffect(() => {
		getCoursePrivate(authenticated(), match.params, decodedJwt()._id);
		setLoading(false);
		return () => {
			setToNull();
		};
	}, []);

	useEffect(() => {
		error && msg.error(error);
		message && msg.success(message);
		return () => {
			setToNull();
		};
	}, [error, message]);

	/************************************/
	/************************************/

	console.log(course);
	if (loading || _.isEmpty(course)) return <Spin />;
	return (
		<>
			<Layout style={{ minHeight: "95vh" }}>
				<Divider orientation="left" style={{ marginBottom: "95px" }}>
					Add Lessons
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
							<Card title="Name" bordered={false}>
								{course.name}
							</Card>
						</Col>
						<Col span={6}>
							<Card title="Description" bordered={false}>
								{course.description}
							</Card>
						</Col>
						<Col span={6}>
							<Card title="Published" bordered={false}>
								<Switch
									checkedChildren={<CheckOutlined />}
									unCheckedChildren={<CloseOutlined />}
									checked={published}
									onChange={checked => setPublished(checked)}
								/>
							</Card>
						</Col>
						<Col span={6}>
							<Card title="Created at" bordered={false}>
								{slise(course.createdAt)}
							</Card>
						</Col>
						<Col span={6}>
							<Card title="Images" bordered={false}>
								<Image.PreviewGroup>
									{getImgUrl(course).map((img, i) => (
										<Image key={i} width={200} src={img} />
									))}
								</Image.PreviewGroup>
								<Upload>
									<Button icon={<UploadOutlined />}>Change Pictures</Button>
								</Upload>
							</Card>
						</Col>
						<Col span={6}>
							<Card title="Category" bordered={false}>
								<Select
									value={category}
									style={{ width: 120 }}
									onChange={e => setCategory(e)}
								>
									<Option value="Design">Design</Option>
									<Option value="It and Software">It and Software</Option>
									<Option value="Development">Development</Option>
									<Option value="Marketing">Marketing</Option>
								</Select>
							</Card>
						</Col>
					</Row>
				</div>
			</Layout>
		</>
	);
}
