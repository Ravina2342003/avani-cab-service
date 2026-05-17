// ============================================================
// Lambda Function: insertCabBooking
// Runtime: Node.js 18.x
// DynamoDB Table: cabBookings  |  Partition Key: bookingid
// ============================================================

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

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
        const body = JSON.parse(event.body);

        const { bookingid, name, pickup, destination, traveldate, phone } = body;

        if (!bookingid || !name || !destination || !price) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "Missing required fields: bookingid, name, destination" })
            };
        }

        const item = {
            bookingid,
            name,
            pickup: pickup || "",
            destination,
            traveldate: traveldate || "",
            phone: phone || "",
            createdAt: new Date().toISOString(),
            status: "Confirmed"
        };

        await dynamo.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: item
        }));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Booking saved successfully!", bookingid })
        };

    } catch (err) {
        console.error("Error inserting booking:", err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Internal server error", error: err.message })
        };
    }
};
