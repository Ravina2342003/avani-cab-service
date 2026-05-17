// ============================================================
// Lambda Function: getCabBookings
// Runtime: Node.js 18.x
// DynamoDB Table: cabBookings  |  Partition Key: bookingid
// ============================================================

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "cabBookings";

exports.handler = async (event) => {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json"
    };

    // Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    try {
        const result = await dynamo.send(new ScanCommand({
            TableName: TABLE_NAME
        }));

        // Sort by createdAt descending (newest first)
        const items = (result.Items || []).sort((a, b) => {
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(items)
        };

    } catch (err) {
        console.error("Error fetching bookings:", err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Internal server error", error: err.message })
        };
    }
};
