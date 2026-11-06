const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'super_secret_key_for_university_project'; // В реальности хранится в .env

app.use(cors());
app.use(express.json());

// --- ИНИЦИАЛИЗАЦИЯ БАЗЫ ДАННЫХ ---
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Ошибка подключения к БД:', err.message);
    else console.log('Подключено к базе данных SQLite.');
});

// Создаем таблицы, если их нет
db.serialize(() => {
    // Таблица пользователей
    db.run(`CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        calc_type TEXT,
        result_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    // Безопасное добавление новых колонок (если их еще нет)
    db.all("PRAGMA table_info(history)", (err, columns) => {
        if (err) return console.error(err.message);
        const columnNames = columns.map(c => c.name);
        
        if (!columnNames.includes('custom_title')) {
            db.run(`ALTER TABLE history ADD COLUMN custom_title TEXT`);
        }
        if (!columnNames.includes('description')) {
            db.run(`ALTER TABLE history ADD COLUMN description TEXT`);
        }
    });
});

// --- MIDDLEWARE ДЛЯ ПРОВЕРКИ ТОКЕНА ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Требуется авторизация' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Неверный токен' });
        req.user = user;
        next();
    });
}

// --- МАРШРУТЫ АВТОРИЗАЦИИ ---

// Регистрация
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Введите логин и пароль' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) return res.status(400).json({ error: 'Пользователь уже существует' });
            res.json({ success: true, message: 'Регистрация успешна' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Вход
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'Пользователь не найден' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Неверный пароль' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ success: true, token, username: user.username });
    });
});

// --- МАРШРУТЫ ИСТОРИИ (ЗАЩИЩЕННЫЕ) ---

// Получить историю пользователя
app.get('/api/history', authenticateToken, (req, res) => {
    db.all(`SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC`, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        // Парсим JSON строку обратно в объект
        const formattedRows = rows.map(row => ({ ...row, result_data: JSON.parse(row.result_data) }));
        res.json(formattedRows);
    });
});

// Сохранить расчет в историю
app.post('/api/history', authenticateToken, (req, res) => {
    // Добавили custom_title и description в req.body
    const { calc_type, result_data, custom_title, description } = req.body; 
    
    // Обновили SQL запрос
    db.run(`INSERT INTO history (user_id, calc_type, result_data, custom_title, description) VALUES (?, ?, ?, ?, ?)`, 
        [req.user.id, calc_type, JSON.stringify(result_data), custom_title || null, description || null], 
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: this.lastID });
        }
    );
});

// --- МАРШРУТЫ РАСЧЕТА (КАК БЫЛИ) ---
// (Я оставил их прежними, они не требуют авторизации)
app.post('/api/calculate/paint', (req, res) => {
    const { L, W, H, doorW, doorH, winW, winH, layers, coverage, canVol, reserve } = req.body;
    const sWalls = 2 * (L + W) * H;
    const sOpenings = (doorW * doorH) + (winW * winH);
    const sUseful = sWalls - sOpenings;
    const vPaint = (sUseful * layers / coverage) * (1 + reserve / 100);
    const cans = Math.ceil(vPaint / canVol);
    res.json({ success: true, cans, details: { sWalls: sWalls.toFixed(2), sOpenings: sOpenings.toFixed(2), sUseful: sUseful.toFixed(2), vPaint: vPaint.toFixed(3) } });
});

app.post('/api/calculate/tile', (req, res) => {
    const { L, W, tileArea, packCount, reserve } = req.body;
    const area = L * W;
    const totalArea = area * (1 + reserve / 100);
    const totalTiles = totalArea / tileArea;
    const packs = Math.ceil(totalTiles / packCount);
    res.json({ success: true, packs, details: { area: area.toFixed(2), totalArea: totalArea.toFixed(2), totalTiles: totalTiles.toFixed(1) } });
});

app.post('/api/calculate/wallpaper', (req, res) => {
    const { L, W, H, rollW, rollL, reserve } = req.body;
    const perimeter = 2 * (L + W);
    const sWalls = perimeter * H;
    const sTotal = sWalls * (1 + reserve / 100);
    const rollArea = rollW * rollL;
    const rolls = Math.ceil(sTotal / rollArea);
    res.json({ success: true, rolls, details: { perimeter: perimeter.toFixed(2), sWalls: sWalls.toFixed(2), sTotal: sTotal.toFixed(2), rollArea: rollArea.toFixed(2) } });
});

app.post('/api/calculate/floor', (req, res) => {
    const { L, W, packArea, reserve } = req.body;
    const area = L * W;
    const totalArea = area * (1 + reserve / 100);
    const packs = Math.ceil(totalArea / packArea);
    res.json({ success: true, packs, details: { area: area.toFixed(2), totalArea: totalArea.toFixed(2) } });
});

// --- ОБНОВЛЕНИЕ ЗАПИСИ ИСТОРИИ ---
app.put('/api/history/:id', authenticateToken, (req, res) => {
    const { custom_title, description } = req.body;
    const historyId = req.params.id;

    // Проверяем, что запись принадлежит этому пользователю
    db.run(`UPDATE history SET custom_title = ?, description = ? WHERE id = ? AND user_id = ?`, 
        [custom_title || null, description || null, historyId, req.user.id], 
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Запись не найдена или нет прав' });
            res.json({ success: true });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});