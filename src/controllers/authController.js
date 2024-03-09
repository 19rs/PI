import { openDB } from "../dist/configDB.js"


export async function createTableUsuarios() {
    const db = await openDB()
    try {
        await db.exec(`CREATE TABLE IF NOT EXISTS Usuarios (
            id INTEGER PRIMARY KEY NOT NULL, 
            nome VARCHAR(255) NOT NULL, 
            email VARCHAR(255) UNIQUE NOT NULL, 
            username VARCHAR(80), 
            perfil TINYINT  NULL, 
            senha VARCHAR(100) NOT NULL
        )`)
    } catch(error) {
        console.error('Erro ao criar a tabela:', error)
        throw error
    } finally {
        db.close()
    }
}



export async function insertUsuario(req, res) {
    const db = await openDB();
    let stmt = null;

    let pessoa = req.body;

    try {
        stmt = await db.prepare(`INSERT INTO Usuarios (nome, email, username, perfil, senha) VALUES(@nome, @email, @username,@perfil, @senha)`);
        await stmt.bind({ '@nome': pessoa.nome, '@email': pessoa.email, '@username': pessoa.username, '@perfil':pessoa.perfil, '@senha': pessoa.senha });
        await stmt.run();

        res.status(201).json({ message: 'Usuario cadastrada com sucesso' });
    } catch(error) {
        console.error('Erro ao cadastrar Usuario:', error);
        throw error;
    } finally {
        stmt ? await stmt.finalize() : null;
        await db.close();
    }
}


export async function selectUsuario(req, res) {
    const db = await openDB()
    let stmt = null

    try {
        stmt = await db.prepare('SELECT * FROM Usuarios  DESC LIMIT 20')
        const pessoas = await stmt.all()
        return res.json(pessoas)
    } catch(error) {
        console.error('Erro ao selecionar Usuarios:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}



//depois usar hash na senha
export async function logar(req, res) {
    const email = req.body.email
    const senha = req.body.senha

    const db = await openDB()
    let stmt = null

    try {
        stmt = await db.prepare('SELECT * FROM Usuarios WHERE email = @email AND senha = @senha')
        await stmt.bind({ '@email': email, '@senha': senha })
        const usuario = await stmt.get()

        if(!usuario) {
            res.send({erro: 'Credenciais inválidas'})
        } else {
            res.send({
                sucesso: 'Login bem sucedido',
                userID: usuario.id,
                userProfile: usuario.perfil
            });
        }
    } catch(error) {
        console.error('Erro ao realizar o login:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}
