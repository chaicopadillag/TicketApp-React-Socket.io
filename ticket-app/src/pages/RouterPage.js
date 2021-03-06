import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Ingresar from './Ingresar';
import Cola from './Cola';
import CrearTicket from './CrearTicket';
import Escritorio from './Escritorio';
import { UiContext } from '../context/UiContext';

const { Header, Sider, Content } = Layout;
const RouterPage = () => {
	const { hideMenu } = useContext(UiContext);
	return (
		<BrowserRouter>
			<Layout style={{ height: '100vh' }}>
				<Sider collapsedWidth="0" breakpoint="md" hidden={hideMenu}>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						<Menu.Item key="1" icon={<UserOutlined />}>
							<Link to="/ingresar">Ingresar</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<VideoCameraOutlined />}>
							<Link to="/cola">Cola</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<UploadOutlined />}>
							<Link to="/crear-ticket">Crear Ticket</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }}></Header>
					<Content
						className="site-layout-background"
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}>
						<Switch>
							<Route path="/ingresar" component={Ingresar} />
							<Route path="/cola" component={Cola} />
							<Route path="/crear-ticket" component={CrearTicket} />
							<Route path="/escritorio" component={Escritorio} />
							<Redirect to="/ingresar" />
						</Switch>
					</Content>
				</Layout>
			</Layout>
		</BrowserRouter>
	);
};

export default RouterPage;
