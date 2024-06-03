"use client"

import { useEffect } from "react"

interface Props {
  urls: Set<string>
  width: number
  height: number
  quality: number
}

export default function Canvas({ urls, width, height, quality }: Props) {
  useEffect(() => {
    const canvas = document.querySelector("canvas")!
    canvas.width = width * quality
    canvas.height = height * quality

    Array.from(urls).forEach((url, i) => {
      const img = document.createElement("img")
      img.src = url

      img.onload = () => {
        canvas
          .getContext("2d")!
          .drawImage(
            img,
            (i % width) * quality,
            Math.floor(i / width) * quality,
          )
      }
    })
  }, [])

  return <canvas />
}
