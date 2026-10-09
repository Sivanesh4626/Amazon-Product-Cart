
import React, { useState, useEffect } from "react";
import "./App.css";

// Create a mouse illustration directly in React
function createMouseImage(colour) {
  const mouseColours = {
    Black: { body: "#242424", edge: "#111111", wheel: "#888888" },
    Blue: { body: "#2580dc", edge: "#15549b", wheel: "#a8d5ff" },
    White: { body: "#ffffff", edge: "#9ca3af", wheel: "#64748b" },
  };

  const c = mouseColours[colour];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" rx="20" fill="#edf1f4"/>
      <ellipse cx="200" cy="230" rx="95" ry="125"
               fill="#000000" opacity="0.12"/>
      <path d="M200 70
        C130 70 100 125 100 205
        C100 295 145 335 200 335
        C255 335 300 295 300 205
        C300 125 270 70 200 70 Z"
        fill="${c.body}" stroke="${c.edge}" stroke-width="8"/>
      <path d="M200 75 L200 190"
        stroke="${c.edge}" stroke-width="7"/>
      <rect x="184" y="120" width="32" height="65" rx="15"
        fill="${c.wheel}" stroke="${c.edge}" stroke-width="3"/>
      <path d="M115 180 Q130 90 195 80"
        fill="none" stroke="#ffffff" stroke-width="8"
        opacity="0.18" stroke-linecap="round"/>
    </svg>`;

  return "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg);
}

// Header Component
function Header() {
  return (
    <header className="header">
      <h1>Amazon Product Store</h1>
    </header>
  );
}

// ProductCard Component
function ProductCard({ name, price, quantity, colour, city }) {
  return (
    <section className="product-card">
      <div className="product-image">
        <img
          src={createMouseImage(colour)}
          alt={`${colour} Wireless Mouse`}
        />
      </div>

      <div className="product-details">
        <h2>{name}</h2>

        <p className="price">
          ₹{price} <span>per item</span>
        </p>

        <p className="detail">
          Colour: <strong>{colour}</strong>
        </p>

        <p className="detail">
          Deliver to: <strong>{city || "Not entered"}</strong>
        </p>

        <hr />

        <p className="detail">
          Cart Quantity: <strong>{quantity}</strong>
        </p>

        <h3>Total Amount: ₹{quantity * price}</h3>

        <p className="cart-status">
          {quantity === 0
            ? "Cart is empty"
            : "Product added to cart"}
        </p>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      © 2026 Amazon Product Store
    </footer>
  );
}

// Main App Component
function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  const productName = "Wireless Mouse";
  const price = 499;

  // Lifecycle hook: update the browser tab title
  useEffect(() => {
    document.title =
      `${productName} | ${selectedColor} | Cart: ${quantity}`;
  }, [selectedColor, quantity]);

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {showProduct && (
          <ProductCard
            name={productName}
            price={price}
            quantity={quantity}
            colour={selectedColor}
            city={deliveryCity}
          />
        )}

        <div className="controls">
          <div className="field">
            <label htmlFor="colour">Product colour</label>

            <select
              id="colour"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="city">Delivery city</label>

            <input
              id="city"
              type="text"
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
              placeholder="Enter delivery city"
            />
          </div>

          <div className="buttons">
            <button
              className="add-button"
              onClick={() => setQuantity((q) => q + 1)}
            >
              Add to Cart
            </button>

            <button
              onClick={() =>
                setQuantity((q) => Math.max(0, q - 1))
              }
              disabled={quantity === 0}
            >
              Remove One
            </button>

            <button onClick={() => setQuantity(0)}>
              Reset Cart
            </button>

            <button
              onClick={() => setShowProduct((show) => !show)}
            >
              {showProduct ? "Hide Product" : "Show Product"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
