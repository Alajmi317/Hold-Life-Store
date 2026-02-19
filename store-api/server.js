const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "products.json";

// جلب المنتجات
app.get("/api/products", (req, res) => {
  const data = fs.readFileSync(DB_FILE);
  res.json(JSON.parse(data));
});

// إضافة منتج من لوحة الأدمن
app.post("/api/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync(DB_FILE));
  products.push(req.body);
  fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("API شغال على http://localhost:3000");
});

