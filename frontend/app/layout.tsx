import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Bryntum Gantt - Professional Demo',
  description: 'Bryntum Gantt chart with NextJS and ExpressJS backend'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins"
        />
      </head>
      <body>
        <div id="container">
          {children}
        </div>
      </body>
    </html>
  );
}

