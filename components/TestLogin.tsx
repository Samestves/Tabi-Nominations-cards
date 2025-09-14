"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function TestLogin() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white p-6 flex flex-col items-center gap-2">
      {!session ? (
        <button
          onClick={() => signIn("twitter")}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
        >
          Login con X
        </button>
      ) : (
        <>
          <p>Hola {session.user?.name}</p>
          <img
            src={session.user?.image || "/shiroa.png"}
            alt="Avatar"
            className="w-12 h-12 rounded-full mt-1"
          />
          <button
            onClick={() => signOut()}
            className="mt-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
