import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://ptgqkvfmenzvczeshlhm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0Z3FrdmZtZW56dmN6ZXNobGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MzE4NDEsImV4cCI6MjA0OTAwNzg0MX0.097mgLl-0ovg4hcAS_pDEQU4mXr5NTVnNOxCifowuTA";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);