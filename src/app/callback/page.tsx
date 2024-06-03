import { cookies } from "next/headers"
import Canvas from "./Canvas"

interface Props {
  searchParams: {
    code: string
  }
}

export default async function Callback({ searchParams: { code } }: Props) {
  const cookieStore = cookies()

  const width = parseInt(cookieStore.get("width")!.value)
  const height = parseInt(cookieStore.get("height")!.value)
  const quality = parseInt(cookieStore.get("quality")!.value)
  const term = cookieStore.get("term")!.value

  const { access_token } = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${process.env.ID}:${process.env.SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:3000/callback",
      }),
    },
  ).then((res) => res.json())

  const want = width * height
  const urls = new Set<string>()

  const fetchMore = async (iteration: number) => {
    const { items } = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&offset=${iteration * 50}&time_range=${term}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    ).then((res) => res.json())

    items.forEach((item: any) => {
      urls.add(
        item.album.images.find((image: any) => image.width === quality).url,
      )
    })

    if (urls.size < want) {
      await fetchMore(iteration + 1)
    }
  }

  await fetchMore(0)

  return (
    <div className="flex h-screen justify-center p-4">
      <Canvas urls={urls} width={width} height={height} quality={quality} />
    </div>
  )
}
