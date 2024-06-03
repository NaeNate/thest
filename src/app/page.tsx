import { domain } from "@/utils"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Home() {
  const direct = async (fd: FormData) => {
    "use server"

    const cookieStore = cookies()

    const width = fd.get("width")
    const height = fd.get("height")

    if (width && height) {
      cookieStore.set("width", width as string)
      cookieStore.set("height", height as string)
    }

    const quality = fd.get("quality")
    const term = fd.get("term")

    cookieStore.set("quality", quality as string)
    cookieStore.set("term", term as string)

    redirect(
      "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
          client_id: process.env.ID!,
          response_type: "code",
          redirect_uri: domain(),
          scope: "user-top-read",
        }),
    )
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="-translate-y-1/4 transform">
        <form action={direct} className="flex flex-col gap-2">
          <input
            type="number"
            name="width"
            placeholder="Width"
            className="rounded border p-2"
          />
          <input
            type="number"
            name="height"
            placeholder="Height"
            className="rounded border p-2"
          />

          <select
            name="quality"
            defaultValue="300"
            className="rounded border p-2"
          >
            <option value="640">High</option>
            <option value="300">Medium</option>
            <option value="64">Low</option>
          </select>

          <select
            name="term"
            defaultValue="medium_term"
            className="rounded border p-2"
          >
            <option value="long_term">Long</option>
            <option value="medium_term">Medium</option>
            <option value="short_term">Short</option>
          </select>

          <button className="rounded border p-2">Go</button>
        </form>
      </div>
    </div>
  )
}
