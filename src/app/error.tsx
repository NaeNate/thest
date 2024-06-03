"use client"

import Link from "next/link"

export default function Error() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="text-3xl">Error</h1>
      <Link href="/" className="text-2xl underline">
        Home
      </Link>
    </div>
  )
}
