import { MongoClient } from 'mongodb'
import { PrismaClient } from '@/lib/generated/prisma/client'; 
import { PrismaPg } from '@prisma/adapter-pg' 

const MONGODB_URI = process.env.MONGO_CONNECTION;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

let client: any;

switch(process.env.DATABASE_TYPE){
  case "mongodb":
    client = new MongoClient(MONGODB_URI);
     try{
        await client.connect();
        }catch(e){
          console.log("Error Connecting To MongoDB !");
         }
    break;
  case "prisma":
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    client = new PrismaClient({ adapter });


    break;
  default:
    client = new PrismaClient();


    break;
}

 



export default client;