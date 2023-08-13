"use client";
import React, { useEffect, useState, useRef } from "react";
import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { _BaseBtn } from "@/src/components/Buttons";
import { FaCloudUploadAlt } from "react-icons/fa";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(url);
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) {
      downloadImage(url);
    }
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.error("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={
        "flex flex-col justify-center items-center  rounded p-4 gap-y-4"
      }
    >
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="rounded-full bg-gray-300 w-[50px] h-[50px]"
          style={{ height: size, width: size }}
        />
      )}
      <_BaseBtn type={"ghost"} action={handleClick}>
        {uploading ? (
          "Uploading"
        ) : (
          <FaCloudUploadAlt size={24}  />
        )}
      </_BaseBtn>
      <input
        ref={inputRef}
        style={{
          display: "none",
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </div>
  );
}
