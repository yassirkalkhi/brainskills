import { betterAuth } from "better-auth";
import { username ,organization, oneTap} from "better-auth/plugins"
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { prismaAdapter } from "better-auth/adapters/prisma";
import  client  from "@/lib/utils/database/db";
import { nextCookies } from "better-auth/next-js"; 
  
let adapter;

switch(process.env.DATABASE_TYPE){
    case "mongodb":
        adapter = mongodbAdapter(client.db());
        break;
    case "prisma":
        adapter = prismaAdapter(client, { provider: "postgresql" });
        break;
    default:
        adapter = prismaAdapter(client, { provider: "postgresql" });
        break;
}
export const auth = betterAuth({
    database: adapter,
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
     }, 
    socialProviders: {
     google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

 session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    },
   advanced: {
        cookiePrefix: process.env.APP_NAME
    },

   rateLimit: { 
        storage: "database",
        modelName: "rateLimit", 
    },

  user: {
		additionalFields: {
			birthDate: {
				type: "date",
                required : false,
                defaultValue :new Date("2006-12-12T00:00:00.000Z")
			}
		},
	},
    telemetry: { enabled: false },
    
    plugins: [ username() , organization(), nextCookies(), oneTap()
     ],

    onAPIError : {
        errorURL : "/api-error",
    }
});


export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
export type Organization = typeof auth.$Infer.Organization