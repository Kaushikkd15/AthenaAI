import { authMiddleware } from "@clerk/nextjs";

interface AuthMiddlewareConfig {
    publicRoutes: string[];
    ignoredRoutes: string[];
  }
export default authMiddleware ({
    publicRoutes: ['/', '/auth(.*)', '/portal(.*)', '/images(.*)', '/favicon.ico'],
    ignoredRoutes: ['/chatbot']
})
export const config = {
    matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  }