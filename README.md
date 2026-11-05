# Metrage | Умный калькулятор для ремонта

**Metrage** — это веб-сервис, разработанный в рамках университетского проекта 

Приложение помогает людям без профессионального опыта точно рассчитать необходимое количество материалов для ремонта, исключить ошибки в вычислениях и сэкономить бюджет.

## ✨ Основные возможности

*   **Калькуляторы расчета материалов:** расчет краски, керамической плитки, обоев и напольных покрытий и т.д.
*   **Умный расчет:** учет площади проемов, количества слоев краски, технологического запаса на подрезку и стыковку рисунка.
*   **Личный кабинет:** регистрация и авторизация пользователей с использованием JWT-токенов.
*   **История расчетов:** сохранение всех вычислений в базу данных для доступа с любого устройства.
*   **Интеграция с маркетплейсами:** прямые ссылки для поиска и покупки рассчитанных материалов на Wildberries, Ozon и Яндекс Маркет.

## 🛠 Технологический стек

**Frontend:**
*   HTML5, CSS3
*   JavaScript

**Backend:**
*   Node.js, Express
*   SQLite3
*   Bcrypt.js & JSON Web Tokens (JWT)

## 📂 Структура проекта:

```text
📦 Metrage (корневая папка)
 ┣ 📂 backend               # Серверная часть
 ┃ ┣ 📜 server.js           # Основной код сервера и API
 ┃ ┣ 📜 database.db         # База данных SQLite (создается автоматически)
 ┃ ┗ 📜 package.json        # Зависимости проекта
 ┣ 📂 css
 ┃ ┗ 📜 style.css           # Все стили
 ┣ 📂 js
 ┃ ┣ 📜 api.js              # Работа с сервером (fetch)
 ┃ ┣ 📜 auth.js             # Логика авторизации
 ┃ ┣ 📜 calculators.js      # Логика расчетов и маркетплейсов
 ┃ ┗ 📜 main.js             # Навигация и инициализация
 ┣ 📜 index.html            # Главная страница (меню зон ремонта)
 ┣ 📜 login.html            # Вход/Регистрация
 ┣ 📜 history.html          # Личный кабинет (история расчетов)
 ┣ 📜 paint.html            # Калькулятор краски
 ┣ 📜 tile.html             # Калькулятор плитки
 ┣ 📜 wallpaper.html        # Калькулятор обоев
 ┣ 📜 floor.html            # Калькулятор пола/потолка
 ┗ 📜 README.md             # Описание проекта
```

🚀 Как запустить проект

Для запуска вам понадобится установленный Node.js (рекомендуется версия LTS) и редактор кода, например, Visual Studio Code.

1. Установите зависимости сервера:
Откройте терминал (или командную строку), перейдите в папку backend и установите необходимые библиотеки:
bash

cd backend
npm install

(Эта команда скачает Express, SQLite, JWT и другие библиотеки, необходимые для работы сервера).

2. Запустите сервер:
Находясь в папке backend, выполните:
bash

node server.js

В терминале должно появиться сообщение: Сервер запущен на http://localhost:3000 и Подключено к базе данных SQLite. Не закрывайте это окно терминала, пока работаете с сайтом.

3. Запустите Frontend (Клиентскую часть):

    Откройте корневую папку проекта в Visual Studio Code (где находится файл index.html).

    Нажмите правой кнопкой мыши на файл index.html и выберите "Open with Live Server".



 # Metrage | Smart calculator for renovation

**Metrage** is a web service developed as a university project.

The application helps people without professional experience accurately calculate the required amount of materials for renovation, eliminate calculation errors, and save budget.

## ✨ Key Features

*   **Material calculators:** calculation of paint, ceramic tiles, wallpaper, and floor coverings, etc.
*   **Smart calculation:** accounting for the area of openings, number of paint coats, technological reserve for cutting, and pattern matching.
*   **Personal account:** user registration and authorization using JWT tokens.
*   **Calculation history:** saving all calculations to a database for access from any device.
*   **Marketplace integration:** direct links for searching and purchasing calculated materials on Wildberries, Ozon, and Yandex Market.

## 🛠 Tech Stack

**Frontend:**
*   HTML5, CSS3
*   JavaScript

**Backend:**
*   Node.js, Express
*   SQLite3
*   Bcrypt.js & JSON Web Tokens (JWT)

## 📂 Project Structure:

```text
📦 Metrage (root folder)
 ┣ 📂 backend               # Server side
 ┃ ┣ 📜 server.js           # Main server and API code
 ┃ ┣ 📜 database.db         # SQLite database (created automatically)
 ┃ ┗ 📜 package.json        # Project dependencies
 ┣ 📂 css
 ┃ ┗ 📜 style.css           # All styles
 ┣ 📂 js
 ┃ ┣ 📜 api.js              # Server interaction (fetch)
 ┃ ┣ 📜 auth.js             # Authorization logic
 ┃ ┣ 📜 calculators.js      # Calculation and marketplace logic
 ┃ ┗ 📜 main.js             # Navigation and initialization
 ┣ 📜 index.html            # Main page (renovation zones menu)
 ┣ 📜 login.html            # Login/Registration
 ┣ 📜 history.html          # Personal account (calculation history)
 ┣ 📜 paint.html            # Paint calculator
 ┣ 📜 tile.html             # Tile calculator
 ┣ 📜 wallpaper.html        # Wallpaper calculator
 ┣ 📜 floor.html            # Floor/ceiling calculator
 ┗ 📜 README.md             # Project description
```

 🚀 How to run the project

To run the project, you will need Node.js installed (LTS version is recommended) and a code editor like Visual Studio Code.

1. Install server dependencies:
Open a terminal (or command prompt), navigate to the backend folder, and install the required libraries:
bash

cd backend
npm install

(This command will download Express, SQLite, JWT, and other libraries required for the server to run).

2. Start the server:
While in the backend folder, run:
bash

node server.js

You should see the message in the terminal: Server is running on http://localhost:3000" and "Connected to SQLite database. Do not close this terminal window while using the website.

3. Start the Frontend:

    Open the root folder of the project in Visual Studio Code (where the index.html file is located).

    Right-click on the index.html file and select "Open with Live Server".
