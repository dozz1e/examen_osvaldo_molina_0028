const { Client } = require("pg");
var fs = require("fs");

// Conexión
const config = {
	user: "postgres",
	host: "localhost",
	password: "123",
	database: "postgres",
	port: 5432,
};

const client = new Client(config);

// Pedido de datos de los cientes a BBDD
client.connect();
client.query("SELECT * FROM customers;", (err, res) => {
	const json = JSON.stringify(res.rows, null, 2);
	fs.writeFileSync("clientes.json", json, "utf8"); // Creación archivo JSON clientes.json
	client.end();
});

// Toma de datos por consola
const nombre = process.argv[2];
const monto = process.argv[3];
const descuento = process.argv[4];
const total_desc = Number(monto) - (Number(monto) * Number(descuento)) / 100;

// Función validadora de cliente
const validar = (cliente) => {
	const data = fs.readFileSync("clientes.json");
	const clientes = JSON.parse(data);
	let client = clientes.filter((cl) => {
		const nombre_completo = cl.first_name + " " + cl.last_name;
		if (nombre_completo == cliente) return cl;
		else return false;
	});
	return client[0];
};

const cliente = validar(nombre);

// Creaciíon de archivo final
let texto = "";
if (cliente) {
	texto = ` Cliente: ${cliente.first_name} ${cliente.last_name}
                  Su compra es de ${monto} pesos.
                  porcentaje de descuento es ${descuento}% da un total de: $${total_desc}`;
} else {
	texto = `Don(a): ${nombre}
      Actualmente usted no es un cliente en la tienda, favor de registrarse para poder realizar compras.`;
}

// Mostrar resultado final por pantalla
fs.writeFile("mensaje.txt", texto, (err) => {
	if (err) console.log(err);
	else console.log(fs.readFileSync("mensaje.txt", "utf8"));
});
