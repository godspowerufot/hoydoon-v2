# HoydoonWeb Documentation

## Project Overview
HoydoonWeb is a modern web application built with Next.js. This documentation provides a detailed overview of the project's structure, the tools and technologies used, and guidelines for managing assets and environment variables.

## Folder Structure

The codebase is organized to promote scalability and maintainability. Here is a breakdown of the key directories:

### `app`
This is the core directory for the Next.js App Router. It contains the application's routes, layouts, and pages.
- **Routes**: Each folder inside `app` represents a route segment (e.g., `app/about` maps to `/about`).
- **`page.jsx/tsx`**: The UI for a specific route.
- **`layout.tsx`**: Shared UI for a segment and its children (e.g., headers, footers).
- **`globals.css`**: Global styles for the application.

### `components`
Contains reusable UI components used throughout the application.
- These components are modular and can be imported into pages or other components.
- Examples might include buttons, form inputs, cards, and navigation bars.

### `constants`
Holds constant variables and static configuration data.
- This is the place to store values that are used across the app but don't change often, such as navigation links, API endpoints (if hardcoded), or configuration objects.
- Keeping these separate avoids magic strings and numbers in your code.

### `hooks`
Contains custom React hooks.
- Hooks allow you to extract and reuse stateful logic across different components.
- For example, a `useWindowSize` hook or a `useAuth` hook would live here.

### `public`
This directory is for static assets such as images, fonts, and icons.
- Files inside `public` can be referenced by your code starting from the base URL (`/`).
- For example, an image at `public/logo.png` can be accessed via `/logo.png`.

### `store`
Manages the global state of the application using Redux.
- **`store.ts`**: The main Redux store configuration.
- **`slices`**: Redux slices that define state, reducers, and actions for specific features (e.g., user session, cart items).

### `utils`
Contains utility functions and helper classes.
- These are pure functions that perform specific tasks, such as date formatting, data validation, or string manipulation.
- Keeping logic here keeps components clean and focused on UI.

### `types`
Holds TypeScript type definitions and interfaces.
- Defines the shape of data objects, props, and API responses to ensure type safety across the application.

## Tools & Technologies

- **Next.js**: The React framework used for building the application, providing features like server-side rendering, static site generation, and file-based routing.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development. Styles are applied directly in the JSX using class names.
- **Redux**: A state management library for JavaScript apps, used here to manage global application state in a predictable way.
- **TypeScript**: A typed superset of JavaScript that adds static types, improving code quality and developer experience.

## Image Management

All static images are stored in the `public` directory.

### Best Practices
1.  **Location**: Place all images (PNG, JPG, SVG, WebP) in the `public` folder. You can organize them into subfolders (e.g., `public/images`, `public/icons`) for better organization.
2.  **Usage**: Use the Next.js `<Image />` component (imported from `next/image`) instead of the standard `<img>` tag whenever possible.
    -   **Automatic Optimization**: Next.js automatically optimizes images for size and quality.
    -   **Lazy Loading**: Images are lazy-loaded by default, improving page load speed.
    -   **Responsive Sizing**: It helps serve correctly sized images for different devices.

**Example Usage:**
```jsx
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/logo.png" // Path relative to the public folder
      alt="Hoydoon Logo"
      width={100}
      height={50}
    />
  );
}
```

## Environment Variables

Environment variables are used to store sensitive information or configuration that varies between environments (development, staging, production).

-   **`.env`**: This file contains the environment variables. **It should not be committed to version control** (it should be in `.gitignore`).
-   **Accessing Variables**: In Next.js, environment variables can be accessed via `process.env.VARIABLE_NAME`.
    -   Server-side variables are only available on the server.
    -   Variables prefixed with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_API_URL`) are exposed to the browser.

**Example `.env` file:**
```env
DATABASE_URL=postgres://user:password@localhost:5432/mydb
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=my-super-secret-key
```

## Architecture & Optimization Flow

The following diagram illustrates how the different folders interact and the optimization strategies employed by Next.js.

```mermaid
graph TD
    User[User Request] --> App[App Router (app/)]
    
    subgraph "Core Structure"
        App --> Pages[Pages & Layouts]
        Pages --> Components[Components (components/)]
        Pages --> Hooks[Hooks (hooks/)]
        Components --> Utils[Utils (utils/)]
        Components --> Store[Redux Store (store/)]
        Components --> Assets[Static Assets (public/)]
    end

    subgraph "Optimization Layer"
        Assets -.-> ImageOpt[Next.js Image Optimization]
        Pages -.-> SSG[Server-Side Rendering / Static Generation]
        Components -.-> CodeSplit[Automatic Code Splitting]
        Utils -.-> TreeShake[Tree Shaking]
    end

    ImageOpt --> Browser[Optimized Delivery]
    SSG --> Browser
    CodeSplit --> Browser
```

### Optimization Strategy

The folder structure supports several built-in optimizations:

1.  **Component Reusability (`components/`)**: Breaking the UI into small, reusable components allows Next.js to efficiently code-split the application. Only the JavaScript needed for the current page is loaded.
2.  **Static Asset Handling (`public/`)**: Images stored here and used with the `<Image />` component are automatically resized, compressed, and served in modern formats (like WebP) to reduce load times.
3.  **Global State Management (`store/`)**: Centralizing state prevents unnecessary prop drilling and re-renders, ensuring the app remains responsive as it scales.
4.  **Server-Side Rendering (`app/`)**: By default, components in the `app` directory are React Server Components. This reduces the amount of JavaScript sent to the client, improving the First Contentful Paint (FCP).

