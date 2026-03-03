const express = require('express');
const path = require('path');
const app = express();

// Important for Hostinger to assign the correct port
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// --- YOUR LEVEL DATA ---
const levels = [
  { id: 1, name: "Lionel Messi", path: "Barcelona -> PSG -> Inter Miami", difficulty: "Easy" },
  { id: 2, name: "Cristiano Ronaldo", path: "Sporting -> Man Utd -> Real Madrid -> Juventus -> Man Utd -> Al Nassr", difficulty: "Easy" },
  { id: 3, name: "Zlatan Ibrahimovic", path: "Malmo -> Ajax -> Juve -> Inter -> Barca -> Milan -> PSG -> Utd -> Galaxy -> Milan", difficulty: "Medium" }
];

// --- API ROUTES ---

// Get a specific level
app.get('/api/level/:number', (req, res) => {
    const levelNum = parseInt(req.params.number);
    const levelData = levels.find(l => l.id === levelNum);
    
    if (levelData) {
        res.json({ id: levelData.id, path: levelData.path });
    } else {
        res.status(404).json({ message: "You beat the game!" });
    }
});

// Check if a guess is correct
app.post('/api/guess', (req, res) => {
    const { guess, id } = req.body;
    const player = levels.find(p => p.id === id);
    
    if (player && guess.toLowerCase().trim() === player.name.toLowerCase()) {
        res.json({ correct: true, message: "GOAL! Correct!" });
    } else {
        res.json({ correct: false, message: "Offside! Try again." });
    }
});

// Serve the main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Kickguessr is running on port ${PORT}`);
});
