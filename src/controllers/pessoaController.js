import { openDB } from "../dist/configDB.js"


export async function createTablePessoas() {
    const db = await openDB()
    try {
        await db.exec(`CREATE TABLE IF NOT EXISTS Pessoas (
            id INTEGER PRIMARY KEY NOT NULL, 
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(80),
            data_nascimento DATE,
            altura_estimada VARCHAR(10),
            peso_estimado VARCHAR(10),
            caracteristicas_fisicas VARCHAR(255),
            informacao_extra VARCHAR(255),
            residente_em VARCHAR(255),
            foto TEXT,
            data_desaparecimento DATE,
            local_desaparecimento VARCHAR(255)
        )`)
    } catch(error) {
        console.error('Não foi possível criar a tabela', error)
        throw error 
    } finally {
        await db.close()
    }
}


export async function selectPessoas(req, res) {
    const db = await openDB()
    let stmt = null

    try {
        stmt = await db.prepare('SELECT * FROM Pessoas ORDER BY data_desaparecimento DESC LIMIT 20')
        const pessoas = await stmt.all()
        return res.json(pessoas)
    } catch(error) {
        console.error('Erro ao selecionar pessoas:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}