const clockContainer = document.getElementById('react-clock-container');

if (clockContainer) {
  // Cria o elemento raiz do React
  const root = ReactDOM.createRoot(clockContainer);

  function renderClock() {
    const paragraph = <p>Current time: {dayjs().format('HH:mm:ss')}</p>;
    root.render(paragraph);
  }

  // Atualiza o relógio a cada segundo
  setInterval(renderClock, 1000);

  // Renderiza o relógio inicialmente
  renderClock();

} else {
  console.error('Contêiner para o relógio não foi encontrado.');
}
