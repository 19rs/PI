import sqlite3 from "sqlite3"
import { open } from "sqlite"


export async function openDB() {
    const db = await open({
        filename: 'src/pi.db',
        driver: sqlite3.Database
    });
    
    await db.exec('PRAGMA foreign_keys = ON;');

    return db;
}