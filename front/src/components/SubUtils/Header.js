import * as React from "react";

const Header = ({ handleToggleDarkMode }) => {

	return (
		<div className='header-subtask'>
			<h1>Subtarefas</h1>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			>
				Mudar Fundo
			</button>
		</div>
	);
};

export default Header;