const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable default Node.js metrics
client.collectDefaultMetrics({
  prefix: "nodejs_app_"
});

// Custom request counter
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"]
});

app.get("/", (req, res) => {
  httpRequests.inc({
    method: req.method,
    route: "/",
    status_code: 200
  });

  res.send(`
    <h1>DevOps Monitoring Project</h1>
    <p>Node.js application is running successfully.</p>
    <p>CI/CD: GitHub → Jenkins → Docker</p>
    <p>Monitoring: Prometheus → Grafana</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
