import { openDB } from "../dist/configDB.js"


export async function createTableRespostas() {
    const db = await openDB();
    try {

        //await db.exec(`DROP TABLE IF EXISTS Respostas`);
        await db.exec(`CREATE TABLE IF NOT EXISTS Respostas (
            id INTEGER PRIMARY KEY ,
            mensagem_id INTEGER NOT NULL,
            data DATE NOT NULL,
            conteudo TEXT NOT NULL,
            FOREIGN KEY (mensagem_id) REFERENCES Mensagens(id) 
        )`);
        console.log('Tabela respostas  sucesso.');
    } catch(error) {
        console.error('Erro ao criar a tabela Respostas:', error);
        throw error;
    } finally {
        await db.close();
    }
}


export async function createResposta(req, res) {
    const db = await openDB();
    let stmt = null;

    let resposta = req.body;

    try {
        stmt = await db.prepare(`INSERT INTO Respostas (mensagem_id, data , conteudo) VALUES (? ,?, ?)`);
        await stmt.bind([resposta.mensagem_id, resposta.data , resposta.conteudo]);
        await stmt.run();

        res.status(201).json({ message: 'Resposta cadastrada com sucesso' });
    } catch(error) {
        console.error('Erro ao cadastrar Resposta:', error);
        res.status(500).json({ error: 'Erro ao cadastrar Resposta' });
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}






export async function getRespostasPorMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    const id = req.params.id;
   
    try {
   
        stmt = await db.prepare("SELECT * FROM Respostas WHERE mensagem_id = ? ORDER BY data DESC");
        await stmt.bind(id);
        const respostas = await stmt.all();

        if (respostas.length === 0) {
            res.status(404).json({ message: "Não foram encontradas respostas para essa mensagem" });
        } else {
            res.status(200).json(respostas);
        }
    } catch (error) {
        console.error("Erro ao selecionar respostas por mensagem:", error);
        res.status(500).json({ error: "Erro ao selecionar respostas por mensagem" });
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}



    export async function deleteResposta(req, res) {
        const { id } = req.params;
        const db = await openDB();
        try {
            await db.run(`DELETE FROM Respostas WHERE id = ?`, [id]);
            await db.run(`DELETE FROM Respostas_Respostas WHERE resposta_id = ?`, [id]);
            res.status(200).json({ message: 'Resposta deletada com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar resposta:', error);
            res.status(500).json({ message: 'Erro ao deletar resposta' });
        } finally {
            await db.close();
        }
    }

