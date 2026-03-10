import { createClient } from "@/lib/supabase/server";
import CommitmentClient from "./view";

export async function generateMetadata({ params }: any) {

  const supabase = await createClient();

  const { data } = await supabase
    .from("commitments")
    .select(`
      text,
      user_id,
      company_id,
      profiles:user_id (
        username,
        display_name
      ),
      companies:company_id (
        username,
        name
      )
    `)
    .eq("id", params.id)
    .single();

  if (!data) {
    return {
      title: "Commitment on Stated",
      description: "Public commitments and accountability"
    };
  }

  const isCompany = !!data.company_id;

  const name =
    isCompany
      ? data.companies?.name
      : data.profiles?.display_name;

  const title = `${name} on Stated`;

  const description =
    data.text?.slice(0, 140) ||
    "View this public commitment on Stated";

  const url = `https://app.stated.in/commitment/${params.id}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Stated",
      type: "article",
      images: [
        {
          url: "https://app.stated.in/og-default.png",
          width: 1200,
          height: 630
        }
      ]
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://app.stated.in/og-default.png"]
    }
  };
}

export default function Page({ params }: any) {
  return <CommitmentClient commitmentId={params.id} />;
}
