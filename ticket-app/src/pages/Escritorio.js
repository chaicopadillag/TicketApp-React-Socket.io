import React, { useContext, useState } from 'react';
import { Col, Row, Button, Divider, Typography } from 'antd';
import { LogoutOutlined, RightOutlined } from '@ant-design/icons';
import useUiMenu from '../hooks/useUiMenu';
import { Redirect } from 'react-router-dom';
import { getUsuario } from '../helpers/getUsuarioStorage';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

const Escritorio = ({ history }) => {
	useUiMenu(false);
	const { socket } = useContext(SocketContext);
	const [sesion] = useState(getUsuario());
	const [ticket, setTicket] = useState(null);

	if (!sesion.agente || !sesion.escritorio) {
		return <Redirect to="/ingregar" />;
	}

	const onSalir = () => {
		localStorage.clear();
		history.replace('/ingresar');
	};

	const onSiguiente = () => {
		socket.emit('siguiente-ticket', sesion, (ticket) => {
			setTicket(ticket);
		});
	};
	return (
		<>
			<Row>
				<Col span={20}>
					<Title level={2}>{sesion.agente}</Title>
					<Text>Ud. está trabajando en el Escritorio: </Text>
					<Text type="success">{sesion.escritorio}</Text>
				</Col>
				<Col span={4} align="right">
					<Button shape="round" type="danger" onClick={onSalir}>
						Salir
						<LogoutOutlined />
					</Button>
				</Col>
			</Row>
			<Divider />
			<Row>
				{ticket && (
					<Col span={8}>
						<Text>Esta atendiendo el Ticket numero: </Text>
						<Text style={{ fontSize: 20 }} type="danger">
							{ticket.numero}
						</Text>
					</Col>
				)}
				<Col span={16} align="right">
					<Button onClick={onSiguiente} shape="round" type="primary">
						Siguiente
						<RightOutlined />
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default Escritorio;
