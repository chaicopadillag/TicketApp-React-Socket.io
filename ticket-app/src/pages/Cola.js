import React, { useContext, useEffect, useState } from 'react';
import { Typography, Row, Col, List, Card, Tag, Divider } from 'antd';
import useUiMenu from '../hooks/useUiMenu';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { SocketContext } from '../context/SocketContext';
import { getTicketsApi } from '../helpers/getTicketsApi';

const { Title, Text } = Typography;

const Cola = () => {
	useUiMenu(true);
	const [tickets, setTickets] = useState([]);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on('historial-tickets', (tickets) => {
			setTickets(tickets);
		});
		return () => {
			socket.off('historial-tickets');
		};
	}, [socket]);

	useEffect(() => {
		getTicketsApi().then(setTickets);
	}, []);

	return (
		<>
			<Title level={1} align="center">
				Cola de Clientes
			</Title>
			<Row>
				<Col span={12}>
					<List
						dataSource={tickets.slice(0, 3)}
						renderItem={(item) => (
							<List.Item>
								<Card
									style={{ width: 300, marginTop: 16 }}
									actions={[
										<Tag color="blue" style={{ fontSize: 13 }}>
											<UserOutlined /> {item.agente}
										</Tag>,
										<Tag color="blue" style={{ fontSize: 18 }}>
											<DesktopOutlined /> {item.escritorio}
										</Tag>,
									]}>
									<Title level={2} type="secondary">
										Cliente N° {item.numero}
									</Title>
								</Card>
							</List.Item>
						)}
					/>
				</Col>
				<Col span={12}>
					<Divider>Hitorial</Divider>
					<List
						dataSource={tickets.slice(3)}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									title={`Ticket Nro: ${item.numero}`}
									description={
										<>
											<Text type="secondary">En el Escritorio: </Text>
											<Tag color="success">{item.escritorio}</Tag>
											<Text type="secondary">Agente: </Text>
											<Tag color="green">{item.agente}</Tag>
										</>
									}
								/>
							</List.Item>
						)}></List>
				</Col>
			</Row>
		</>
	);
};

export default Cola;
