// Example Level Data Structure
const levels = [
  { id: 1, name: "Lionel Messi", path: "Barcelona -> PSG -> Inter Miami", difficulty: "Easy" },
  { id: 2, name: "Cristiano Ronaldo", path: "Sporting -> Man Utd -> Real Madrid -> Juventus -> Man Utd -> Al Nassr", difficulty: "Easy" },
  { id: 3, name: "Zlatan Ibrahimovic", path: "Malmo -> Ajax -> Juve -> Inter -> Barca -> Milan -> PSG -> Utd -> Galaxy -> Milan", difficulty: "Medium" }
];

app.get('/api/level/:number', (req, res) => {
    const levelNum = parseInt(req.params.number);
    const levelData = levels.find(l => l.id === levelNum);
    
    if (levelData) {
        // Send only the path, not the name
        res.json({ id: levelData.id, path: levelData.path });
    } else {
        res.status(404).json({ message: "You beat the game!" });
    }
});
