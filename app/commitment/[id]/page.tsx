"use client";

import { useParams } from "next/navigation";
import CommitmentClient from "./view";

export default function Page() {

  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading commitment...
      </div>
    );
  }

  return <CommitmentClient commitmentId={id} />;
}
