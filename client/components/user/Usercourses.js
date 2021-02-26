import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated } from "./../../helpers/api-auth";
import { Spin, List, Typography, Button, Tooltip, Badge } from "antd";
import { ExclamationCircleOutlined, EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Usercourses({ match }) {
	const { courseByUser, getCourseByUser } = useContext(GlobalContext);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getCourseByUser(authenticated(), match.params);
		setLoading(false);
	}, []);

	console.log(courseByUser);

	if (loading) return <Spin />;
	return (
		<>
			<List
				bordered
				dataSource={courseByUser}
				renderItem={item => (
					<List.Item>
						<span>
							{!item.published && (
								<ExclamationCircleOutlined
									style={{ color: "orange", marginRight: "2px" }}
								/>
							)}
							<Typography.Text
								style={{ marginRight: "15px" }}
								type={item.published ? "success" : "warning"}
							>
								{item.published ? "Published" : "Draft"}
							</Typography.Text>
						</span>
						<span>
							<Link to={"/course/review/" + item._id}>{item.name}</Link>
						</span>
						{!item.published && (
							<>
								<Tooltip placement="top" title="Add Lesson">
									<span>
										<Link to={`/course/addlesson/${item._id}`}>
											<Badge
												size="small"
												count={item.lessons.length}
												title={`${item.lessons.length} lessons so far`}
											>
												<Button>
													<PlusSquareOutlined />
												</Button>
											</Badge>
										</Link>
									</span>
								</Tooltip>
								<Tooltip placement="top" title={"Review & Publish!"}>
									<span>
										<Link to={"/course/review/" + item._id}>
											<Button>
												<EditOutlined />
											</Button>
										</Link>
									</span>
								</Tooltip>
							</>
						)}
					</List.Item>
				)}
			/>
		</>
	);
}
