import { useEffect, useState } from "react";
import { authenticated, decodedJwt } from "./../helpers/api-auth";
import axios from "axios";
export default function useAuth() {
	const token = authenticated(); // extracted a complicated expression
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		async function getUser() {
			const config = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};
			setLoading(true);
			const res = await axios.get("/api/v1/users/" + decodedJwt()._id, config);
			setUser(res.data);
			setLoading(false);
		}

		if (token) getUser();
	}, [token]);

	return { user, loading };
}
