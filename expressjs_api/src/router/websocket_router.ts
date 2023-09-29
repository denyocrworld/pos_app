import WebSocket from "ws";

export default class WebSocketRouter {
  init(wss: WebSocket.Server) {
    wss.on("connection", (ws: WebSocket) => {
      console.log("Koneksi WebSocket terhubung");

      // Menghandle pesan yang diterima dari klien
      ws.on("message", (message: string) => {
        console.log(`Pesan diterima: ${message}`);
        ws.send(message.toString());
      });

      // Menghandle ketika koneksi terputus
      ws.on("close", () => {
        console.log("Koneksi WebSocket terputus");
      });
    });
  }
}
