import React, { useEffect, useState, useContext } from "react";
import {
	Layout,
	Divider,
	Row,
	Col,
	Steps,
	Form,
	Spin,
	Input,
	Upload,
	Button,
	Select,
	message as msg,
	Collapse,
	Switch,
	Modal,
} from "antd";
import { LoadingOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated, decodedJwt } from "./../../helpers/api-auth";
import _ from "lodash";
import FormData from "form-data";

const { Step } = Steps;
const { Option } = Select;
const { Panel } = Collapse;

export default function ReviewCourse({ match }) {
	const { error, message, course, getCoursePrivate, setToNull } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);

	const [uploadState, setUploadState] = useState({
		previewVisible: false,
		previewImage: "",
		previewTitle: "",
		fileList: [],
	});

	const handleCancel = () => setUploadState({ previewVisible: false });
	const handleChange = ({ fileList }) => setUploadState(prev => (prev.fileList = fileList));

	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}

	async function handlePreview(file) {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setUploadState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
		});
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const { previewVisible, previewImage, fileList, previewTitle } = uploadState;
	console.log(fileList);

	/*********************************************/

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState(null);
	const [image2, setImage2] = useState(null);
	const [category, setCategory] = useState("");
	const [lessons, setLessons] = useState([]);

	useEffect(() => {
		setLoading(true);
		getCoursePrivate(authenticated(), match.params, decodedJwt()._id);
		setTimeout(() => {
			course.images &&
				setUploadState(
					prev =>
						(prev.fileList = course.images.map(image => ({
							uid: image._i,
							status: "done",
							url: `/api/v1/courses/${course._id}/image/${image._id}`,
						})))
				);
		}, 2000);
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		error && msg.error(error);
		message && msg.success(message);
		return () => {
			setToNull();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, message]);

	const formItemLayout = {
		labelCol: {
			xs: { span: 22 },
			sm: { span: 24, offset: 2 },
			md: { span: 3 },
			lg: { span: 4 },
			xl: { span: 5 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 20, offset: 2 },
			md: { span: 14, offset: 0 },
			lg: { span: 12, offset: 0 },
			xl: { span: 10, offset: 0 },
		},
	};
	const normFile = e => {
		// console.log(e.fileList.forEach((file,i)=>{
		//     console.log(file.originFileObj);
		// }))

		const kos = e.fileList.map(file => {
			return file.originFileObj;
		});
		kos[0] && setImages(kos[0]);
		kos[1] && setImage2(kos[1]);
	};

	if (loading || _.isEmpty(course)) return <Spin />;
	return (
		<Layout style={{ minHeight: "95vh" }}>
			<Divider orientation="left" style={{ marginBottom: "95px" }}>
				Review {"&"} Publish!
			</Divider>
			<Col style={{ width: "65%", margin: "0 auto 45px auto" }}>
				<Steps size="small" current={2}>
					<Step key={1} title="Create course" />
					<Step key={2} title="Add lessons" />
					<Step
						key={3}
						title={"Review " + "&" + " Publish!"}
						icon={<LoadingOutlined />}
					/>
				</Steps>
			</Col>
			<Form initialValues={course} {...formItemLayout}>
				<Form.Item
					name="name"
					label="Name"
					rules={[
						{
							required: true,
							message: "Name of the course is required!",
						},
					]}
				>
					<Input onChange={e => setName(e.target.value)} />
				</Form.Item>
				<Form.Item
					name="description"
					label="Description"
					rules={[
						{
							required: true,
							message: "Description is required!",
						},
						{
							pattern: /^.{15,35}$/,
							message: "Description should min 15 and max 35 characters!",
						},
					]}
				>
					<Input.TextArea onChange={e => setDescription(e.target.value)} />
				</Form.Item>

				<Upload
					action={`/api/v1/courses/${course._id}`}
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
					name="images"
					method="PUT"
				>
					{fileList && fileList.length >= 2 ? null : uploadButton}
				</Upload>
				<Modal
					visible={previewVisible}
					title={previewTitle}
					footer={null}
					onCancel={handleCancel}
				>
					<img alt="example" style={{ width: "100%" }} src={previewImage} />
				</Modal>

				<Form.Item
					name="category"
					label="Category"
					rules={[
						{
							required: true,
							message: "Please select a category!",
						},
					]}
				>
					<Select style={{ width: 150 }} onChange={e => setCategory(e)}>
						<Option value="Design">Design</Option>
						<Option value="It and Software">It and Software</Option>
						<Option value="Development">Development</Option>
						<Option value="Marketing">Marketing</Option>
					</Select>
				</Form.Item>
				<Form.Item name="lessons" label="Lessons">
					<Collapse>
						{course.lessons.map((lesson, i) => (
							<Panel key={i} header={lesson.title}>
								<Form.Item
									name="title"
									label="Title"
									rules={[{ required: true, message: "Please Add a title!" }]}
									initialValue={lesson.title}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="content"
									label="Content"
									rules={[
										{ required: true, message: "Please Add some content!" },
									]}
									initialValue={lesson.content}
								>
									<Input.TextArea />
								</Form.Item>
								<Form.Item
									name="resource_url"
									label="Reference"
									rules={[
										{
											pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
											message: "Please input a valid URL!",
										},
									]}
									initialValue={lesson.resource_url}
								>
									<Input />
								</Form.Item>
							</Panel>
						))}
					</Collapse>
				</Form.Item>
				<Form.Item name="published" label="Publish" initialValue={course.published}>
					<Switch checkedChildren="Yes" unCheckedChildren="No" />
				</Form.Item>
				<Row justify="center">
					<Col>
						<Form.Item>
							<Button type="primary" htmlType="submit" loading={loading}>
								Done!
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Layout>
	);
}
