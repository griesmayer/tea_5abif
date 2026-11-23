// server.js
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const teas = [
  { id: 1, name: "Earl Grey", category: "Schwarztee" },
  { id: 2, name: "Assam", category: "Schwarztee" },
  { id: 3, name: "Sencha", category: "Grüntee" },
  { id: 4, name: "Matcha", category: "Grüntee" },
  { id: 5, name: "Pai Mu Tan", category: "Weißtee" },
  { id: 6, name: "Tie Guan Yin", category: "Oolong" },
  { id: 7, name: "Pfefferminztee", category: "Kräutertee" },
  { id: 8, name: "Kamillentee", category: "Kräutertee" },
  { id: 9, name: "Hagebuttentee", category: "Früchtetee" },
  { id: 10, name: "Rooibos Vanille", category: "Rooibostee" }
];

app.get("/", (req, res) => {
    res.send("Hello Thomas Griesmayer!");
});

app.get("/teas", (req, res) => {
    res.json(teas);
});

app.get("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teas.find(t => t.id === id)

    if (!tea) {
        return res.status(404).json({error : "Tea not found!"});
    }
    res.json(tea);
});

app.post("/teas", (req, res) => {
    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).json({error : "Name and category required!"});
    }
    const newId = teas.length ? teas[teas.length - 1].id + 1 : 1;
    const newTea = {id : newId, name, category};
    teas.push(newTea);
    res.status(201).json(newTea);
});

app.put("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).json({error : "Name and category required!"});
    }
    const pos = teas.findIndex(t => t.id === id);
    if (pos === -1) {
        return res.status(404).json({error : "Tea not found!"});
    }
    teas[pos] = {id, name, category};
    res.json(teas[pos]);
});

app.patch("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, category } = req.body;

    const tea = teas.find(t => t.id === id);
    if (!tea) {
        return res.status(404).json({error : "Tea not found!"});
    }
    if (name != undefined) tea.name = name;
    if (category != undefined) tea.category = category;
    res.json(tea);   
});

app.delete("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pos = teas.findIndex(t => t.id === id);
    
    if (pos === -1) {
        return res.status(404).json({error : "Tea not found!"});
    }
    
    teas.splice(pos, 1);
    return res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});