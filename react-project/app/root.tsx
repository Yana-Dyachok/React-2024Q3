import React, { Suspense } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeProvider } from '../src/theme-context/theme-provider';
import StoreProvider from '../src/lib/StoreProvider';
import Loading from '../src/components/ui/loading/loading';
import './index.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon-doc.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider>
          <StoreProvider>
            {children}
            <ScrollRestoration />
            <Scripts />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}
