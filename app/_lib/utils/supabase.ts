import { createClient } from '@supabase/supabase-js'

import { Database } from '@/app/_types/supabase'

export default createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'maple_land',
    },
  }
)
