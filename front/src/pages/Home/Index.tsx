import React from 'react';
import './styles.css';

function Home() {
  return (
    <div>
      <div className="Home">
        <header className="Home-header">
          <text id="pomod">POMOD</text>
          <text id="orc">ORC</text>
        </header>
        <div className="buttons">
          <a href="/todo" id="init">Iniciar</a>
          <div className="vl"></div>
          <a href="/about" id="about-page">Sobre</a>
        </div>
      </div>

      <footer className="footer">
        ©CyberOrc
      </footer>

    </div>
  );
}

export default Home;