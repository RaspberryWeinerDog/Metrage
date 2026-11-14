Metrage | Метраж — веб-сервис для расчета строительных материалов при ремонте.

Учебный репозиторий. Проект разработан в рамках дисциплины «Проектная деятельность». Название "Metrage" указано не как точный перевод слова «метраж», а в качестве брендового наименования.

Приложение помогает людям без профессионального опыта точно рассчитать необходимое количество материалов для ремонта, исключить ошибки в вычислениях и сэкономить бюджет. Пользователь вводит параметры помещения, система учитывает проемы, технологические запасы и формирует список покупок с возможностью сохранения в личном кабинете.

Реализованные возможности:

* **Калькуляторы материалов.** Расчет краски, керамической плитки, обоев и напольных покрытий с учетом специфики каждого типа работ.
* **Умный расчет.** Учет площади дверных и оконных проемов, количества слоев краски, технологического запаса на подрезку и стыковку рисунка обоев.
* **Личный кабинет.** Регистрация и авторизация пользователей с безопасным хранением паролей (Bcrypt) и использованием JWT-токенов.
* **История расчетов.** Сохранение всех вычислений в базу данных для доступа с любого устройства. Реализовано добавление пользовательских названий, описаний, множественное выделение записей и экспорт сводного заключения в PDF.
* **Интеграция с маркетплейсами.** Формирование прямых ссылок для поиска и покупки рассчитанных материалов на Wildberries, Ozon и Яндекс Маркет.

Технологический стек:

* **Frontend:** HTML5, CSS3, Vanilla JavaScript.
* **Backend:** Node.js, Express, SQLite3, Bcrypt.js, JSON Web Tokens (JWT).

Как запустить проект:

Для запуска потребуется установленный Node.js и редактор кода (например, Visual Studio Code).

1. Установите зависимости сервера. Откройте терминал, перейдите в папку backend и выполните:
```
cd backend
npm install
```
Команда скачает Express, SQLite, JWT и другие библиотеки, необходимые для работы сервера.

Запустите сервер. Находясь в папке backend, выполните:
```
node server.js
```
В терминале должно появиться сообщение: Сервер запущен на http://localhost:3000 и Подключено к базе данных SQLite. Не закрывайте это окно терминала, пока работаете с сайтом.

Запустите Frontend. Откройте корневую папку проекта в VS Code (где находится файл index.html). Нажмите правой кнопкой мыши на index.html и выберите "Open with Live Server".

Статус: Архив / Read-Only. Проект завершен, разработка и внесение изменений не планируются.

---

Metrage | Web service for calculating construction materials for renovation.

Educational repository. The project was developed as part of the "Project Activity" discipline. The name "Metrage" is used not as a literal translation of the word "metrage" (footage), but as a brand name.

The application helps people without professional experience to accurately calculate the required amount of renovation materials, eliminate calculation errors, and save budget. The user enters room parameters, the system takes into account openings, technological reserves, and generates a shopping list that can be saved in a personal account.

Implemented features:

* **Material Calculators.** Calculation of paint, ceramic tiles, wallpaper, and floor coverings, taking into account the specifics of each type of work.
* **Smart Calculation.** Accounting for the area of door and window openings, the number of paint layers, and the technological reserve for cutting and pattern matching of wallpaper.
* **Personal Account.** User registration and authorization with secure password storage (Bcrypt) and JWT tokens usage.
* **Calculation History.** Saving all calculations in a database for access from any device. Added custom titles, descriptions, multiple record selection, and export of the summary report to PDF.
* **Marketplace Integration.** Generation of direct links for searching and purchasing calculated materials on Wildberries, Ozon, and Yandex Market.

Tech Stack:

* **Frontend:** HTML5, CSS3, Vanilla JavaScript.
* **Backend:** Node.js, Express, SQLite3, Bcrypt.js, JSON Web Tokens (JWT).

How to run the project:

To run the project, you will need Node.js installed and a code editor (e.g., Visual Studio Code).

1. Install server dependencies. Open a terminal, navigate to the backend folder, and run:
```
cd backend
npm install
```
This command will download Express, SQLite, JWT, and other libraries required for the server to run.

2. Start the server. While in the backend folder, run:
```
node server.js
```
The terminal should display the messages: "Server is running on http://localhost:3000" and "Connected to SQLite database". Do not close this terminal window while working with the website.

3. Launch the Frontend. Open the project root folder in VS Code (where the index.html file is located). Right-click on index.html and select "Open with Live Server".

Status: Archive / Read-Only. The project is completed; development and changes are not planned.
