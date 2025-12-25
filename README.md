# Reactise - The React Boilerplate made by chankim

## Installation

- React Router is highly sensitive, and when you remove or add dependencies after cloning a project, the project structure can easily become corrupted, frequently causing the application to stop working correctly.
- Therefore, instead of cloning this boilerplate, it is recommended to initialize a new React Router project and then copy and paste the code according to the instructions below.
- When deploying the project to static hosting platforms such as GitHub Pages or Cloudflare Pages, Axios cannot be used.
- Since only the native fetch API is available, this boilerplate does not use Axios at all and relies exclusively on fetch.
- `npm install @heroicons/react`
- `npm i react-hot-toast`
- Since this project uses Vite, make sure to install Tailwind CSS using the Vite-specific setup.
- `npm install tailwindcss @tailwindcss/vite`
- COPY List - The files listed below are the ones you need to copy.
  - Add `<Toaster />` to App function in root.tsx
  - app.css
  - routes.ts
  - All files in routes dir.

## Search Icon in herocions.com

- [heroicons.com](https://heroicons.com)

## When running in npm dev under strict mode, useEffect runs twice.

- In `npm dev`, React runs useEffect twice when in strict mode
- As a result, features like toast or alert executed inside useEffect may appear twice on the screen.
- However, this is intended behavior and will not appear this way in production.

## Explain of Why I separate account and users dir.

- I'm not sure why, but whenever I put withdraw in the users directory, I keep getting a file-not-found error. So, I created an account folder and am managing it separately.
