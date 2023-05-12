'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

export default function Nav() {
  const isUserLoggedIn = true; // TODO: replace with actual login status

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    (async () => {
      setProviders(await getProviders())
    })();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
          alt="Promptopia logo in navigation" />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop  navigation*/}
      <div className="sm:flex hidden">
        {isUserLoggedIn ?
          (
            <div className="flex gap-3 md:gap-5">
              <Link
                href="/create-prompt"
                className="black_btn"
              >
                Create Post
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="outline_btn"
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="Profile icon in navigation"
                />
              </Link>
            </div>
          ) :
          (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn">
                    Sign in
                  </button>
                ))}
            </>
          )}
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile icon in navigation"
              onClick={() => setToggleDropdown((prev => !prev))}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}