import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // WebSocket logic
  let nodes = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    chaosX: 10 + Math.random() * 80,
    chaosY: 10 + Math.random() * 65,
    gridX: 20 + (i % 4) * 20,
    gridY: 15 + Math.floor(i / 4) * 20,
  }));

  // Simulate real-time data updates
  setInterval(() => {
    // Update chaos positions slightly
    nodes = nodes.map(node => {
      // Random walk for chaos mode
      let newChaosX = node.chaosX + (Math.random() - 0.5) * 4;
      let newChaosY = node.chaosY + (Math.random() - 0.5) * 4;
      
      // Keep within bounds
      newChaosX = Math.max(5, Math.min(95, newChaosX));
      newChaosY = Math.max(5, Math.min(95, newChaosY));

      return {
        ...node,
        chaosX: newChaosX,
        chaosY: newChaosY,
      };
    });

    const data = JSON.stringify({ type: 'NODES_UPDATE', payload: nodes });
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }, 800); // Update every 800ms for a "live" feel

  wss.on('connection', (ws) => {
    // Send initial state
    ws.send(JSON.stringify({ type: 'NODES_INIT', payload: nodes }));

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === 'FETCH_LATEST') {
          // Force an immediate update
          nodes = nodes.map(node => {
            let newChaosX = node.chaosX + (Math.random() - 0.5) * 15; // Larger jump on manual sync
            let newChaosY = node.chaosY + (Math.random() - 0.5) * 15;
            newChaosX = Math.max(5, Math.min(95, newChaosX));
            newChaosY = Math.max(5, Math.min(95, newChaosY));
            return { ...node, chaosX: newChaosX, chaosY: newChaosY };
          });
          ws.send(JSON.stringify({ type: 'NODES_UPDATE', payload: nodes }));
        }
      } catch (e) {
        console.error("Error parsing message", e);
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
