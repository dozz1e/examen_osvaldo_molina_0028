const express = require("express");
const fs = require("fs");

const { tiendas, marcas, categorias, todos } = require("./modulos/funciones");

const app = express();

//PUBLIC----------------------------------------------
app.use(
	"/bootstrap",
	express.static(__dirname + "/node_modules/bootstrap/dist/")
);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.use("/", express.static("public"));

//ROUTES----------------------------------------------

//route_home
app.get("/", async (req, res) => {
	res.setHeader("content-type", "text/html");
	res.end(fs.readFileSync("./public/index.html", "utf8"));
});

app.get("/tiendas", async (req, res) => {
	const tds = await tiendas(res);
	res.end(JSON.stringify(tds));
});

app.get("/categorias", async (req, res) => {
	const ctgs = await categorias(res);
	res.end(JSON.stringify(ctgs));
});

app.get("/marcas", async (req, res) => {
	const mrcs = await marcas(res);
	res.end(JSON.stringify(mrcs));
});

app.get("/todos", async (req, res) => {
	const tds = await todos(res);
	res.end(JSON.stringify(tds));
});

//404 page
app.get("*", (req, res) => {
	res.send("<h1>Esta página no existe.</h1>");
});

//SERVER----------------------------------------------
const port = 3000;

app.listen(port, () => {
	console.log(`Server on port: ${port} http://localhost:${port}`);
});
