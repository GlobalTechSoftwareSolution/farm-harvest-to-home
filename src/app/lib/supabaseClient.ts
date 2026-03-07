import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js' // Keep for potential type references if needed elsewhere, but instantiate with browser client

export const supabase = createPagesBrowserClient()