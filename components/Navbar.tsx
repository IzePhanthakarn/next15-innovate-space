import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  console.log('session', session);
  return (
    <header className="px-5 h-16 bg-[#0c0820] shadown-sm font-work-sans">
      <nav className="h-full flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.jpg" alt="logo" height={60} width={180} />
        </Link>

        <div className="flex items-center gap-5">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form action={async () => {
                "use server";
                await signOut({redirectTo: "/"});
              }}>
                <button type="submit"><span>Logout</span></button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                {/* <span>{session?.user?.name}</span> */}
                <Image src={session?.user?.image as string} alt="logo" height={40} width={40} className="rounded-full" />
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit"><span>Login</span></button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
