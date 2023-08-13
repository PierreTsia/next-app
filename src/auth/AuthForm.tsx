"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import { _BaseCard } from "@/src/components/_BaseCard";
import { useContext } from "react";
import { ThemeContext } from "@/src/theme/ThemeContext";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const redirectCallBackUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`;
  const { darkTheme } = useContext(ThemeContext);

  return (
    <_BaseCard>
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
        theme={darkTheme ? "dark" : "light"}
        showLinks={true}
        redirectTo={redirectCallBackUrl}
      />
    </_BaseCard>
  );
}
