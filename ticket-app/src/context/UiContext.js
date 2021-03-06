import { createContext, useState } from 'react';

export const UiContext = createContext();

export const UiProvider = ({ children }) => {
	const [hideMenu, setHideMenu] = useState(false);

	const onHideMenu = () => {
		setHideMenu(true);
	};
	const onShowMenu = () => {
		setHideMenu(false);
	};

	return <UiContext.Provider value={{ hideMenu, onHideMenu, onShowMenu }}>{children}</UiContext.Provider>;
};
