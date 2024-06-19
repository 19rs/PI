import { openDB } from "../dist/configDB.js"

//mudar nome para tópicos?
export async function createTableMensagens() {
    const db = await openDB()
    try {
        await db.exec(`CREATE TABLE IF NOT EXISTS Mensagens (
            id INTEGER PRIMARY KEY NOT NULL,
            autor_id INT NOT NULL,
            data_postagem TEXT NOT NULL,
            titulo VARCHAR(100) NOT NULL,
            conteudo VARCHAR(255) NOT NULL,
            data_atualizacao TEXT NOT NULL,
            FOREIGN KEY (autor_id) REFERENCES Usuarios (id) ON DELETE CASCADE
        )`)
    } catch(error) {
        console.error('Não foi possível criar a tabela:', error)
        throw error
    } finally {
        await db.close()
    }
}

export async function createTableRespostas() {
    const db = await openDB()
    
    try {
        await db.exec(`CREATE TABLE IF NOT EXISTS Respostas (
            id INTEGER PRIMARY KEY NOT NULL,
            autor_id INT NOT NULL,
            mensagem_id INT NOT NULL,
            conteudo TEXT NOT NULL,
            data_postagem TEXT NOT NULL,
            data_atualizacao TEXT NOT NULL,
            resposta_id INT DEFAULT NULL,
            FOREIGN KEY (autor_id) REFERENCES Usuarios (id) ON DELETE CASCADE,
            FOREIGN KEY (mensagem_id) REFERENCES Mensagens (id) ON DELETE CASCADE,
            FOREIGN KEY (resposta_id) REFERENCES Respostas (id) ON DELETE CASCADE
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
        // stmt = await db.prepare('SELECT * FROM Mensagens ORDER BY data_postagem DESC LIMIT 20')
        stmt = await db.prepare(`SELECT m.id, m.data_postagem, m.data_atualizacao, m.titulo, m.conteudo, m.autor_id, u.nome AS nome_autor, u.username AS username_autor, u.perfil AS perfil_autor, COUNT(r.id) AS respostas  FROM Mensagens m 
        INNER JOIN Usuarios u 
        ON u.id = m.autor_id 
        LEFT JOIN Respostas r 
        ON r.mensagem_id = m.id 
        GROUP BY m.id
        ORDER BY m.data_atualizacao DESC;`)
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
    let id = req.params.id
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

        // updateViewsMensagem()
    }
}

export async function insertMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    // const data = new Date().toISOString().split("T")[0];
    const timeElapsed = Date.now();
    const data = new Date(timeElapsed)

    const mensagem = req.body;

    try {
        stmt = await db.prepare('INSERT INTO Mensagens (autor_id, data_postagem, titulo, conteudo, data_atualizacao) VALUES(@autor_id, @data_postagem, @titulo, @conteudo, @data_atualizacao)')
        await stmt.bind({
            "@autor_id": mensagem.autor_id,
            "@data_postagem": data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            "@titulo": mensagem.titulo,
            "@conteudo": mensagem.conteudo,
            "@data_atualizacao": data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
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

export async function updateMensagem(req, res) {
    console.log('atuaaaalizando')
    const db = await openDB();
    let stmt = null;
    
    const timeElapsed = Date.now();
    const data = new Date(timeElapsed)

    const mensagem = req.body;

    try {
        stmt = await db.prepare(`UPDATE Mensagens SET titulo = ?, conteudo = ?, data_atualizacao = ? WHERE id = ?`)
        await stmt.bind([
            mensagem.titulo,
            mensagem.conteudo,
            data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            mensagem.id
        ]);
        await stmt.run();

        res.status(201).json({ message: "Mensagem atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar Mensagem:", error);
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}

// export async function updateViewsMensagem(req, res) {
//     const db = await openDB();
//     let stmt = null;
    
//     const id = req.id;
//     const visualizacoes = req.visualizacoes;

//     try {
//         stmt = await db.prepare("UPDATE Mensagens SET visualizacoes = ? WHERE id = ?");
//         await stmt.bind([
//             visualizacoes++,
//             id
//           ]);
//           await stmt.run();
//           res.status(201).json({ message: "Número de visualizações atualizado com sucesso" });
//     } catch (error) {
//         console.log("Erro ao atualizar numero de visualizações:", error);
//         throw error;
//     } finally {
//         stmt ? await stmt.finalize() : null;
//         await db.close();
//     }
// }

//Depois verificar se o autor da mensagem é quem for editar/deletar (ou se é admin)

export async function deleteMensagem(req, res) {
    const db = await openDB();
    let stmt = null;
    const id = req.params.id;
  
    try {
        await db.run(`DELETE FROM Mensagens WHERE id = ?`, [id]);
        
        res.status(201).send({message: 'Mensagem Excluída'}); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir a mensagem" });
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}

export async function selectRespostas(req, res) {
    const db = await openDB()
    let stmt = null
    let mensagem_id = req.params.mensagem_id

    try {
        stmt = await db.prepare(`SELECT r.id, r.conteudo, quote.conteudo AS citacao_conteudo, u2.nome AS citacao_autor,  quote.data_postagem AS citacao_data, r.data_postagem, r.autor_id, r.resposta_id, u.nome as nome_autor, u.username as username_autor FROM Respostas r 
        INNER JOIN Usuarios u
        ON r.autor_id = u.id
        LEFT JOIN Respostas quote 
        ON r.resposta_id = quote.id
        LEFT JOIN Usuarios u2 
        ON quote.autor_id = u2.id
        WHERE r.mensagem_id = @mensagem_id`) 
        await stmt.bind({ '@mensagem_id': mensagem_id })
        const respostas = await stmt.all()
        return res.json(respostas)
    } catch(error) {
        console.error('Erro ao seleconar as respostas:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}


export async function deleteResposta(req, res) {
    const db = await openDB();
    let stmt = null;
    const id = req.params.id;
  
    try {
        await db.run(`DELETE FROM Respostas WHERE id = ?`, [id]);
        
        res.status(201).send({message: 'Resposta Excluída'}); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir a resposta" });
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}

export async function insertResposta(req, res) {
    const db = await openDB();
    let stmt = null;
    
    const timeElapsed = Date.now();
    const data = new Date(timeElapsed)

    const resposta = req.body;

    let resposta_id = resposta.resposta_id

    console.log(resposta)
    console.log(resposta_id)

    try {
        stmt = await db.prepare('INSERT INTO Respostas (autor_id, data_postagem, data_atualizacao, mensagem_id, conteudo, resposta_id) VALUES(@autor_id, @data_postagem, @data_atualizacao, @mensagem_id, @conteudo, @resposta_id)')
        await stmt.bind({
            "@autor_id": resposta.autor_id,
            "@data_postagem": data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            "@data_atualizacao": data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            "@mensagem_id": resposta.mensagem_id,
            "@conteudo": resposta.conteudo,
            "@resposta_id": resposta_id
        });
        await stmt.run();

        await atualizarDataRespostaMensagem(data, resposta.mensagem_id)
        res.status(201).json({ message: "Resposta cadastrada com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar Resposta:", error);
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}


export async function atualizarDataRespostaMensagem(data_resposta, mensagem_id) {
    console.log('Mensagem teve uma nova Resposta')
    const db = await openDB();
    let stmt = null;

    try {
        stmt = await db.prepare(`UPDATE Mensagens SET data_atualizacao = ? WHERE id = ?`)
        await stmt.bind([
            data_resposta.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            mensagem_id
        ]);
        await stmt.run();

        // return json({ message: "Mensagem atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar Mensagem:", error);
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}


export async function selectResposta(req, res) {
    let id = req.params.id
    const db = await openDB()
    let stmt = null

    try {
        stmt = await db.prepare('SELECT * FROM Respostas WHERE id = @id')
        await stmt.bind({ '@id': id })
        const resposta = await stmt.get()

        if(!resposta) {
            res.send({erro: 'Resposta não encontrada'})
        } else {
            return res.json(resposta)
        }
    } catch(error) {
        console.error('Erro ao selecionar Resposta:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}


export async function updateResposta(req, res) {
    console.log('atuaaaalizando resposta')
    const db = await openDB();
    let stmt = null;
    
    const timeElapsed = Date.now();
    const data = new Date(timeElapsed)

    const resposta = req.body;
console.log('resposta')
console.log(resposta)
    try {
        stmt = await db.prepare(`UPDATE Respostas SET conteudo = ? WHERE id = ?`)
        await stmt.bind([
            resposta.conteudo,
            resposta.id
        ]);
        await stmt.run();

        await atualizarDataRespostaMensagem(data, resposta.mensagem_id)
        res.status(201).json({ message: "Resposta atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar Resposta:", error);
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}
