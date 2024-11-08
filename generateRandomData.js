const exampleSchema = require('./schema.json');

function generateRandomData(schema) {
    if (schema.type === 'object') {
        const obj = {};
        for (const key in schema.properties) {
            const property = schema.properties[key];
            if (property) {
                obj[key] = generateRandomData(property);
            }
        }
        return obj;
    }

    if (schema.type === 'array') {
        // generate between 1 and 3 items
        const length = Math.floor(Math.random() * 3) + 1;
        return Array.from({ length }, () => generateRandomData(schema.items)).filter(item => item !== null);
    }

    if (schema.type === 'integer') {
        // generate an integer between 0 and 99
        return Math.floor(Math.random() * 100);
    }

    if (schema.type === 'string') {
        if (schema.pattern) {
            // generate a URL if pattern is required
            return "https://example.corezoid.com/api/1/json/public/12345/abcdef";
        }
        // generate a random string
        return Math.random().toString(36).substring(7);
    }

    if (schema.type === 'boolean') {
        return Math.random() < 0.5;
    }

    if (schema.enum) {
        const index = Math.floor(Math.random() * schema.enum.length);
        return schema.enum[index];
    }

    if (schema.anyOf) {
        const validSchemas = schema.anyOf.filter(option => option.type !== 'null');
        const chosenSchema = validSchemas[Math.floor(Math.random() * validSchemas.length)];
        return generateRandomData(chosenSchema);
    }

    if (schema.type === 'null') {
        return null;
    }

    return null;
}

const randomData = generateRandomData(exampleSchema);
console.log(randomData);

module.exports = { generateRandomData };
