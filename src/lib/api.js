const API_BASE = "/api/products";

export async function fetchProducts({
  category,
  page = 1,
  limit = 12,
  size,
  minPrice,
  maxPrice,
  sort,
} = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (size) params.set("size", size);           // comma-separated
  if (minPrice) params.set("minPrice", String(minPrice));
  if (maxPrice) params.set("maxPrice", String(maxPrice));
  if (sort) params.set("sort", sort);

  const res = await fetch(`${API_BASE}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function searchProducts({
  q,
  page = 1,
  limit = 12,
  size,
  minPrice,
  maxPrice,
  sort,
} = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (size) params.set("size", size);
  if (minPrice) params.set("minPrice", String(minPrice));
  if (maxPrice) params.set("maxPrice", String(maxPrice));
  if (sort) params.set("sort", sort);

  const res = await fetch(`${API_BASE}/search?${params}`);
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}
