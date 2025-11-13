import { createAuthClient } from "better-auth/react"
import { oneTapClient, organizationClient } from "better-auth/client/plugins"

export const { signIn, signUp, signOut, oneTap, useSession } = createAuthClient({
    plugins: [ 
        organizationClient(),
         oneTapClient({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
            promptOptions: {
                baseDelay: 1000,  
                maxAttempts: 5
            }
    })
    ] ,
    baseURL: process.env.APP_URL
})