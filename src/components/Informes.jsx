import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import championsCSV from '../data/champions.csv';
import '../styles/informes.css'; // Importa el archivo CSS

// Registra las escalas necesarias
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Informes = () => {
  const [difficulty, setDifficulty] = useState('');
  const [heroType, setHeroType] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [chartFilter, setChartFilter] = useState('role'); // Nuevo estado para el filtro de la gráfica
  const [championsData, setChampionsData] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);

  useEffect(() => {
    Papa.parse(championsCSV, {
      download: true,
      header: true,
      complete: (result) => {
        setChampionsData(result.data);
      },
    });
  }, []);

  const handlePrint = () => {
    const filtered = championsData.filter(champion => 
      (difficulty ? champion.difficulty === difficulty : true) &&
      (heroType ? champion.herotype === heroType : true)
    );
    setFilteredChampions(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Informe de Campeones', 10, 10);
    doc.setFontSize(12);
    let y = 20;

    const tableColumn = ["Nombre", "Dificultad", "Rol"];
    const tableRows = [];

    filteredChampions.forEach((champion, index) => {
      const championData = [
        champion.apiname,
        champion.difficulty,
        champion.role.replace(/[{}'"]/g, '') // Elimina llaves y comillas
      ];
      tableRows.push(championData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: y });

    // Añadir resumen al final del PDF
    y = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.text('Resumen de Datos', 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Total de campeones: ${filteredChampions.length}`, 10, y);
    y += 10;
    doc.text(`Roles: ${Object.keys(roleData).join(', ').replace(/[{}'"]/g, '')}`, 10, y);
    y += 10;
    doc.text(`Dificultades: ${Object.keys(difficultyData).join(', ').replace(/[{}'"]/g, '')}`, 10, y);

    // Añadir pie de página con borde azul
    doc.setDrawColor(0, 0, 255);
    doc.setLineWidth(0.5);
    doc.line(10, doc.internal.pageSize.height - 30, 200, doc.internal.pageSize.height - 30);
    doc.setFontSize(10);
    doc.text('Este informe muestra los campeones filtrados por dificultad y tipo de campeón.', 10, doc.internal.pageSize.height - 20);
    doc.text('Empresa XYZ - Todos los derechos reservados', 10, doc.internal.pageSize.height - 10);

    doc.save('informe_campeones.pdf');
  };

  const roleData = {};
  const positionData = {};

  filteredChampions.forEach(champion => {
    if (champion.role) {
      roleData[champion.role] = (roleData[champion.role] || 0) + 1;
    }
    if (champion.position) {
      positionData[champion.position] = (positionData[champion.position] || 0) + 1;
    }
  });

  const filteredRoleData = {};
  const filteredPositionData = {};

  filteredChampions
    .filter(champion => (roleFilter ? champion.role === roleFilter : true))
    .forEach(champion => {
      if (champion.role) {
        filteredRoleData[champion.role] = (filteredRoleData[champion.role] || 0) + 1;
      }
    });

  filteredChampions
    .filter(champion => (positionFilter ? champion.position === positionFilter : true))
    .forEach(champion => {
      if (champion.position) {
        filteredPositionData[champion.position] = (filteredPositionData[champion.position] || 0) + 1;
      }
    });

  const barData = {
    labels: chartFilter === 'role' ? Object.keys(filteredRoleData).map(role => role.replace(/[{}'"]/g, '')) : Object.keys(filteredPositionData).map(position => position.replace(/[{}'"]/g, '')),
    datasets: [
      {
        label: chartFilter === 'role' ? 'Cantidad de personajes por rol' : 'Cantidad de personajes por posición',
        data: chartFilter === 'role' ? Object.values(filteredRoleData) : Object.values(filteredPositionData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: chartFilter === 'role' ? Object.keys(filteredRoleData).map(role => role.replace(/[{}'"]/g, '')) : Object.keys(filteredPositionData).map(position => position.replace(/[{}'"]/g, '')),
    datasets: [
      {
        label: chartFilter === 'role' ? 'Cantidad de personajes por rol' : 'Cantidad de personajes por posición',
        data: chartFilter === 'role' ? Object.values(filteredRoleData) : Object.values(filteredPositionData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="informes-container">
      <h1>Informes</h1>
      <form>
        <label>
          Dificultad:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Seleccionar dificultad</option>
            <option value="1">Facil</option>
            <option value="2">Medio</option>
            <option value="3">Difícil</option>
          </select>
        </label>
        <label>
          Tipo de campeón:
          <select value={heroType} onChange={(e) => setHeroType(e.target.value)}>
            <option value="">Selecciona el rol del campeón</option>
            <option value="Tank">Tanque</option>
            <option value="Mage">Mago</option>
            <option value="Assassin">Asesino</option>
            <option value="Support">Support</option>
            <option value="Marksman">Tirador</option>
            <option value="Fighter">Luchador</option>
          </select>
        </label>
        <button type="button" onClick={handlePrint}>Imprimir</button>
        <button type="button" onClick={generatePDF}>Generar PDF</button>
      </form>
      <div className="resultados">
        <h2>Resultados</h2>
        {filteredChampions.length === 0 ? (
          <p>No hay resultados disponibles.</p>
        ) : (
          <ul>
            {filteredChampions.map((champion, index) => (
              <li key={index}>{champion.apiname} - {champion.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="graficos">
        <div>
          <label>
            Filtrar Gráfica:
            <select value={chartFilter} onChange={(e) => setChartFilter(e.target.value)}>
              <option value="role">Por Rol</option>
              <option value="position">Por Posición</option>
            </select>
          </label>
          <h2>Gráfico de Barras</h2>
          <Bar data={barData} />
        </div>
        <div>
          <h2>Gráfico Circular</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Informes;