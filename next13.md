# NextJS 13



## Introduction

Performs either SSR or CSR depending on needs.

### Client-side rendering

User requests the webpage, server sends HTML with JavaScript and client downloads and renders the components and display website. SEO optimization is bad as crawlers cant execute JavsScript.

### Server-side rendering

Rendering the webpage on server before transmitting to client. Instead of letting client render it, it does that server side. **Immediately display** which is SEO efficient. Easy crawling and indexing.

### Why seo?

Crucial for optimizing website's visibility and ranking in search engine results. More organic traffic, better user experience, trustworthiness competetitive advantage.



## Routing

File-based routing system, which is handled by file system.

- app
  - blog `/blog`
  - about `https://localhost:3000/about`
  - profile `/profile`



## Full-stack

From Next.js version 9 they introduced <u>API Routes</u>. Serverless API's allows us to build and deploy APIs without managing server infrastructure and scaling as traffic increases.

- app

  - blog `/blog`

  - about `https://localhost:3000/about`

  - profile `/profile`
    - route.js



## Automatic code splitting

Code splitting breaks down large bundles of JavaScript into smaller, more manageable chunks that can be <u>loaded as needed</u>. Don't need original React diffucult code splitting.



## Data fetching

Three options when fetching data in Next

### Server Side Rendering (SSR)

Dynamic server rendered data. Fetched fresh on each request. Encuring always up-to-date content. This would be if we had some params and no-cache on fetch request.

### Static Site Generation (SSG)

This is default in Next. This will automatically cache content. Ideal for content which doesn't change often e.g. blog posts.

### Incremental Static Generation (ISR)

Combing SSR and SSG by being able to revalidate cached requests. We can define this ourself.
