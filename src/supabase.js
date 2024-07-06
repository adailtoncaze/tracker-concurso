// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gfjffcsvurordhidfueg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmamZmY3N2dXJvcmRoaWRmdWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMTgwNDUsImV4cCI6MjAzNTY5NDA0NX0.zdayvtjGDf8oOjri4BycRXMJ7w3faJfS2wAb8BX3_pA'
export const supabase = createClient(supabaseUrl, supabaseKey)
