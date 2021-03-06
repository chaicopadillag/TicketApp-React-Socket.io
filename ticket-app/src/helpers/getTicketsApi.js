export const getTicketsApi = async () => {
	try {
		const respuesta = await fetch('http://localhost:8080/ultimos');

		if (!respuesta.ok) {
			throw new {
				status: respuesta.status,
				statusText: respuesta.statusText,
			}();
		}
		const data = await respuesta.json();
		return data.tickets;
	} catch (error) {
		console.log('Error en: ' + error);
	}
};
