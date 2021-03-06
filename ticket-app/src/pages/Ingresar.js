import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import useUiMenu from '../hooks/useUiMenu';
import { getUsuario } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;
const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 8,
	},
};

const tailLayout = {
	wrapperCol: {
		offset: 4,
		span: 16,
	},
};

const Ingresar = () => {
	useUiMenu(false);
	const history = useHistory();

	const [sesion] = useState(getUsuario());

	if (sesion.agente && sesion.escritorio) {
		return <Redirect to="/escritorio" />;
	}

	const onFinish = ({ agente, escritorio }) => {
		localStorage.setItem('agente', agente);
		localStorage.setItem('escritorio', escritorio);
		history.push('/escritorio');
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Title level={2}>Ingresar</Title>
			<Text>Ingresar tu Nombre y número de Escritorio</Text>
			<Divider />
			<Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Form.Item
					label="Nombre del Agente"
					name="agente"
					rules={[
						{
							required: true,
							message: 'Por favor ingrese su Nombre!',
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Escritorio"
					name="escritorio"
					rules={[
						{
							required: true,
							message: 'Por favor ingrese el número de escritorio!',
						},
					]}>
					<InputNumber min={1} max={100} />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit" shape="round">
						<SaveOutlined />
						Ingresar
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Ingresar;
