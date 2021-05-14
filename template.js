export default function Template({ markup, helmet }) {
	return `
    <!DOCTYPE html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>
    <head>
        <meta charset="UTF-8">
        <link rel="icon" type="image/png" href="https://img.icons8.com/cute-clipart/50/000000/book.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        <script type="text/javascript" src="/dist/bundle.js"></script>
    </body>
    </html>
    `;
}
