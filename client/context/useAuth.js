import { useEffect, useState } from "react";
import { authenticated, decodedJwt } from "./../helpers/api-auth";
import axios from "axios";

export default function useAuth() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		async function getUser() {
			const config = {
				headers: {
					Authorization: "Bearer " + authenticated(),
				},
			};

			const res = await axios.get("/api/v1/users/" + decodedJwt()._id, config);
			setUser(res.data);
		}

		if (authenticated()) getUser();
	}, []);

	return user;
}
