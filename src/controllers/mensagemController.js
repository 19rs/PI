import { openDB } from "../dist/configDB.js"

export async function createTableMensagens() {
    const db = await openDB()
    try {
        //await db.exec(`DROP TABLE IF EXISTS Mensagens`);

        await db.exec(`CREATE TABLE IF NOT EXISTS Mensagens (
            id INTEGER PRIMARY KEY NOT NULL,
            data DATE NOT NULL,
            titulo VARCHAR(100) ,
            conteudo VARCHAR(255) NOT NULL)`)
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

export async function updateMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    let mensagem = req.body;

    try {
        let query = `UPDATE Mensagens SET data = ?, conteudo = ?`;
        const params = [mensagem.data, mensagem.conteudo, mensagem.id];
        
        if (mensagem.titulo && mensagem.titulo.length > 0) {
            query += `, titulo = ?`;
            params.splice(2, 0, mensagem.titulo); 
        }
     
        query += ` WHERE id = ?`;

        stmt = await db.prepare(query);
        await stmt.run(params);

        res.send({ message: 'Mensagem atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar mensagem:', error);
        res.send({ message: 'Erro ao atualizar mensagem' });
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}




export async function selectTitulo(req, res) {
    const  id = req.params.id; 
    const db = await openDB();
    let stmt = null;

    try {
        stmt = await db.prepare('SELECT titulo,conteudo FROM Mensagens WHERE id = ?');
        const mensagem = await stmt.get(id);

        if (!mensagem) {
            res.status(404).send({ erro: 'Mensagem não encontrada' });
        } else {
            res.json(mensagem);
        }
    } catch (error) {
        console.error('Erro ao selecionar mensagem:', error);
        res.status(500).send({ erro: 'Erro ao selecionar mensagem' });
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}


export async function insertMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    let mensagem = req.body;

    try {
        stmt = await db.prepare(`INSERT INTO Mensagens (data, titulo, conteudo) VALUES (?, ?, ?)`);
        await stmt.run(mensagem.data, mensagem.titulo, mensagem.conteudo);
        res.status(201).send({ message: 'Mensagem inserida com sucesso' });
    } catch (error) {
        console.error('Erro ao inserir mensagem:', error);
        res.status(500).send({ message: 'Erro ao inserir mensagem' });
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}


export async function deleteMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    const id = req.params.id;
  
    try {
        await db.run(`DELETE FROM Respostas_Respostas WHERE resposta_id IN (SELECT id FROM Respostas WHERE mensagem_id = ?)`, [id]);
        await db.run(`DELETE FROM Respostas WHERE mensagem_id = ?`, [id]);
        await db.run(`DELETE FROM Mensagens WHERE id = ?`, [id]);
        
        res.status(201).send({message: 'Excluido'}); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir a mensagem" });
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}
