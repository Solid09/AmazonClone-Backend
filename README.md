
---

### ✅ **README for `AmazonClone-Backend`**

# 🔧 Amazon Clone - Backend

This is the backend of the full-stack Amazon Clone, built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, product management, cart/order logic, and secure APIs.

> 🔗 [Frontend Repository](https://github.com/Solid09/AmazonClone-Frontend)

## 🚀 Features

- JWT-based user authentication
- User registration and login APIs
- Product APIs (create, read, update, delete)
- Cart logic and order placement
- MongoDB for data storage
- RESTful API structure

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv

## 📦 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/api/users/login`  | User login               |
| POST   | `/api/users/register` | User registration        |
| GET    | `/api/products`     | Get all products         |
| POST   | `/api/orders`       | Place order              |
| ...    | ...                 | More endpoints coming... |

## 🧑‍💻 Local Development

```bash
git clone https://github.com/Solid09/AmazonClone-Backend.git
cd AmazonClone-Backend
npm install
npm run dev
