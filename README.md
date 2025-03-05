# 🔋 Blockchain-Based Energy Trading Platform

A decentralized platform for buying and selling renewable energy using **Ethereum blockchain and smart contracts**. Users can list, buy, and trade energy securely, with transactions stored on the blockchain.  

🚀 **Live Demo:** [(Netlify)](https://energy-trader.netlify.app) 

---

## 📌 Features
✅ **Decentralized Energy Trading** – Buy and sell energy using Ethereum smart contracts.  
✅ **Blockchain Transactions** – Transactions are recorded on the blockchain for security.  
✅ **Authentication System** – Users can sign up, log in, and manage accounts.  
✅ **Market Listings** – View available energy listings with prices.  
✅ **Dashboard & Analytics** – Interactive charts to visualize transactions.  
✅ **Web3 Integration** – Connect with MetaMask to make transactions.  

---

## 🛠️ Tech Stack

### **Frontend:**
- **React (Vite)** – Fast frontend framework
- **Tailwind CSS** – Styling
- **React Router** – Page navigation
- **Chart.js** – Data visualization

### **Backend:**
- **Node.js & Express.js** – REST API
- **PostgreSQL** – Database
- **JSON Web Tokens (JWT)** – Authentication

### **Smart Contracts:**
- **Solidity** – Smart contract development
- **Hardhat** – Ethereum development environment
- **Ethers.js** – Blockchain interaction

---

## 🛠️ Installation & Setup

### 🔹 Prerequisites
Ensure you have the following installed:  
- **Node.js** (LTS version)  
- **PostgreSQL** (Database)  
- **Docker** (For containerization)  
- **MetaMask Wallet** (For blockchain transactions)  

### 🔹 Backend Setup
```sh
cd backend
npm install
node src/server.js
```

### 🔹 Frontend Setup
```sh
cd frontend2
npm install
npm run dev
```

### 🔹 Smart Contract Deployment

#### 1️⃣ Compile Smart Contract
```sh
cd smart-contracts
npx hardhat compile
```

#### 2️⃣ Deploy to Sepolia Testnet
```sh
npx hardhat run scripts/deploy.js --network sepolia
```

#### 3️⃣ Verify Contract on Etherscan
```sh
npx hardhat verify --network sepolia your-contract-address
```

## 🚢 Docker Setup

### Build and Run The Container
Use `docker-compose.yml` to run everything together:
```sh
docker-compose up --build
```





