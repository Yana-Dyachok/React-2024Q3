# Next.js. Server Side Rendering

## Technical requirements

1. Create a separate branch for this task from the previous branch task. Branch name: "nextjs-ssr-pages-api".
2. Next.js Pages Api Integration:
   - Migrate your application from vite to next.js by using Pages folder API.
   - React-router should be removed. You must use file-based routing provided by next.js (Pages Api).
   - You may need to adapt some existing libraries to work with next.js if necessary.
3. Next.js App Router Api Integration:
   - Create a separate branch for this point from "nextjs-ssr-pages-api" branch. Branch name: "nextjs-ssr-app-router-api".
   - You must use file-based routing provided by next.js (App Router)
   - [Migrate from Pages Api to App Router](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration).
4. Remix Integration:
   - Create a separate branch for this point from the previous branch task. Branch name: "remix-ssr".
   - Add the Remix framework to your vite config
   - [Update routing](https://remix.run/docs/en/main/file-conventions/routes)
   - Migrate your application to ssr with Remix

## Application Requirements

1. Application in each branch should function in accordance to the requirements provided in the previous modules, if they do not contradict with the new requirements provided in this module.
2. All the tests should pass, test coverage should be >= 80%.