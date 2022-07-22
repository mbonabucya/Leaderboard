import './index.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameId = 'IMedGj11pIQ2hWnoIzv';

const addScore = async (newScore) => {
  const response = await fetch(`${url}/games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  return data;
};

const getScores = async () => {
  const response = await fetch(`${url}/games/${gameId}/scores/`);
  const data = await response.json();
  return data;
};

const displayScores = async () => {
  const scores = await getScores();
  const table = document.getElementById('table');
  table.innerHTML = '';
  scores.result.forEach(({ score, user }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user} : ${score}</td>
    `;
    table.appendChild(tr);
  });
};

window.addEventListener('load', displayScores);

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('user').value;
  const score = document.getElementById('score').value;
  if (!user || !score) return;
  const newScore = {
    user,
    score,
  };
  addScore(newScore);
  document.getElementById('user').value = '';
  document.getElementById('score').value = '';
});

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', displayScores);