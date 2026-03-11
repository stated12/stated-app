import { createClient } from "@/lib/supabase/server";
import CommitmentClient from "./view";

export async function generateMetadata({ params }: { params: { id: string } }) {

  const supabase = await createClient();

  try {

    const { data } = await supabase
      .from("commitments")
      .select(`
        id,
        text,
        user_id,
        company_id,
        profiles:user_id (
          username,
          display_name,
          avatar_url
        ),
        companies:company_id (
          username,
          name,
          logo_url
        )
      `)
      .eq("id", params.id)
      .maybeSingle();

    if (!data) {
      return {
        title: "Commitment on Stated",
        description: "Public commitments and accountability",
      };
    }

    const isCompany = !!data.company_id;

    const profile: any = data.profiles;
    const company: any = data.companies;

    const name = isCompany
      ? company?.name
      : profile?.display_name || profile?.username;

    const title = `${name || "User"} on Stated`;

    const description =
      data.text?.slice(0, 140) ||
      "View this public commitment on Stated";

    const url = `https://app.stated.in/commitment/${params.id}`;

    const image = "https://app.stated.in/og-default.png";

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
            url: image,
            width: 1200,
            height: 630,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };

  } catch (err) {

    console.error("Metadata load error:", err);

    return {
      title: "Commitment on Stated",
      description: "Public commitments and accountability",
    };

  }
}

export default async function Page({ params }: { params: { id: string } }) {

  const supabase = await createClient();

  const { data } = await supabase
    .from("commitments")
    .select(`
      *,
      profiles:user_id (
        username,
        display_name,
        avatar_url
      ),
      companies:company_id (
        username,
        name,
        logo_url
      )
    `)
    .eq("id", params.id)
    .maybeSingle();

  return (
    <CommitmentClient
      commitment={data}
      commitmentId={params.id}
    />
  );
                                   }
