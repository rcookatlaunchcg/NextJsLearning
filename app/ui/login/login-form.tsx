'use client';

import { authenticate } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <GoogleLoginButton />
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
      </div>
    </form>
  );
}

function GoogleLoginButton() {
  return (
    <Button className="mt-4 w-full"  name="action" value="google">
      Sign in with Google
    </Button>
  );
}