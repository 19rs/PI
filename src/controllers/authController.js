import { openDB } from "../dist/configDB.js"


export async function createTableUsuarios() {
    const db = await openDB()
    try {
        await db.exec('CREATE TABLE IF NOT EXISTS Usuario (id INTEGER PRIMARY KEY, nome VARCHAR(255), email VARCHAR(255) UNIQUE, perfil TINYINT, senha VARCHAR(100))')
    } catch(error) {
        console.error('Erro ao criar a tabela:', error)
        throw error
    } finally {
        verificarAdmin()
    }
}


//depois ver como deixar o admin setado no DB
export async function verificarAdmin() {
    const db = await openDB()
    try {
        const result = await db.get('SELECT COUNT() AS Contagem FROM Usuario WHERE email="admin@email.com" AND senha="admin"')

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
    try {
        await db.run('INSERT INTO Usuario (nome, email, perfil, senha) VALUES (?, ?, ?, ?)', ['Admin', 'admin@email.com', 1, 'admin'])
        console.log('\nCadastro do Admin realizado com sucesso!\nEmail: admin@email.com\nSenha: admin')
    } catch(error) {
        console.error('Erro ao cadastrar Admin:', error)
        throw error
    } finally {
        db.close()
    }
}

//depois usar hash na senha
export async function logar(req, res) {
    const email = req.body.email
    const senha = req.body.senha

    const db = await openDB()

    try {
        const usuario = await db.get('SELECT id, nome, perfil FROM Usuario WHERE email=? AND senha=?', [email, senha])

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
        db.close()
    }
}