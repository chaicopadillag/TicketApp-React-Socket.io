const TicketList = require('./ticket-list');

class Sockets {
	constructor(io) {
		this.io = io;

		this.ticketList = new TicketList();

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', (socket) => {
			console.log('Cliente Conectado');

			socket.on('solicitar-ticket', (data, callback) => {
				const nuevoTicket = this.ticketList.crearTicket();
				callback(nuevoTicket);
			});

			socket.on('siguiente-ticket', ({ agente, escritorio }, callback) => {
				const suTicket = this.ticketList.asignarTicket(agente, escritorio);
				callback(suTicket);
				this.io.emit('historial-tickets', this.ticketList.ultimosTreceTickets);
			});
		});
	}
}

module.exports = Sockets;
