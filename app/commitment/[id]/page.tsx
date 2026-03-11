import CommitmentClient from "./view";

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <CommitmentClient commitmentId={params.id} />;
}
