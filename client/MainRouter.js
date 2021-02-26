import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/user/Signin";
import Navbar from "./components/Navbar";
import Signup from "./components/user/Signup";
import Profile from "./components/user/Profile";
import Users from "./components/user/Users";
import PrivateRoute from "./helpers/PrivateRoute";
import DAuth from "./components/user/DAuth";
import RestrictedRoute from "./helpers/RestrictedRoute";
import Editprofile from "./components/user/Editprofile";
import Createcourse from "./components/course/Createcourse";
import Addlesson from "./components/course/Addlesson";
import ReviewCourse from "./components/course/ReviewCourse";
import ListPublishedCourses from "./components/course/ListPublishedCourses";
import ViewEnrollment from "./components/enrollment/ViewEnrollment";

export default function MainRouter() {
	return (
		<>
			<Route path="/" component={Navbar} />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/signup" component={Signup} />
				<PrivateRoute exact path="/users" component={Users} />
				<PrivateRoute exact path="/profile/:userId" component={Profile} />
				<PrivateRoute exact path="/dauth" component={DAuth} />
				<RestrictedRoute exact path="/profile/edit/:userId" component={Editprofile} />
				<PrivateRoute exact path="/course/add" component={Createcourse} />
				<PrivateRoute exact path="/course/addlesson/:courseId" component={Addlesson} />
				<PrivateRoute exact path="/course/review/:courseId" component={ReviewCourse} />
				<Route exact path="/courses" component={ListPublishedCourses} />
				<PrivateRoute exact path="/enrollments/:idSlug" component={ViewEnrollment} />
			</Switch>
		</>
	);
}
