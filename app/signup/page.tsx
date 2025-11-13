"use client";
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { signUpUser, FormState } from "@/actions/auth/signup";
import { oneTap } from 'better-auth/plugins';
import GoogleButton from '@/components/auth/google-auth-button';

const initialState: FormState = { message: undefined, errors: undefined };

const LoginForm = () => {

  const [state, formAction] = useActionState( signUpUser, initialState );
  const { pending } = useFormStatus();

  useEffect(() => {
    const showOneTap = async () => {
         await oneTap();
         console.log("One Tap initialized");
    }
    showOneTap();
  
  },[]);

  return (
    <form action={formAction}>
      {state.message && <p>{state.message}</p>}
      
      <div>
        <label htmlFor="fullName">Full Name :</label>
        <input type="text" name="fullName" id="fullName" required />
        {state.errors?.fullName && <p className="error">{state.errors.fullName}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
        {state.errors?.email && <p className="error">{state.errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        {state.errors?.password && <p className="error">{state.errors.password}</p>}
      </div>
      <button type="submit" disabled={pending}>Login</button>
      <GoogleButton/>
    </form>
  );
};

export default LoginForm;