import { addOrderNextRequest, addOrderRankBoostRequest } from "@/lib/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/_options";

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

export const authCheck = async () => {
	const session = await getServerSession(authOptions);
	//if (!session) return false;
	//console.log(session?.user?.email)
	return true;
};
