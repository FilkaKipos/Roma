// app.js

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const Letter = require('./models/letter');

const app = express();


// Подключение к базе данных
connectDB();

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Парсинг тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для отображения формы
app.get('/', (req, res) => {
    res.render('index');
});

// Маршрут для обработки отправки формы
app.post('/submit-letter', async (req, res) => {
    try {
        const { fullName, email, letterContent } = req.body;
        const letter = new Letter({ fullName, email, letterContent });
        await letter.save();
        res.status(201).json({ message: 'Письмо успешно отправлено!', letter });
    } catch (error) {
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
});

// Статические файлы
app.use(express.static('public'));

app.get('/letters', async (req, res) => {
    try {
        const letters = await Letter.find();
        res.render('letters', { letters });
    } catch (error) {
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
