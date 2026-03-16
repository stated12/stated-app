import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {

try {

const { searchParams } = new URL(req.url);
const cursor = searchParams.get("cursor");

const supabase = await createClient();

const {
data: { user },
} = await supabase.auth.getUser();

if (!user) {
return NextResponse.json([]);
}

/* GET FOLLOWED USERS */

const { data: follows } = await supabase
.from("follows")
.select("following_user_id, following_company_id")
.eq("follower_user_id", user.id);

if (!follows || follows.length === 0) {
return NextResponse.json([]);
}

const userIds = follows
.filter((f) => f.following_user_id)
.map((f) => f.following_user_id);

const companyIds = follows
.filter((f) => f.following_company_id)
.map((f) => f.following_company_id);

/* FETCH COMMITMENTS */

let query = supabase
.from("commitments")
.select(`
id,
text,
category,
created_at,
views,
shares,
user_id,
company_id,
profiles (
username,
display_name,
avatar_url
),
companies (
username,
name,
logo_url
)
`)
.order("created_at", { ascending: false })
.limit(25);

if (cursor) {
query = query.lt("created_at", cursor);
}

/* FILTER BY FOLLOWED ACCOUNTS */

query = query.or(
`user_id.in.(${userIds.join(",")}),company_id.in.(${companyIds.join(",")})`
);

const { data } = await query;

const feed = (data || []).map((c: any) => {

const identity =
c.user_id
? {
type: "user",
username: c.profiles?.username,
display_name: c.profiles?.display_name,
avatar_url: c.profiles?.avatar_url,
}
: {
type: "company",
username: c.companies?.username,
display_name: c.companies?.name,
avatar_url: c.companies?.logo_url,
};

return {
id: c.id,
text: c.text,
category: c.category,
created_at: c.created_at,
views: c.views || 0,
shares: c.shares || 0,
identity,
};

});

return NextResponse.json(feed);

} catch (err) {

console.error("Following feed error:", err);

return NextResponse.json([]);

}

}
