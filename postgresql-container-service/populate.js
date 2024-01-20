const { Client } = require('pg');

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

async function main() {
    await client.connect();

    await client.query(`
        CREATE TABLE IF NOT EXISTS users
        (
            id    SERIAL PRIMARY KEY,
            name  VARCHAR(50),
            email VARCHAR(50)
        )
    `);

    await client.query(`
        INSERT INTO users (name, email)
        VALUES ('John Doe', 'john.doe@example.com'),
               ('Jane Doe', 'jane.doe@example.com')
    `);

    const res = await client.query('SELECT * FROM users');
    console.log(res.rows);

    await client.end();
}

main().catch(console.error);