const http = require('http');
const fs = require('fs');
const url = require('url');
const testFolder = './data';
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const app = http.createServer((request, response) => {
	let _url = request.url;
	let queryData = url.parse(_url, true).query;
	let pathname = url.parse(_url, true).pathname;
	if (pathname === '/') {
		if (queryData.id === undefined) {
			fs.readdir(testFolder, (error, filelist) => {
				const title = 'Welcome';
				let list = template.list(filelist);
				const description = 'Hello, Node.js';
				let html = template.html(
					title,
					list,
					`<h2>${title}</h2>${description}`,
					`<a href="/create">create</a>`
				);
				response.writeHead(200);
				response.end(html);
			});
		} else {
			fs.readdir(testFolder, (error, filelist) => {
				let filteredId = path.parse(queryData.id).base;
				fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
					let title = queryData.id;
					let sanitizedTitle = sanitizeHtml(title);
					let sanitizedDescription = sanitizeHtml(description, {
						allowedTags:['h1']
					});
					let list = template.list(filelist);
					let html = template.html(
						sanitizedTitle,
						list,
						`<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
						`<a href="/create">create</a>
						 <a href="/update?id=${sanitizedTitle}">update</a>
						 <form action="delete_process" method="post">
						 	<input type="hidden" name="id" value="${sanitizedTitle}">
							<input type="submit" value="delete">
						 </form>
						 `
					);
					response.writeHead(200);
					response.end(html);
				});
			});
		}
	} else if (pathname === '/create') {
		fs.readdir(testFolder, (error, filelist) => {
			const title = 'WEB - create';
			let list = template.list(filelist);
			let html = template.html(
				title,
				list,
				//form은 구름 ide일때만 적용되니 다른 환경이면 바꿀것
				`
				<form action="/create_process" method="post" text-decoration: none;>
					<p><input type="text" name="title" placeholder="title"></p>
					<p>
						<textarea name="description" placeholder="description"></textarea>
					</p>
					<p>
						<input type="submit">
					</p>
				</form>`,
				''
			);
			response.writeHead(200);
			response.end(html);
		});
	} else if (pathname === '/create_process') {
		let body = '';
		request.on('data', (data) => {
			body += data;
		});
		request.on('end', () => {
			let post = qs.parse(body);
			let title = post.title;
			let description = post.description;
			fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
				if (err) {
					throw err;
				}
				response.writeHead(302, {
					Location: `/?id=${title}`,
				});
				response.end();
			});
		});
	} else if (pathname === '/update') {
		fs.readdir(testFolder, (error, filelist) => {
			let filteredId = path.parse(queryData.id).base;
			fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
				let title = queryData.id;
				let list = template.list(filelist);
				let html = template.html(
					title,
					list,
					`
					<form action="/update_process" method="post">
					<input type="hidden" name="id" value="${title}">
						<p><input type="text" name="title" placeholder="title" value="${title}"></p>
						<p>
							<textarea name="description" placeholder="description">${description}</textarea>
						</p>
						<p>
							<input type="submit">
						</p>
					</form>
						`,
					`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
				);
				response.writeHead(200);
				response.end(html);
			});
		});
	} else if (pathname === '/update_process') {
		let body = '';
		request.on('data', (data) => {
			body = body + data;
		});
		request.on('end', () => {
			let post = qs.parse(body);
			let id = post.id;
			let title = post.title;
			let description = post.description;
			fs.rename(`data/${id}`, `data/${title}`, (error) => {
				if (error) {
					throw error;
				}
				fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
					response.writeHead(302, { Location: `/?id=${title}` });
					response.end();
				});
			});
		});
	} else if (pathname === '/delete_process') {
		let body = '';
		request.on('data', (data) => {
			body = body + data;
		});
		request.on('end', () => {
			let post = qs.parse(body);
			let id = post.id;
			let filteredId = path.parse(id).base;
			fs.unlink(`data/${filteredId}`, (error) => {
				response.writeHead(302, { Location: `/` });
				response.end();
			});
		});
	} else {
		response.writeHead(404);
		response.end('Not found');
	}
});

app.listen(3000);