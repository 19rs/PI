import { openDB } from "../dist/configDB.js"

export async function createTableMensagens() {
    const db = await openDB()
    try {
        await db.exec(`CREATE TABLE IF NOT EXISTS Mensagens (
            id INTEGER PRIMARY KEY NOT NULL,
            autor_id INT NOT NULL,
            data DATE NOT NULL,
            titulo VARCHAR(100) NOT NULL,
            conteudo VARCHAR(255) NOT NULL,
            FOREIGN KEY (autor_id) REFERENCES Usuarios (id) ON DELETE CASCADE
        )`)
    } catch(error) {
        console.error('Não foi possível criar a tabela:', error)
        throw error
    } finally {
        await db.close()
    }
}

//depois fazer paginação
export async function selectMensagens(req, res) {
    const db = await openDB()
    let stmt = null

    try {
        stmt = await db.prepare('SELECT * FROM Mensagens ORDER BY data DESC LIMIT 20')
        const mensagens = await stmt.all()
        return res.json(mensagens)
    } catch(error) {
        console.error('Erro ao seleconar as mensagens:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}

export async function selectMensagem(req, res) {
    let id = req.body.id
    const db = await openDB()
    let stmt = null

    try {
        stmt = await db.prepare('SELECT * FROM Mensagens WHERE id = @id')
        await stmt.bind({ '@id': id })
        const mensagem = await stmt.get()

        if(!mensagem) {
            res.send({erro: 'Mensagem não encontrada'})
        } else {
            return res.json(mensagem)
        }
    } catch(error) {
        console.error('Erro ao selecionar mensagem:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}
