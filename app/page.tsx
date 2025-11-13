"use client";
import { useSession } from "@/lib/utils/auth/auth-client";
import Image from "next/image";

export default function Home() {
    const {
        data: session,
        isPending,
        error,
    } = useSession();

 
  return (
   <nav>

  
    {isPending && <p>Loading...</p>} 
    {!session && <>
    <a href="/login">
      Login
    </a> <br />
    <a href="/signup">
      signup
    </a>

    </>
    }
    {error && <p>Error: {error.message}</p>}
    {!isPending && session && ( 
      <div>
        <p>Hello, {session.user.name}!</p>
        <Image src={session.user.image || "/placeholder.png"} alt="User Image" width={50} height={50} />
      </div>
    )}
    

   </nav>
  );
}