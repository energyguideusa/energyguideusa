import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kwanotlqkqeptdypuudr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3YW5vdGxxa3FlcHRkeXB1dWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4Nzg5OTQsImV4cCI6MjA4MzQ1NDk5NH0.XkQszLuEDwsU_mMIA_Gd9P6XsUDHgyvQ91giuWZ_fMI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)