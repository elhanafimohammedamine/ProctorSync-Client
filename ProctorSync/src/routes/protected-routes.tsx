import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "@/redux/state/authSlice"
import { RootState } from "@/redux/store/store";


type Props = { children: React.ReactNode, allowedRole: string };



const ProtectedRoute = ({ children, allowedRole }: Props) => {

	const {roles} = useSelector((state: RootState) => state.userState)

	const location = useLocation();
	const isUserAuthenticated  = useSelector(isAuthenticated)

	const isAuthorized = isUserAuthenticated && roles?.includes(allowedRole);
	return isAuthorized ? (
		<>{children}</>
	) : (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
