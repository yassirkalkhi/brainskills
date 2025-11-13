"use client";


import { useFormStatus } from 'react-dom';
import { loginUser, FormState } from "@/actions/auth/login"
import { useActionState, useEffect } from 'react'; 
import GoogleButton from '@/components/auth/google-auth-button';

const initialState: FormState = { message: undefined, errors: undefined };

export default function  LoginForm  () {
     const [state, formAction] = useActionState(loginUser, initialState);
     const { pending } = useFormStatus(); 

  

    return (
       <form action={formAction}>
          {/* Display messages */}
        {state.message && <p>{state.message}</p>}
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
        <button type="submit" disabled={pending}>Signup</button>
       <GoogleButton/>
       </form>
    )

}
 