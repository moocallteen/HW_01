const { generateRandomData } = require('./generateRandomData');
const exampleSchema = require("./schema.json");
const assert = require('assert');

// test to check if generated data contains required properties
function testRequiredProperties() {
    const data = generateRandomData(exampleSchema);

    assert('id' in data, 'Missing "id" property');
    assert('title' in data, 'Missing "title" property');
    assert('description' in data, 'Missing "description" property');
    assert('startDate' in data, 'Missing "startDate" property');
    assert('endDate' in data, 'Missing "endDate" property');
    assert(Array.isArray(data.attendees), '"attendees" should be an array');

    console.log("testRequiredProperties passed");
}

// test to check attendee fields
function testAttendeeFields() {
    const data = generateRandomData(exampleSchema);

    data.attendees.forEach(attendee => {
        assert('userId' in attendee, 'Attendee missing "userId"');
        assert(typeof attendee.userId === 'number', 'Attendee "userId" should be a number');
        assert('access' in attendee, 'Attendee missing "access"');
        assert(['view', 'modify', 'sign', 'execute'].includes(attendee.access), 'Attendee "access" has invalid value');
    });

    console.log("testAttendeeFields passed");
}

// test for nullable fields
function testNullableFields() {
    const schemaWithNull = {
        type: "object",
        properties: {
            channelId: { "anyOf": [{ "type": "null" }, { "type": "integer" }] }
        }
    };
    const data = generateRandomData(schemaWithNull);
    assert(data.channelId === null || typeof data.channelId === 'number', '"channelId" should be null or a number');

    console.log("testNullableFields passed");
}

// run tests
try {
    testRequiredProperties();
    testAttendeeFields();
    testNullableFields();
    console.log("All tests passed!");
} catch (error) {
    console.error("Test failed:", error.message);
}
