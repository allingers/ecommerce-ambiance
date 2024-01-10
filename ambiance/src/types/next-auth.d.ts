// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name: ReactNode
      /** Anpassade användarattribut om det behövs. */
      customAttribute?: string
    }
  }
}
