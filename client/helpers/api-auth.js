import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function authenticated() {
	if (Cookies.get("jwt")) return Cookies.get("jwt");
	else return false;
}

export function decodedJwt() {
	if (authenticated()) return jwt_decode(authenticated());
	else return "";
}

export function dAuth() {
	if (Cookies.get("dAuth")) return Cookies.get("dAuth");
	else return false;
}

export const deleteauth = () => {
	if (Cookies.get("jwt")) return Cookies.remove("jwt");
};
