"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import { _BaseCard } from "@/src/components/_BaseCard";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <_BaseCard>
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        showLinks={false}
        redirectTo="http://localhost:3000/auth/callback"
      />
    </_BaseCard>
  );
}
