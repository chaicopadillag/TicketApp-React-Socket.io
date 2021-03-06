import { useContext, useEffect } from 'react';
import { UiContext } from '../context/UiContext';

const useUiMenu = (isHideShow) => {
	const { onHideMenu, onShowMenu } = useContext(UiContext);

	useEffect(() => {
		if (isHideShow) {
			onHideMenu(isHideShow);
		} else {
			onShowMenu(isHideShow);
		}
	}, [isHideShow, onHideMenu, onShowMenu]);
};

export default useUiMenu;
