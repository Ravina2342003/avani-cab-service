⚡ Serverless Application - Avani Cab Service.
A fully serverless web application built with AWS Lambda, API Gateway, and DynamoDB — deployed on AWS using the Serverless Framework. No servers to manage, auto-scaling, and pay-per-use.

📌 Features

Create Records — Submit data via a REST API endpoint backed by AWS Lambda
Read Records — Retrieve all records or filter by specific attributes from DynamoDB
Update & Delete — Modify or remove records using RESTful API operations
Auto Scaling — Scales automatically with zero infrastructure management
Secure Access — API Gateway with IAM / API Key authorization


🛠️ Tech Stack
LayerTechnologyRuntimePython 3.11 / Node.js 18.xFunctionsAWS LambdaAPI LayerAWS API Gateway (REST)DatabaseAWS DynamoDB (NoSQL)StorageAWS S3 (if applicable)NotificationsAWS SNS / SQS (if applicable)DeploymentServerless Framework / AWS SAMCloud ProviderAWS (Amazon Web Services)

📁 Project Structure
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

🚀 Deployment Guide (AWS)
1. Prerequisites
Make sure you have the following installed:
bashnode --version       # Node.js 18+
python --version     # Python 3.11+
aws --version        # AWS CLI configured
serverless --version # Serverless Framework
2. Configure AWS Credentials
bashaws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: us-east-1
# Output format: json
3. Install Dependencies
bashnpm install -g serverless
pip install -r requirements.txt
4. Clone the Repository
bashgit clone https://github.com/RavinaDeore/serverless-app.git
cd serverless-app
5. Deploy to AWS
bashserverless deploy
After deployment, you will see output like:
endpoints:
  POST   - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records
  GET    - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records
  GET    - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records/{id}
  PUT    - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records/{id}
  DELETE - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/records/{id}
6. Remove / Tear Down
bashserverless remove

🗄️ Database Schema (DynamoDB)
AttributeTypeDescriptionidStringPrimary key (UUID)nameStringRecord namedescriptionStringDetailed descriptionstatusStringactive / inactive / pendingcreated_atStringISO timestamp of creationupdated_atStringISO timestamp of last update

📡 API Endpoints
MethodEndpointDescriptionPOST/recordsCreate a new recordGET/recordsFetch all recordsGET/records/{id}Fetch a record by IDPUT/records/{id}Update a record by IDDELETE/records/{id}Delete a record by ID
Example Request — Create Record
jsonPOST /records
{
  "name": "Test Server",
  "description": "Primary web server",
  "status": "active"
}
Example Response
json{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Test Server",
  "description": "Primary web server",
  "status": "active",
  "created_at": "2025-01-15T10:30:00Z"
}

💡 How It Works

API Gateway receives HTTP requests and routes them to the appropriate Lambda function
Lambda functions process the request (create/read/update/delete) and interact with DynamoDB
DynamoDB stores all data in a NoSQL table with on-demand capacity (auto-scaling)
IAM Roles ensure each Lambda function has only the permissions it needs (least privilege)
No server management — AWS handles all infrastructure, patching, and scaling automatically


🌐 Architecture Diagram
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

🔐 Environment Variables
Set these in serverless.yml or AWS Parameter Store:
VariableDescriptionDYNAMODB_TABLEName of the DynamoDB tableREGIONAWS region (e.g. us-east-1)STAGEDeployment stage (dev/prod)

📸 Pages / Screens (if frontend exists)
PageDescription/Home — overview and navigation/createForm to submit a new record/recordsTable view of all records/records/{id}Detail view of a single record

👩‍💻 Author
Ravina Deore
Built as a portfolio project demonstrating serverless architecture and cloud-native application deployment on AWS.
GitHub: @Ravina Deore
