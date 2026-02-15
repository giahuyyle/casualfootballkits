import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data", "products.json");

function readProducts() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeProducts(products) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
}

const router = Router();

// GET /api/products — list with optional category filter & pagination
router.get("/", (req, res) => {
  const { category, page = 1, limit = 12 } = req.query;
  let products = readProducts();

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Math.min(100, Number(limit)));
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / limitNum);
  const safePage = Math.min(pageNum, totalPages || 1);
  const startIndex = (safePage - 1) * limitNum;
  const paginatedProducts = products.slice(startIndex, startIndex + limitNum);

  res.json({
    products: paginatedProducts,
    page: safePage,
    totalPages,
    totalProducts,
  });
});

// GET /api/products/search?q= — search by name or code
router.get("/search", (req, res) => {
  const { q = "", page = 1, limit = 12 } = req.query;
  const query = q.toLowerCase().trim();

  if (!query) {
    return res.json({ products: [], page: 1, totalPages: 0, totalProducts: 0 });
  }

  let products = readProducts();
  products = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.code.toLowerCase().includes(query)
  );

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Math.min(100, Number(limit)));
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / limitNum);
  const safePage = Math.min(pageNum, totalPages || 1);
  const startIndex = (safePage - 1) * limitNum;
  const paginatedProducts = products.slice(startIndex, startIndex + limitNum);

  res.json({
    products: paginatedProducts,
    page: safePage,
    totalPages,
    totalProducts,
  });
});

// GET /api/products/:id — single product
router.get("/:id", (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// POST /api/products — create product
router.post("/", (req, res) => {
  const products = readProducts();
  const { name, code, category, imageUrls, size, price } = req.body;

  if (!name || !code || !category || !size || price == null) {
    return res.status(400).json({ error: "Missing required fields: name, code, category, size, price" });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name,
    code,
    category,
    imageUrls: imageUrls || [],
    size,
    price: Number(price),
  };

  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id — update product
router.put("/:id", (req, res) => {
  const products = readProducts();
  const index = products.findIndex((p) => p.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updated = { ...products[index], ...req.body, id: products[index].id };
  products[index] = updated;
  writeProducts(products);
  res.json(updated);
});

// DELETE /api/products/:id — delete product
router.delete("/:id", (req, res) => {
  let products = readProducts();
  const index = products.findIndex((p) => p.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const [deleted] = products.splice(index, 1);
  writeProducts(products);
  res.json(deleted);
});

export default router;
