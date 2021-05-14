import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Helmet } from "react-helmet";

export default function Home() {
	return (
		<Layout>
			<Helmet>
				<title>FarDean's Classroom - Home</title>

				<meta name="title" content="FarDean's Classroom" />
				<meta
					name="description"
					content="A classroom app made by React.
                It's only a Demo"
				/>

				<meta property="og:type" content="website" />
				<meta property="og:title" content="FarDean's Classroom" />
				<meta
					property="og:description"
					content="A classroom app made by React.
                It's only a Demo"
				/>

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content="FarDean's Classroom" />
				<meta
					property="twitter:description"
					content="A classroom app made by React.
                It's only a Demo"
				/>
			</Helmet>
			Home Page!
		</Layout>
	);
}
