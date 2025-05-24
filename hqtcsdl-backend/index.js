const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: 'sa',
    password: 'h123',
    server: 'HYN',
    database: 'MealPlanner',
    options: { encrypt: false, trustServerCertificate: true },
};

// === GET Recipes (from Recipes table) ===
app.get('/api/recipes', async (req, res) => {
    try {
        await sql.connect(config);

        const result = await sql.query(`
            SELECT 
                RecipeID as id,
                Name as name,
                Ingredients as ingredients,
                Instructions as instructions,
                Calories as kcal,
                PrepTime as time,
                Difficulty as difficulty,
                ImageURL as img
            FROM Recipes
        `);

        const data = result.recordset.map(r => ({
            ...r,
            ingredients: r.ingredients ? r.ingredients.split(',').map(i => i.trim()) : [],
            instructions: r.instructions
                ? r.instructions.split(/\d+\.\s/).map(i => i.trim()).filter(Boolean)
                : [],
        }));

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(data);
    } catch (err) {
        console.error('API /api/recipes error:', err);
        res.status(500).send('Server error: ' + err.message);
    }
});

// === GET MyRecipes ===
app.get('/api/my-recipes', async (req, res) => {
    try {
        await sql.connect(config);

        const result = await sql.query(`
            SELECT 
                RecipeID as id,
                Name as name,
                Ingredients as ingredients,
                Instructions as instructions,
                Calories as kcal,
                PrepTime as time,
                Difficulty as difficulty
            FROM MyRecipes
        `);

        const data = result.recordset.map(r => ({
            ...r,
            ingredients: typeof r.ingredients === "string"
                ? r.ingredients.split(',').map(i => i.trim())
                : r.ingredients,
            instructions: typeof r.instructions === "string"
                ? r.instructions.split(/\d+\.\s/).map(i => i.trim()).filter(Boolean)
                : r.instructions,
        }));

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(data);
    } catch (err) {
        console.error('API /api/my-recipes error:', err);
        res.status(500).send('Server error: ' + err.message);
    }
});

// === POST MyRecipes ===
app.post('/api/my-recipes', async (req, res) => {
    const { name, ingredients, instructions, kcal, time, difficulty } = req.body;

    // Kiểm tra dữ liệu kỹ hơn
    if (
        typeof name !== "string" || name.trim() === "" ||
        !Array.isArray(ingredients) || ingredients.length === 0 ||
        !Array.isArray(instructions) || instructions.length === 0 ||
        isNaN(parseInt(kcal)) ||
        isNaN(parseInt(time)) ||
        typeof difficulty !== "string" || difficulty.trim() === ""
    ) {
        return res.status(400).send("❌ Missing or invalid fields.");
    }

    try {
        await sql.connect(config);

        const safeName = name.replace(/'/g, "''");
        const safeIngredients = ingredients.join(', ').replace(/'/g, "''");
        const safeInstructions = instructions.map((step, i) => `${i + 1}. ${step}`).join(' ').replace(/'/g, "''");
        const safeDifficulty = difficulty.replace(/'/g, "''");

        await sql.query(`
            INSERT INTO MyRecipes (Name, Ingredients, Instructions, Calories, PrepTime, Difficulty)
            VALUES (
                N'${safeName}',
                N'${safeIngredients}',
                N'${safeInstructions}',
                ${parseInt(kcal)},
                ${parseInt(time)},
                N'${safeDifficulty}'
            )
        `);

        res.status(201).json({ message: "Recipe added successfully." });
    } catch (err) {
        console.error("POST /api/my-recipes error:", err);
        res.status(500).send("Server error: " + err.message);
    }
});

// === PUT MyRecipes ===
app.put('/api/my-recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, instructions, kcal, time, difficulty } = req.body;

    if (
        typeof name !== 'string' ||
        !Array.isArray(ingredients) ||
        !Array.isArray(instructions) ||
        isNaN(kcal) ||
        isNaN(time) ||
        typeof difficulty !== 'string'
    ) {
        return res.status(400).send("❌ Missing or invalid fields.");
    }

    try {
        await sql.connect(config);

        const safeName = name.replace(/'/g, "''");
        const safeIngredients = ingredients.join(', ').replace(/'/g, "''");
        const safeInstructions = instructions.map((step, i) => `${i + 1}. ${step}`).join(' ').replace(/'/g, "''");
        const safeDifficulty = difficulty.replace(/'/g, "''");

        await sql.query(`
            UPDATE MyRecipes
            SET
                Name = N'${safeName}',
                Ingredients = N'${safeIngredients}',
                Instructions = N'${safeInstructions}',
                Calories = ${parseInt(kcal)},
                PrepTime = ${parseInt(time)},
                Difficulty = N'${safeDifficulty}'
            WHERE RecipeID = ${parseInt(id)}
        `);

        res.status(200).send("Recipe updated successfully.");
    } catch (err) {
        console.error("PUT /api/my-recipes/:id error:", err);
        res.status(500).send("Server error: " + err.message);
    }
});

// === DELETE MyRecipes ===
app.delete('/api/my-recipes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await sql.connect(config);
        await sql.query(`DELETE FROM MyRecipes WHERE RecipeID = ${parseInt(id)}`);
        res.status(200).send("🗑️ Deleted successfully.");
    } catch (err) {
        console.error("DELETE error:", err);
        res.status(500).send("Server error: " + err.message);
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
