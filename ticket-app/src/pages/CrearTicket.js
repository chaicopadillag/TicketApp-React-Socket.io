import React, { useContext, useState } from 'react';
import { Typography, Row, Col, Button, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import useUiMenu from '../hooks/useUiMenu';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

const CrearTicket = () => {
	useUiMenu(true);
	const { socket } = useContext(SocketContext);
	const [ticket, setTicket] = useState(null);

	const onNewTicket = () => {
		socket.emit('solicitar-ticket', {}, (newTicket) => {
			setTicket(newTicket);
		});
	};

	return (
		<>
			<Row>
				<Col span={24} align="center">
					<Title style={{ marginBottom: '30px' }}>Presione el Botón para crear un nuevo Ticket</Title>
					<Button type="primary" shape="round" icon={<DownloadOutlined />} size="large" onClick={onNewTicket}>
						Nuevo Ticket
					</Button>
				</Col>
			</Row>
			<Divider />
			{ticket && (
				<Row>
					<Col span={14} offset={5} align="center">
						<Text level={2}>Su Numero: </Text>
						<br />
						<Text type="success" style={{ fontSize: 50 }}>
							{ticket.numero}
						</Text>
					</Col>
				</Row>
			)}
		</>
	);
};

export default CrearTicket;
