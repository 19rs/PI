import { openDB } from "../dist/configDB.js"


export async function createTableUsuarios() {
    const db = await openDB()
    try {
        await db.exec(`CREATE TABLE IF NOT EXISTS Usuarios (
            id INTEGER PRIMARY KEY NOT NULL, 
            nome VARCHAR(255) NOT NULL, 
            email VARCHAR(255) UNIQUE NOT NULL, 
            username VARCHAR(80), 
            perfil TINYINT NOT NULL, 
            senha VARCHAR(100) NOT NULL
        )`)
    } catch(error) {
        console.error('Erro ao criar a tabela:', error)
        throw error
    } finally {
        verificarAdmin()
    }
}


//depois ver como deixar o admin setado no DB
//passar pelo db mesmo?
export async function verificarAdmin() {
    try {
        const db = await openDB()
        const result = await db.get('SELECT COUNT() AS Contagem FROM Usuarios WHERE email="admin@email.com" AND senha="admin"')

        if(result.Contagem != 1) {
            await cadastrarAdmin(db)
        } else {
            console.log('\nAdmin já cadastrado!\nEmail: admin@email.com\nSenha: admin')
            db.close()
        }
    } catch(error) {
        console.error('Erro ao verificar Cadastro Admin:', error)
        throw error
    }
}


export async function cadastrarAdmin(db) {
    let stmt = null

    try {
        stmt = await db.prepare('INSERT INTO Usuarios (nome, email, username, perfil, senha) VALUES (@nome, @email, @username, @perfil, @senha)')
        await stmt.bind({ '@nome': 'Admin', '@email': 'admin@email.com', '@username': 'Admin Sistema', '@perfil': 1, '@senha': 'admin' })
        await stmt.run()
        console.log('\nCadastro do Admin realizado com sucesso!\nEmail: admin@email.com\nSenha: admin')
    } catch(error) {
        console.error('Erro ao cadastrar Admin:', error)
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
            res.send({erro: 'Credenciais inválidas'});
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
