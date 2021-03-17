if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
import express from "express";
const app = express();

import cors from "cors";
import compress from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import enrollmentRouter from "./routes/enrollment.routes";
import courseRouter from "./routes/course.routes";

// Server Sid stuff
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import MainRouter from "./../client/MainRouter";

import { compile } from "./devBundle";
compile(app);

const CURRENT_WORKING_DIRECTORY = process.cwd();
import path from "path";

import Template from "./../template";

// React Helmet
import { Helmet } from "react-helmet";

app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(function (req, res, next) {
	res.setHeader("Content-Security-Policy", "img-src 'self' blob:");
	return next();
});

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIRECTORY, "dist")));

app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", courseRouter);
app.use("/", enrollmentRouter);
// Now in turn we ask express to add a handler for any unmatched URL also '/' index route
app.get("/*", (req, res) => {
	const context = {};
	const markup = renderToString(
		<StaticRouter location={req.url} context={context}>
			<MainRouter />
		</StaticRouter>
	);
	const helmet = Helmet.renderStatic();
	if (context.url) return res.redirect(303, context.url);
	return res.status(200).send(Template({ markup, helmet }));
});

app.use((err, req, res, next) => {
	if (err.name === "UnautherizedError") {
		res.status(401).json({
			error: err.name + ": " + err.message,
		});
	} else if (err) {
		res.status(400).json({
			error: err.name + ": " + err.message,
		});
	}
});

export default app;
