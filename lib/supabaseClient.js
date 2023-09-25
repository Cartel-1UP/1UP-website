import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jmuiggsjykjcubaurkip.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdWlnZ3NqeWtqY3ViYXVya2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2Njc4MjcsImV4cCI6MTk5MDI0MzgyN30._L2Ck2hmif29gBoLOFdXwqBv0uCJPV4modkNjN6QvJg'
)
