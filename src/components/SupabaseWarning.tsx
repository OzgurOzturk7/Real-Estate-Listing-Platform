import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function SupabaseWarning() {
  if (isSupabaseConfigured()) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Supabase Not Configured</AlertTitle>
      <AlertDescription>
        Authentication and favorites features require Supabase configuration. 
        Please click the <strong>Supabase button</strong> in the top-right corner of the platform 
        and enter your Project URL and API Key. 
        See <code>/docs/database_setup.md</code> for setup instructions.
      </AlertDescription>
    </Alert>
  );
}