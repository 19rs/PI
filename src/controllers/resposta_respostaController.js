import { openDB } from "../dist/configDB.js"


export async function createTableRespostas_Respostas() {
    const db = await openDB();
    try {

        //await db.exec(`DROP TABLE IF EXISTS Respostas_Respostas`);
        await db.exec(`CREATE TABLE IF NOT EXISTS Respostas_Respostas (
            id INTEGER PRIMARY KEY ,
            resposta_id INTEGER NOT NULL,
            conteudo TEXT NOT NULL,
            data DATE NOT NULL,
            FOREIGN KEY (resposta_id) REFERENCES Respostas(id)
        )`);
        console.log('Tabela respostas_R  sucesso.');
    } catch(error) {
        console.error('Erro ao criar a tabela Respostas_R:', error);
        throw error;
    } finally {
        await db.close();
    }
}

export async function createRespostaDaResposta(req, res) {
    const db = await openDB();
    let stmt = null;

    let respostaDaResposta = req.body;

    try {
        stmt = await db.prepare(`INSERT INTO Respostas_Respostas (resposta_id, conteudo,data) VALUES (?, ?, ?)`);
        await stmt.bind([respostaDaResposta.resposta_id, respostaDaResposta.conteudo,respostaDaResposta.data]);
        await stmt.run();

        res.status(201).json({ message: 'Resposta da resposta cadastrada com sucesso' });
    } catch(error) {
        console.error('Erro ao cadastrar Resposta da resposta:', error);
        res.status(500).json({ error: 'Erro ao cadastrar Resposta da resposta' });
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}


export async function getRespostasPorResposta(req, res) {
    const db = await openDB();
    let stmt = null;
    const id = req.params.id;

    try {
        stmt = await db.prepare("SELECT * FROM Respostas_Respostas WHERE resposta_id = ?");
        await stmt.bind(id);
        const respostasDaResposta = await stmt.all();

        if (respostasDaResposta.length === 0) {
            res.status(404).json({ message: "Não foram encontradas respostas para essa resposta" });
        } else {
            res.status(200).json(respostasDaResposta);
        }
    } catch (error) {
        console.error("Erro ao selecionar respostas por resposta:", error);
        res.status(500).json({ error: "Erro ao selecionar respostas por resposta" });
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}