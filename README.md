# ⚡ Serverless Application - Avani Cab Service.

A fully serverless web application built with AWS Lambda, API Gateway, and DynamoDB — deployed on AWS using the Serverless Framework. No servers to manage, auto-scaling, and pay-per-use.

---

## 📌 Features

- **Create Records** — Submit data via a REST API endpoint backed by AWS Lambda
- **Read Records** — Retrieve all records or filter by specific attributes from DynamoDB
- **Update & Delete** — Modify or remove records using RESTful API operations
- **Auto Scaling** — Scales automatically with zero infrastructure management
- **Secure Access** — API Gateway with IAM / API Key authorization

---

## 🛠️ Tech Stack

| Layer            | Technology                        |
|------------------|-----------------------------------|
| Runtime          | Python 3.11 / Node.js 18.x        |
| Functions        | AWS Lambda                        |
| API Layer        | AWS API Gateway (REST)            |
| Database         | AWS DynamoDB (NoSQL)              |
| Storage          | AWS S3 (if applicable)            |
| Notifications    | AWS SNS / SQS (if applicable)     |
| Deployment       | Serverless Framework / AWS SAM    |
| Cloud Provider   | AWS (Amazon Web Services)         |

---

## 📁 Project Structure

```
serverless-app/
│
├── functions/
│   ├── create.py           # Lambda — Create a new record
│   ├── getAll.py           # Lambda — Fetch all records
│   ├── getById.py          # Lambda — Fetch record by ID
│   ├── update.py           # Lambda — Update a record
│   └── delete.py           # Lambda — Delete a record
│
├── models/
│   └── schema.py           # Data validation schema
│
├── utils/
│   └── response.py         # Common HTTP response helper
│
├── serverless.yml          # Serverless Framework config
├── requirements.txt        # Python dependencies
└── README.md
```

---

## 🚀 Deployment Guide (AWS)

### 1. Prerequisites
Make sure you have the following installed:
```bash
node --version       # Node.js 18+
python --version     # Python 3.11+
aws --version        # AWS CLI configured
serverless --version # Serverless Framework
```

### 2. Configure AWS Credentials
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: us-east-1
# Output format: json
```

### 3. Install Dependencies
```bash
npm install -g serverless
pip install -r requirements.txt
```

### 4. Clone the Repository
```bash
git clone https://github.com/yourusername/serverless-app.git
cd serverless-app
```

### 5. Deploy to AWS
```bash
serverless deploy
```

After deployment, you will see output like:
```
endpoints:
  POST   - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records
  GET    - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records
  GET    - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records/{id}
  PUT    - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records/{id}
  DELETE - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records/{id}
```

### 6. Remove / Tear Down
```bash
serverless remove
```

---

## 🗄️ Database Schema (DynamoDB)

| Attribute      | Type      | Description                          |
|----------------|-----------|--------------------------------------|
| `id`           | String    | Primary key (UUID)                   |
| `name`         | String    | Record name                          |
| `description`  | String    | Detailed description                 |
| `status`       | String    | `active` / `inactive` / `pending`    |
| `created_at`   | String    | ISO timestamp of creation            |
| `updated_at`   | String    | ISO timestamp of last update         |

---

## 📡 API Endpoints

| Method   | Endpoint               | Description               |
|----------|------------------------|---------------------------|
| `POST`   | `/records`             | Create a new record       |
| `GET`    | `/records`             | Fetch all records         |
| `GET`    | `/records/{id}`        | Fetch a record by ID      |
| `PUT`    | `/records/{id}`        | Update a record by ID     |
| `DELETE` | `/records/{id}`        | Delete a record by ID     |

### Example Request — Create Record
```json
POST /records
{
  "name": "Test Server",
  "description": "Primary web server",
  "status": "active"
}
```

### Example Response
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Test Server",
  "description": "Primary web server",
  "status": "active",
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 💡 How It Works

- **API Gateway** receives HTTP requests and routes them to the appropriate Lambda function
- **Lambda functions** process the request (create/read/update/delete) and interact with DynamoDB
- **DynamoDB** stores all data in a NoSQL table with on-demand capacity (auto-scaling)
- **IAM Roles** ensure each Lambda function has only the permissions it needs (least privilege)
- **No server management** — AWS handles all infrastructure, patching, and scaling automatically

---

## 🌐 Architecture Diagram

```
Client (Browser / Postman)
        │
        ▼
  AWS API Gateway
  (REST Endpoints)
        │
        ▼
  AWS Lambda Functions
  (create / read / update / delete)
        │
        ▼
  AWS DynamoDB
  (NoSQL Database)
```

---

## 🔐 Environment Variables

Set these in `serverless.yml` or AWS Parameter Store:

| Variable          | Description                    |
|-------------------|--------------------------------|
| `DYNAMODB_TABLE`  | Name of the DynamoDB table     |
| `REGION`          | AWS region (e.g. `us-east-1`)  |
| `STAGE`           | Deployment stage (`dev`/`prod`)|

---

## 📸 Pages / Screens _(if frontend exists)_

| Page              | Description                          |
|-------------------|--------------------------------------|
| `/`               | Home — overview and navigation       |
| `/create`         | Form to submit a new record          |
| `/records`        | Table view of all records            |
| `/records/{id}`   | Detail view of a single record       |

---

## 👩‍💻 Author

**Ravina Deore**

Built as a portfolio project demonstrating serverless architecture and cloud-native application deployment on AWS.

GitHub: [@yRavina Deore](https://github.com/Ravina Deore)
