const { Pool } = require("pg");

// Conexión
const config = {
	user: "postgres",
	host: "localhost",
	password: "123",
	database: "postgres",
	port: 5432,
};

const pool = new Pool(config);

const tiendas = async (res) => {
	try {
		const client = await pool.connect();
		let consulta = {
			text: "SELECT * FROM stores ORDER BY store_name DESC;",
		};
		const result = await client.query(consulta);
		return result.rows;
	} catch (e) {
		return false;
	}
};

const categorias = async (res) => {
	try {
		const client = await pool.connect();
		let consulta = {
			text: "SELECT * FROM categories ORDER BY category_name DESC;",
		};
		const result = await client.query(consulta);
		return result.rows;
	} catch (e) {
		return false;
	}
};

const marcas = async (res) => {
	try {
		const client = await pool.connect();
		let consulta = {
			text: "SELECT * FROM brands ORDER BY brand_name DESC;",
		};
		const result = await client.query(consulta);
		return result.rows;
	} catch (e) {
		return false;
	}
};

const todos = async (res) => {
	try {
		const client = await pool.connect();
		let consulta = {
			text: "SELECT stores.store_id, stores.store_name, products.product_name, products.product_id, stocks.quantity, brands.brand_id, categories.category_id FROM stores INNER JOIN stocks ON stores.store_id = stocks.store_id INNER JOIN products ON stocks.product_id = products.product_id INNER JOIN brands ON products.brand_id = brands.brand_id INNER JOIN categories ON products.category_id = categories.category_id;",
		};
		const result = await client.query(consulta);
		return result.rows;
	} catch (e) {
		return false;
	}
};

module.exports = {
	tiendas,
	categorias,
	marcas,
	todos,
};
