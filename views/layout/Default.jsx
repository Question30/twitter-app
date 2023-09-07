const React = require('react');

function DefaultLayout({ title, children }) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        {/* <link rel="stylesheet" href="/css/app.css" />   */}
      </head>
      <body className='flex flex-col items-center bg-blue-950 text-slate-200'>
        <h1 className='text-4xl'>{title}</h1>
        {children}
      </body>
    </html>
  );
}

module.exports = DefaultLayout;
