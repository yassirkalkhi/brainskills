'use server';

import { auth } from "@/lib/utils/auth/auth";
import { LoginFormSchema } from "@/lib/utils/validations";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";




export type FormState = {
  message?: string;
  errors?: {
    email? : string[],
    password? :  string[]
  };
};


export async function loginUser(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {

  const rawFormData = Object.fromEntries(formData.entries());
  
  const validationResult = LoginFormSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  try {
    
    await auth.api.signInEmail({
    headers: await headers(),
    body: {
        email: validationResult.data.email,
        password: validationResult.data.password, 
      
    },
  
   });

    return { message: 'Login successful' };

  } catch (error) {
    return { message: error instanceof APIError ? error.message : 'Failed to login, Please try again !' + error };
  }
}