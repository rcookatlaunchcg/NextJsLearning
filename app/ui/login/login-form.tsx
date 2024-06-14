'use client';

import OAuthLoginButtons from './oauth-login-form';
import CredsLoginForm from './creds-login-form';
 
export default function LoginForm() {
  return (
    <>
      <CredsLoginForm />

      <div className="flex mt-6 gap-2 items-center [&>div]:h-[1px] [&>div]:bg-black [&>div]:flex-1">
        <div />
        <span className="text-xs leading-4">OR</span>
        <div />
      </div>

      <OAuthLoginButtons />
    </>
  );
}