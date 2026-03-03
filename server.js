const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const levels = [
  { id: 1, name: "Lionel Messi", path: "Barcelona -> PSG -> Inter Miami" },
  { id: 2, name: "Cristiano Ronaldo", path: "Sporting -> Man Utd -> Real Madrid -> Juventus -> Man Utd -> Al Nassr" },
  { id: 3, name: "Kylian Mbappé", path: "Monaco -> PSG -> Real Madrid" },
  { id: 4, name: "Erling Haaland", path: "Bryne -> Molde -> RB Salzburg -> Dortmund -> Man City" }
];

app.get('/api/level/:number', (req, res) => {
    const levelData = levels.find(l => l.id === parseInt(req.params.number));
    if (levelData) {
        const others = levels.filter(p => p.id !== levelData.id).map(p => p.name);
        const choices = [levelData.name, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random());
        res.json({ path: levelData.path, choices });
    } else {
        res.status(404).json({ message: "End" });
    }
});

app.post('/api/guess', (req, res) => {
    const { guess, id } = req.body;
    const player = levels.find(p => p.id === id);
    res.json({ correct: player && guess === player.name });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
