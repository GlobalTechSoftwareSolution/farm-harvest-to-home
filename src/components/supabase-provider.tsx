"use client"

import { supabase } from "@/app/lib/supabaseClient"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabaseClient] = useState(() => supabase)


  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}
