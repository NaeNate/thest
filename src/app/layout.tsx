import "@/styles/globals.css"

export const metadata = {
  title: {
    default: "Thest",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
