import React from 'react';
import './styles.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <text id="pomod">POMOD</text>
        <text id="orc">ORC</text>
      </header>
      <div className="buttons">
        <a href="#" id="init">Iniciar</a>
        <div className="vl"></div>
        <a href="#" id="about">Sobre</a>
      </div>
    </div>
  );
}

export default Home;
