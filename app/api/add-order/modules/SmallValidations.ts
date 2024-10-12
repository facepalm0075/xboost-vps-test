import { addOrderLevelBoostRequest, addOrderNextRequest, addOrderRankBoostRequest, addOrderRankWinsRequest } from "@/lib/schema";
import { Session } from "next-auth";

export const baseValidation = (requestData: any) => {
	const { error: zodError } = addOrderNextRequest.safeParse(requestData);
	if (zodError) return false;
	return true;
};

export const rankBoostValidation = (requestData: any) => {
	const { error: zodError } = addOrderRankBoostRequest.safeParse(requestData);
	if (zodError) return false;
	return true;
};

export const rankWinsValidation = (requestData: any) => {
	const { error: zodError } = addOrderRankWinsRequest.safeParse(requestData);
	if (zodError) return false;
	return true;
};

export const levelBoostValidation = (requestData: any) => {
	const { error: zodError } = addOrderLevelBoostRequest.safeParse(requestData);
	if (zodError) return false;
	return true;
};

export const authCheck = async (session: Session | null) => {
	//if (!session) return false;
	return true;
};
