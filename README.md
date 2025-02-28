# Telegram Bot: серверная часть

## ⚙️ Описание

Этот репозиторий содержит код серверной части Telegram-бота, обеспечивающего взаимодействие с базой данных и обработку запросов от клиентского приложения (мини-приложения Telegram). Сервер отвечает за логику обработки заказов, добавление успешных транзакций и отображение информации о корзине пользователя.

## 🚀 Возможности

*   **Взаимодействие с базой данных:** Подключение и выполнение операций с базой данных для хранения информации о товарах, пользователях и заказах.
*   **Обработка заказов:** Прием данных из мини-приложения, формирование заказа и сохранение информации о транзакции.
*   **Управление корзиной:** Предоставление пользователю информации о товарах в корзине.
*   **Расширяемость:** Легкость добавления новых функций и интеграций благодаря модульной структуре.

## 🛠️ Технологии

*   **Язык программирования:** JavaScript
*   **Среда выполнения:** Node.js
*   **База данных:** PostgreSQL
*   **Фреймворк:** Node.js, Express.js


## ⚙️ Как запустить проект

1.  Установите [Node.js](https://nodejs.org/).
2.  Клонируйте репозиторий:

    ```
    git clone https://github.com/Czernee/stud_pract_bot
    ```

3.  Перейдите в папку проекта:

    ```
    cd stud_pract_bot
    ```

4.  Установите зависимости:

    ```
    npm install
    ```

5.  Настройте переменные окружения в файле `.env` (например, параметры подключения к базе данных).
6.  Запустите приложение:

    ```
    npm start
    ```


