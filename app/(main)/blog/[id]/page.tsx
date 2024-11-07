import MainChat from "@/app/components/MainChat";

type props = {
	params: { id: string };
};
function blog({ params }: props) {
	return (
		<>
			<div>post : {params.id}</div>
			
		</>
	);
}

export default blog;
