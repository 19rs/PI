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
            visualizacoes INT DEFAULT 0,
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

        updateViewsMensagem();
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

export async function insertMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    
    const mensagem = req.body;

    try {
        stmt = await db.prepare('INSERT INTO Mensagens (autor_id, data, titulo, conteudo) VALUES(@autor_id, @data, @titulo, @conteudo)')
        await stmt.bind({
            "@autor_id": mensagem.autor_id,
            "@data": mensagem.data,
            "@titulo": mensagem.titulo,
            "@conteudo": mensagem.conteudo
        });
        await stmt.run();

        res.status(201).json({ message: "Mensagem cadastrada com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar Mensagem:", error);
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}

export async function updateViewsMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    
    const id = req.id;
    const visualizacoes = req.visualizacoes;

    try {
        stmt = await db.prepare("UPDATE Mensagens SET visualizacoes = ? WHERE id = ?");
        await stmt.bind([
            visualizacoes++,
            id
          ]);
          await stmt.run();
          res.status(201).json({ message: "Número de visualizações atualizado com sucesso" });
    } catch (error) {
        console.log("Erro ao atualizar numero de visualizações:", error);
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}

//Verificar se o autor da mensagem é quem for editar/deletar (ou se é admin)