const { v4: uuidv4 } = require('uuid');

class Ticket {
	constructor(ultimoNumero) {
		this.id = uuidv4();
		this.numero = ultimoNumero;
		this.escritorio = null;
		this.agnte = null;
	}
}

module.exports = Ticket;
