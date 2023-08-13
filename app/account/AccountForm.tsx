"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { _BaseCard } from "@/src/components/_BaseCard";
import Avatar from "@/app/account/Avatar";
import { FaEnvelope } from "react-icons/fa";
import { _BaseBtn } from "@/src/components/Buttons";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-bgColor flex flex-col justify-center items-center">
      <_BaseCard>
        {user && (
          <Avatar
            uid={user.id}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ fullname, username, website, avatar_url: url });
            }}
          />
        )}
        <div className={"p-4 flex justify-center items-center "}>
          <label className={"mr-2 "} htmlFor="email">
            <FaEnvelope size={24} className={"text-green-500"} />
          </label>
          <input id="email" type="text" value={session?.user.email} disabled />
        </div>
        <div className={"p-4 flex justify-between items-center px-12"}>
          <label
            htmlFor="fullName"
            className={"text-xs opacity-70 font-thin mr-2 w-3/12"}
          >
            Full Name
          </label>
          <input
            className={"w-9/12 p-2 rounded-md border-2 border-grey-400"}
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className={"p-4 flex justify-between items-center px-12"}>
          <label
            htmlFor="username"
            className={"text-xs opacity-70 font-thin mr-2 w-3/12"}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className={"w-9/12 p-2 rounded-md border-2 border-grey-400"}
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={"p-4 flex justify-between items-center px-12"}>
          <label
            htmlFor="website"
            className={"text-xs opacity-70 font-thin mr-2 w-3/12"}
          >
            Website
          </label>
          <input
            id="website"
            type="url"
            className={"w-9/12 p-2 rounded-md border-2 border-grey-400"}
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <section
          className={
            "flex justify-end gap-x-6  items-center w-6/12 mt-2 ml-auto pr-6"
          }
        >
          <_BaseBtn
            type={"primary"}
            action={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </_BaseBtn>

          <div>
            <form action="/auth/signout" method="post">
              <_BaseBtn type={"secondary"}>Sign out</_BaseBtn>
            </form>
          </div>
        </section>
      </_BaseCard>
    </div>
  );
}
