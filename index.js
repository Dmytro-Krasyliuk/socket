const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 }); // Порт вашего WebSocket сервера
let sharedText = ""; // Общий текст для редактирования

wss.on("connection", (ws) => {
  console.log("Клиент подключился");

  // Отправляем текущий текст новому клиенту
  ws.send(sharedText);

  ws.on("message", (message) => {
    console.log("Получено сообщение:", message);

    // Сохраняем изменения в общем тексте
    sharedText = message;

    // Рассылаем обновленный текст всем клиентам, включая отправителя
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(sharedText);
      }
    });
  });

  ws.on("close", () => {
    console.log("Клиент отключился");
  });
});

console.log("WebSocket сервер запущен на порту 3000");
