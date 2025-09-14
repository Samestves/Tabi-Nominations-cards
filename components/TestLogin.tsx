"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function TestLogin() {
  const { data: session } = useSession();

  const username = session?.user?.name; // 🔹 ahora name contiene el username

  return (
    <div className="text-white p-6">
      {!session ? (
        <button
          onClick={() => signIn("twitter")}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
        >
          Login con X
        </button>
      ) : (
        <div>
          <p>Hola, {username}</p> {/* 🔹 Mostramos el username de X */}
          <button
            onClick={() => signOut()}
            className="mt-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
