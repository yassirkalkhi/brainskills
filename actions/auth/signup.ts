'use server';

import { auth } from "@/lib/utils/auth/auth";
import { signUpFormSchema} from "@/lib/utils/validations";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";




export type FormState = {
  message?: string;
  errors?: {
    email? : string[],
    password? :  string[],
    fullName? : string[],
  };
};


export async function signUpUser(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {

  const rawFormData = Object.fromEntries(formData.entries());
  
  const validationResult = signUpFormSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  try {
    
    await auth.api.signUpEmail({
     body: {
        name: validationResult.data.fullName,
        email: validationResult.data.email,
        password: validationResult.data.password, 
        callbackURL: process.env.APP_URL,
    },

    headers: await headers(),
   });


  } catch (error) {
    return { message: error instanceof APIError ? error.message : 'Failed to Sign You Up , Please try again !' };
  }
  
   redirect('/login?success=account_created');
}