import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import { authenticated, decodedJwt } from "./../../helpers/api-auth";
import { message as msg, Spin } from "antd";

import _ from "lodash";
import RCmini from "./RCmini";

export default function ReviewCourse({ match }) {
	const { message, error, setToNull, getCoursePrivate, course } = useContext(GlobalContext);
	const [loading, setLoading] = useState(true);
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

	if (loading || _.isEmpty(course)) return <Spin />;
	return <RCmini course={course} match={match} />;
}
