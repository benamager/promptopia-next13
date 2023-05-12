## Project introduction

This is a NextJS tutorial from <u>JavaScript Mastery</u>. The following is my notes I wrote while doing it.



## Nice to understand

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

### Two methods of making API routes

### Method 1 (inside app directory)

Define `route.js` Inside the app directory like shown. But you cannot have both a `page.js` and a `route.js` in same folder. This will make code harder to understand.

- app

  - blog `/blog`
- about `https://localhost:3000/about`
  - **profile** `/profile`
  - **route.js**

### Method 2 (Inside api folder)

This seperates the backend and frontend logic. And is easier to maintain.

- app

  - **api**
    - **users**
      - **route.js**

  - profile `/profile`
    - page.js

### Inside the route.js

```javascript
export async function GET(request) {
	return new Response('Hello, Next.js!')
}
```

As you can see in the codeblock we define export a function which handles the GET request. Same with other requests such as `HEAD, POST, PUT, DELETE, PATCH` can be exported from the `route.js` file.



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



## SEO

Next has two kinds of metadata:

### Static Metadata

```javascript
export const metadata = {
	title: 'Home',
}

export default function Page() {
	return (
		<h1>Normal Next.js page with static metadata</h1>
	)
}
```

### Dynamic Metadata

```javascript
export async function generateMetadata({ params, searchParams }) {
	const product = await getProduct(params.id)
  return { title: product.title }
}

export default function Page() {
	return (
		<h1>Normal Next.js page with static metadata</h1>
	)
}
```

