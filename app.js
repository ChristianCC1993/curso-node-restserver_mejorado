
import dotenv from 'dotenv'; 
dotenv.config();       
import { Server } from './models/server.js';

//import pg from 'pg';
//const { Client } = pg

const server = new Server();

server.listen();

/*
const connectDb = async () => {
    const query = `SELECT * FROM "Tablas_node".usuarios u where u._id is not null`
    try {
        const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
        })

        await client.connect()
        const res = await client.query(query)
        console.log(res.rows[0])
        await client.end()
    } catch (error) {
        console.log(error)
    }
}

connectDb()
*/