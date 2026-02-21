import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {

  const supabase = await createClient();

  // GET USER
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  // GET PROFILE
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // GET COMMITMENTS
  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // PROFILE VIEWS
  const { count: profileViews } = await supabase
    .from("profile_views")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user.id);

  // COMMITMENT VIEWS
  const { count: commitmentViews } = await supabase
    .from("commitment_views")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  // TOTAL COMMITMENTS
  const total = commitments?.length ?? 0;

  const active =
    commitments?.filter((c) => c.status === "active").length ?? 0;

  const completed =
    commitments?.filter((c) => c.status === "completed").length ?? 0;

  const paused =
    commitments?.filter(
      (c) =>
        c.status === "paused" ||
        c.status === "withdrawn"
    ).length ?? 0;

  // CREDITS
  const credits = profile?.credits ?? 0;

  // AVATAR
  const avatar =
    profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || "User"
    )}&background=2563eb&color=fff`;

  return (

    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <Link
            href="/logout"
            className="text-sm text-gray-500"
          >
            Logout
          </Link>

        </div>


        {/* PROFILE CARD */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="flex items-center gap-4">

            <Image
              src={avatar}
              width={64}
              height={64}
              alt="avatar"
              className="rounded-full object-cover"
            />

            <div>

              <div className="text-lg font-semibold">
                {profile?.display_name || "No name set"}
              </div>

              <div className="text-gray-600 text-sm">
                {profile?.bio || "No bio added"}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                stated.app/u/{profile?.username}
              </div>

            </div>

          </div>


          <div className="flex gap-3 pt-4 flex-wrap">

            <Link
              href="/profile/edit"
              className="border px-4 py-2 rounded-lg"
            >
              Edit profile
            </Link>

            <Link
              href={`/u/${profile?.username}`}
              className="border px-4 py-2 rounded-lg"
            >
              Public profile
            </Link>

            <Link
              href="/upgrade"
              className="border px-4 py-2 rounded-lg"
            >
              Upgrade
            </Link>

          </div>

        </div>


        {/* CREDITS CARD */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="font-semibold text-lg">
            Credits remaining: {credits}
          </div>

          {credits === 0 && (

            <Link
              href="/upgrade"
              className="text-blue-600 text-sm"
            >
              Buy credits to continue
            </Link>

          )}

        </div>


        {/* ANALYTICS */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="font-semibold mb-3">
            Analytics
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              Profile views: {profileViews ?? 0}
            </div>

            <div>
              Total commitments: {total}
            </div>

            <div>
              Commitment views: {commitmentViews ?? 0}
            </div>

            <div>
              Active: {active}
            </div>

            <div>
              Completed: {completed}
            </div>

            <div>
              Paused / Withdrawn: {paused}
            </div>

          </div>

        </div>


        {/* CREATE COMMITMENT BUTTON */}
        <Link
          href="/commitment/new"
          className={`block text-center py-3 rounded-lg text-white font-medium ${
            credits === 0
              ? "bg-gray-400 pointer-events-none"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >

          {credits === 0
            ? "No credits remaining"
            : "Create Commitment"}

        </Link>


        {/* COMMITMENTS LIST */}
        <div className="space-y-4">

          <div className="font-semibold">
            Your commitments
          </div>


          {commitments?.length === 0 && (

            <div className="text-gray-500">
              No commitments yet
            </div>

          )}


          {commitments?.map((c) => {

            const endDate =
              c.end_date
                ? new Date(c.end_date)
                : null;

            const today =
              new Date();

            const daysLeft =
              endDate
                ? Math.ceil(
                    (endDate.getTime() -
                      today.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : null;


            return (

              <div
                key={c.id}
                className="bg-white rounded-xl shadow p-4"
              >

                <div className="font-medium text-base">
                  {c.text}
                </div>


                <div className="text-sm text-gray-500 mt-1 capitalize">

                  Status:
                  <span className="ml-1 font-medium">
                    {c.status}
                  </span>

                </div>


                {c.status === "active" && daysLeft !== null && (

                  <div className="text-sm text-gray-500 mt-1">

                    {daysLeft > 0
                      ? `${daysLeft} days remaining`
                      : "Expired"}

                  </div>

                )}


                <div className="text-xs text-gray-400 mt-1">

                  Created:
                  {" "}
                  {new Date(
                    c.created_at
                  ).toLocaleDateString()}

                </div>


                {/* ACTION BUTTONS */}
                {c.status === "active" && (

                  <div className="flex gap-2 mt-3 flex-wrap">

                    <Link
                      href={`/commitment/${c.id}/update`}
                      className="text-sm border px-3 py-1 rounded"
                    >
                      Add update
                    </Link>

                    <Link
                      href={`/commitment/${c.id}/complete`}
                      className="text-sm border px-3 py-1 rounded"
                    >
                      Complete
                    </Link>

                    <Link
                      href={`/commitment/${c.id}/pause`}
                      className="text-sm border px-3 py-1 rounded"
                    >
                      Pause
                    </Link>

                    <Link
                      href={`/commitment/${c.id}/withdraw`}
                      className="text-sm border px-3 py-1 rounded"
                    >
                      Withdraw
                    </Link>

                  </div>

                )}

              </div>

            );

          })}

        </div>


      </div>

    </div>

  );

      }
