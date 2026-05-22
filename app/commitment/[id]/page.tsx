import CommitmentClient from "./view";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const resolvedParams = await params;

  return (
    <CommitmentClient
      commitmentId={resolvedParams.id}
    />
  );
}
