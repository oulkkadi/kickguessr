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
  { id: 4, name: "Erling Haaland", path: "Bryne -> Molde -> RB Salzburg -> Dortmund -> Man City" },
  { id: 5, name: "Robert Lewandowski", path: "Lech Poznan -> Dortmund -> Bayern Munich -> Barcelona" },
  { id: 6, name: "Neymar Jr", path: "Santos -> Barcelona -> PSG -> Al Hilal" },
  { id: 7, name: "Jude Bellingham", path: "Birmingham City -> Dortmund -> Real Madrid" },
  { id: 8, name: "Kevin De Bruyne", path: "Genk -> Chelsea -> Bremen -> Wolfsburg -> Man City" },
  { id: 9, name: "Harry Kane", path: "Tottenham -> Leyton Orient -> Millwall -> Norwich -> Leicester -> Tottenham -> Bayern Munich" },
  { id: 10, name: "Zlatan Ibrahimovic", path: "Malmo -> Ajax -> Juve -> Inter -> Barca -> Milan -> PSG -> Utd -> Galaxy -> Milan" }
];

app.get('/api/level/:number', (req, res) => {
    const levelNum = parseInt(req.params.number);
    const levelData = levels.find(l => l.id === levelNum);
    
    if (levelData) {
        // Get 3 random WRONG names for buttons
        const others = levels.filter(p => p.id !== levelNum).map(p => p.name);
        const distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3);
        const choices = [levelData.name, ...distractors].sort(() => 0.5 - Math.random());

        res.json({ id: levelData.id, path: levelData.path, choices });
    } else {
        res.status(404).json({ message: "Winner!" });
    }
});

app.post('/api/guess', (req, res) => {
    const { guess, id } = req.body;
    const player = levels.find(p => p.id === id);
    if (player && guess === player.name) {
        res.json({ correct: true });
    } else {
        res.json({ correct: false });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
