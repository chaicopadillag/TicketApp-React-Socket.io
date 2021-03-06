export const getUsuario = () => {
	return {
		agente: localStorage.getItem('agente'),
		escritorio: localStorage.getItem('escritorio'),
	};
};
