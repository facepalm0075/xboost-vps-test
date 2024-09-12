import { redirect } from "next/navigation";
type props = {
  params: { gameId: string };
};

function NotFound({ params }: props) {
  redirect(`/services/${params.gameId}/boosting`);
}

export default NotFound;
