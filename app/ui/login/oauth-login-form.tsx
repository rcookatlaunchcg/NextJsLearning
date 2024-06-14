'use client';

import { authenticateOAuth } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function OAuthLoginButtons() {
  const [errorMessage, dispatch] = useFormState(authenticateOAuth, undefined);
  
  return (
    <form action={dispatch}>
      <div className="flex flex-col items-center">
        <Button name="action" value="google">
          Sign in with Google
        </Button>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}