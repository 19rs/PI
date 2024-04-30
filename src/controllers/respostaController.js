import { openDB } from "../dist/configDB.js"



export async function createTableRespostas() {
    const db = await openDB()
    
    try {
        await db.exec(`CREATE TABLE IF NOT EXISTS Respostas (
            id INTEGER PRIMARY KEY NOT NULL,
            autor_id INT NOT NULL,
            mensagem_id INT NOT NULL,
            conteudo TEXT NOT NULL,
            data_postagem DATE NOT NULL,
            FOREIGN KEY (autor_id) REFERENCES Usuarios (id) ON DELETE CASCADE,
            FOREIGN KEY (mensagem_id) REFERENCES Mensagens (id) ON DELETE CASCADE
        )`)
    } catch(error) {
        console.error('Não foi possível criar a tabela:', error)
        throw error
    } finally {
        await db.close()
    }
}

export async function selectRespostas() {
    
}