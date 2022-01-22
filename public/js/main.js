let sCats = $("#categoria");
let sMrcs = $("#marca");
let sTiendas = $("#tienda");
let sInfo = $("#informacion > tbody");

const getCategorias = async () => {
	try {
		const data = await axios.get("http://localhost:3000/categorias");
		sCats.prepend(`<option value="0">Seleccione...</option>`);
		data.data.forEach((datos) => {
			sCats.prepend(
				`<option value="${datos.category_id}">${datos.category_name}</option>`
			);
		});
	} catch (e) {
		alert("Algo salió mal..." + e);
	}
};
const getMarcas = async () => {
	try {
		const data = await axios.get("http://localhost:3000/marcas");
		sMrcs.prepend(`<option value="0">Seleccione...</option>`);
		data.data.forEach((datos) => {
			sMrcs.prepend(
				`<option value="${datos.brand_id}">${datos.brand_name}</option>`
			);
		});
	} catch (e) {
		alert("Algo salió mal..." + e);
	}
};
const getTiendas = async () => {
	try {
		const data = await axios.get("http://localhost:3000/tiendas");
		sTiendas.prepend(`<option value="0">Seleccione...</option>`);
		data.data.forEach((datos) => {
			sTiendas.prepend(
				`<option value="${datos.store_id}">${datos.store_name}</option>`
			);
		});
	} catch (e) {
		alert("Algo salió mal..." + e);
	}
};

const getTodos = async (tienda = "", categoria = "", marca = "") => {
	const filtro = {
		store_id: tienda,
		category_id: categoria,
		brand_id: marca,
	};
	try {
		const data = await axios.get("http://localhost:3000/todos");
		let listado = data.data.filter((item) => {
			for (let key in filtro) {
				if (item[key] != filtro[key] && filtro[key]) return false;
				else return true;
			}
		});
		listado.forEach((datos) => {
			sInfo.after(`<tr>
				<td>${datos.store_name}</td>
				<td>${datos.product_id}</td>
				<td>${datos.product_name}</td>
				<td>${datos.quantity}</td>
				<td><button class="btn btn-primary">VER</button></td>
			</tr>`);
		});
	} catch (e) {
		alert("Algo salió mal..." + e);
	}
};

getTiendas();
getCategorias();
getMarcas();
getTodos();

$(function () {
	$("#buscar").on("click", () => {
		let vCat = $("#categoria").val();
		let vMrc = $("#marca").val();
		let vTienda = $("#tienda").val();
		getTodos(vTienda, vCat, vMrc);
	});
});
