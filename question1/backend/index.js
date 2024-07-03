// server.js

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

const ecommerceAPIs = ["https://company1-api.com", "https://company2-api.com"];

app.get("/categories/:categoryname/products", async (req, res) => {
  try {
    const { categoryname } = req.params;
    const { n, page = 1, sort_by, order = "asc" } = req.query;

    const limit = parseInt(n);
    if (!limit || limit <= 0) {
      return res
        .status(400)
        .json({ error: "'n' query parameter must be a positive number" });
    }

    let allProducts = [];
    for (const api of ecommerceAPIs) {
      const response = await axios.get(
        `${api}/products?category=${categoryname}`
      );
      const products = response.data.products.map((product) => ({
        ...product,
        company: api,
      }));
      allProducts = [...allProducts, ...products];
    }

    if (sort_by) {
      allProducts.sort((a, b) => {
        if (order === "asc") {
          return a[sort_by] > b[sort_by] ? 1 : -1;
        } else {
          return a[sort_by] < b[sort_by] ? 1 : -1;
        }
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    const productsWithId = paginatedProducts.map((product) => ({
      ...product,
      custom_id: uuidv4(),
    }));

    res.json(productsWithId);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/categories/:categoryname/products/:productid", async (req, res) => {
  try {
    const { categoryname, productid } = req.params;

    let product = null;
    for (const api of ecommerceAPIs) {
      const response = await axios.get(`${api}/products/${productid}`);
      if (
        response.data.product &&
        response.data.product.category === categoryname
      ) {
        product = {
          ...response.data.product,
          company: api,
        };
        break;
      }
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
