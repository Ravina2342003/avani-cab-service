# ============================================================
#  AVANI CAB SERVICE NASHIK — AWS Serverless Deployment Guide
# ============================================================

## FILES IN THIS PROJECT
────────────────────────────────────────
Frontend (upload to S3):
  index.html            → Home page
  add_booking.html      → Booking form
  fetch_all_bookings.html → View all bookings
  style.css             → All styles
  scripts.js            → API calls (update API_ENDPOINT here)

Backend (AWS Lambda):
  lambda/insertCabBooking.js  → POST: save new booking
  lambda/getCabBookings.js    → GET: fetch all bookings
────────────────────────────────────────


## STEP 1 — CREATE DYNAMODB TABLE
───────────────────────────────────
1. AWS Console → DynamoDB → Create Table
2. Table name:      cabBookings
3. Partition key:   bookingid   (String)
4. Keep all defaults → Create table


## STEP 2 — CREATE IAM ROLE FOR LAMBDA
───────────────────────────────────────
1. AWS Console → IAM → Roles → Create Role
2. Trusted entity: AWS Service → Lambda
3. Attach policy:  AmazonDynamoDBFullAccess
4. Role name:      avani-lambda-dynamo-role
5. Create role


## STEP 3 — CREATE LAMBDA: insertCabBooking
────────────────────────────────────────────
1. AWS Console → Lambda → Create Function
2. Function name:   insertCabBooking
3. Runtime:         Node.js 18.x
4. Execution role:  Use existing → avani-lambda-dynamo-role
5. Create function
6. In the Code editor, paste the contents of lambda/insertCabBooking.js
7. Click Deploy
8. Test it:
   Event JSON:
   {
     "httpMethod": "POST",
     "body": "{\"bookingid\":\"ACS-001\",\"name\":\"Test User\",\"destination\":\"Mumbai\",\"price\":\"2500\"}"
   }


## STEP 4 — CREATE LAMBDA: getCabBookings
──────────────────────────────────────────
1. AWS Console → Lambda → Create Function
2. Function name:   getCabBookings
3. Runtime:         Node.js 18.x
4. Execution role:  Use existing → avani-lambda-dynamo-role
5. Create function
6. In the Code editor, paste the contents of lambda/getCabBookings.js
7. Click Deploy
8. Test it:
   Event JSON: { "httpMethod": "GET" }
   Should return array of bookings.


## STEP 5 — CREATE API GATEWAY
────────────────────────────────
1. AWS Console → API Gateway → Create API
2. Choose: REST API → Build
3. API name: avani-cab-api
4. Create API

── Create POST method ──────────────
5. Actions → Create Resource → Resource Name: bookings
6. Select /bookings → Actions → Create Method → POST
7. Integration type: Lambda Function
8. Lambda Function: insertCabBooking
9. Save → OK (grant permissions)

── Create GET method ───────────────
10. Select /bookings → Actions → Create Method → GET
11. Integration type: Lambda Function
12. Lambda Function: getCabBookings
13. Save → OK

── Enable CORS ─────────────────────
14. Select /bookings → Actions → Enable CORS
15. Leave defaults → Enable CORS and replace existing CORS headers → Yes

── Deploy API ──────────────────────
16. Actions → Deploy API
17. Deployment stage: [New Stage] → Stage name: prod
18. Deploy

19. COPY the Invoke URL shown — looks like:
    https://xxxxxxxxxx.execute-api.ap-south-1.amazonaws.com/prod/bookings


## STEP 6 — UPDATE scripts.js
───────────────────────────────
Open scripts.js and replace line 7:

  var API_ENDPOINT = "PASTE_YOUR_API_GATEWAY_URL_HERE";

With your actual URL:

  var API_ENDPOINT = "https://xxxxxxxxxx.execute-api.ap-south-1.amazonaws.com/prod/bookings";

Save the file.


## STEP 7 — CREATE S3 BUCKET & HOST WEBSITE
─────────────────────────────────────────────
1. AWS Console → S3 → Create Bucket
2. Bucket name:     avani-cab-nashik-website (must be unique)
3. Region:          ap-south-1 (Mumbai) — closest to Nashik
4. Uncheck "Block all public access" → Confirm
5. Create bucket

── Upload files ────────────────────
6. Upload all frontend files:
   - index.html
   - add_booking.html
   - fetch_all_bookings.html
   - style.css
   - scripts.js   ← (with your API URL updated)

── Enable Static Website Hosting ───
7. Bucket → Properties → Static website hosting → Edit
8. Enable → Index document: index.html
9. Save changes

── Add Bucket Policy ───────────────
10. Bucket → Permissions → Bucket Policy → Edit
11. Paste this policy (replace YOUR-BUCKET-NAME):

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}

12. Save changes


## STEP 8 — GET YOUR WEBSITE URL
──────────────────────────────────
1. S3 → Your Bucket → Properties → Static website hosting
2. Copy the Bucket website endpoint URL — looks like:
   http://avani-cab-nashik-website.s3-website.ap-south-1.amazonaws.com

3. Open in browser — your Avani Cab Service website is LIVE! 🎉


## ARCHITECTURE SUMMARY
─────────────────────────────────────────────────────────────
 Browser (S3 Static Website)
       │
       │  HTTPS
       ▼
 API Gateway (REST API)
   ├── POST /bookings ──► Lambda: insertCabBooking ──► DynamoDB
   └── GET  /bookings ──► Lambda: getCabBookings   ──► DynamoDB
─────────────────────────────────────────────────────────────

## COST ESTIMATE (very low for small usage)
──────────────────────────────────────────────
- S3 Static Hosting:   ~$0.01/month
- API Gateway:         First 1M calls free/month
- Lambda:              First 1M invocations free/month
- DynamoDB:            First 25GB storage free (on-demand)

Total estimated cost for small business: FREE tier for most usage!
