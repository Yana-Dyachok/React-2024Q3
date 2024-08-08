'use client';
import React from 'react';
import { ThemeProvider } from '../theme-context/theme-provider';
import '../index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="react project with next.js" />
        <link
          rel="icon"
          href="/favicon-doc.ico"
          type="image/ico"
          sizes="32x32"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
