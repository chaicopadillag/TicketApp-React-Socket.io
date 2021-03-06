// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Http server
		this.server = http.createServer(this.app);

		// Configuraciones de sockets
		this.io = socketio(this.server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
				credentials: true,
			},
		});

		this.sockets = new Sockets(this.io);
	}

	middlewares() {
		// Desplegar el directorio público
		this.app.use(express.static(path.resolve(__dirname, '../public')));

		// CORS
		this.app.use(cors());

		// api ultimos rutas

		this.app.get('/ultimos', (req, res) => {
			res.status(200).json({
				status: 200,
				statusText: 'Ok',
				tickets: this.sockets.ticketList.ultimosTreceTickets,
			});
		});

		this.app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname + '/../public/index.html'));
		});
	}

	// Esta configuración se puede tener aquí o como propieda de clase
	// depende mucho de lo que necesites

	execute() {
		// Inicializar Middlewares
		this.middlewares();

		// Inicializar Server
		this.server.listen(this.port, () => {
			console.log('Server corriendo en puerto:', this.port);
		});
	}
}

module.exports = Server;
