export const domain = () =>
  process.env.NODE_ENV === "production"
    ? "https://thest.vercel.app/callback"
    : "http://localhost:3000/callback"
