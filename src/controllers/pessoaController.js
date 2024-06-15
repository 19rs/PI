import { openDB } from "../dist/configDB.js";

export async function createTablePessoas() {
  const db = await openDB();
  try {

        //await db.exec(`DROP TABLE IF EXISTS Pessoas`);

    await db.exec(`
    CREATE TABLE IF NOT EXISTS Pessoas (
            id INTEGER PRIMARY KEY NOT NULL, 
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(80) NOT NULL,
            data_nascimento DATE,
            idade INTEGER,
            genero VARCHAR(25) NOT NULL,
            olhos VARCHAR(25),
            altura VARCHAR(10),
            peso VARCHAR(10),
            cabelo VARCHAR(25),
            caracte VARCHAR(255),
            vestimentas VARCHAR(255),
            residente VARCHAR(255),
            foto TEXT,
            data_desaparecimento DATE ,
            local_desaparecimento VARCHAR(255),
            detalhes_desaparecimento VARCHAR(255),
            contato VARCHAR(255),
            status TINYINT(1) DEFAULT '0'
        )`);
  } catch (error) {
    console.error("Não foi possível criar a tabela", error);
    throw error;
  } finally {
    await db.close();
  }
}

export async function selectPessoas(req, res) {
  const db = await openDB();
  let stmt = null;
  
  const pagina = parseInt(req.query.pagina) || 1
  const limit = 20
  let offset = (pagina - 1) * limit

  let pessoas = null

  try {
    stmt = await db.prepare(
      "SELECT * FROM Pessoas WHERE status = 0 ORDER BY data_desaparecimento DESC LIMIT ? OFFSET ?"
    );
    pessoas = await stmt.all(limit, offset);

    // return res.json(pessoas);
  } catch (error) {
    console.error("Erro ao selecionar pessoas:", error);
    throw error;
  } finally {
    stmt ? await stmt.finalize() : null;
    // await db.close();
  }

  try {
    stmt = await db.prepare(
      "SELECT COUNT(*) AS contagem FROM Pessoas WHERE status = 0"
    );
    const resultado = await stmt.get();
    const totalPessoas = resultado.contagem;
    const totalPaginas = Math.ceil(totalPessoas / parseInt(limit))

    return res.json({pessoas, totalPaginas});
  } catch (error) {
    console.error("Erro ao selecionar pessoas:", error);
    throw error;
  } finally {
    stmt ? await stmt.finalize() : null;
    await db.close();
  }
}


export async function selectPessoa(req, res) {
 // let id = req.body.id;
  let id = req.params.id
  const db = await openDB();
  let stmt = null;

  try {
    stmt = await db.prepare("SELECT * FROM Pessoas WHERE id = @id");
    await stmt.bind({ "@id": id });
    const pessoa = await stmt.get();

    if (!pessoa) {
      res.send({ erro: "Pessoa não encontrada" });
    } else {
      return res.json(pessoa);
    }
  } catch (error) {
    console.error("Erro ao selecionar pessoa:", error);
    throw error;
  } finally {
    stmt ? await stmt.finalize() : null;
    await db.close();
  }
}


export async function filtrarPessoas(req, res) {
  const db = await openDB()
  let stmt = null

  const pagina = parseInt(req.query.pagina) || 1
  const limit = 20
  const offset = (pagina - 1) * limit
  let pessoas = null

  let sql = 'SELECT * FROM Pessoas WHERE status = 0'

  try {
      if(req.query.nome) {
          sql += ` AND nome LIKE '%${req.query.nome.trim()}%'`
      }

      if(req.query.local_desaparecimento) {
        sql += ` AND local_desaparecimento LIKE '%${req.query.local_desaparecimento.trim()}%'`
      }

      if(req.query.genero) {
        sql += ` AND genero LIKE '%${req.query.genero.trim()}%'`
      }

      if(req.query.idadeMin) {
        sql += ` AND DATE('NOW') - data_nascimento`

        req.query.idadeMax  ? sql += ` BETWEEN ${req.query.idadeMin} AND ${req.query.idadeMax}` : sql += ` >= ${ req.query.idadeMin}`
      } else if(req.query.idadeMax) {
        sql += ` AND DATE('NOW') - data_nascimento <= ${req.query.idadeMax}`
      }

      sql += ' ORDER BY data_desaparecimento DESC LIMIT ? OFFSET ?'
      
      stmt = await db.prepare(sql)
      pessoas = await stmt.all(limit, offset)

      // return res.json(pessoas)
  } catch(error) {
      console.error('Erro ao selecionar pessoas:', error)
      throw error
  } finally {
      stmt ? await stmt.finalize() : null
      // await db.close()
  }

  try {
    sql = sql.replace("SELECT *", "SELECT COUNT(*) AS contagem")
    sql = sql.replace("ORDER BY data_desaparecimento DESC LIMIT ? OFFSET ?", "")
    stmt = await db.prepare(sql);

    const resultado = await stmt.get();
    const totalPessoas = resultado.contagem;
    const totalPaginas = Math.ceil(totalPessoas / parseInt(limit))
    // console.log(sql)
    return res.json({pessoas, totalPaginas});
  } catch (error) {
    console.error("Erro ao selecionar o total de pessoas:", error);
    throw error;
  } finally {
    stmt ? await stmt.finalize() : null;
    await db.close();
  }
}


export async function insertPessoa(req, res) {
  const db = await openDB();
  let stmt = null;

  let pessoa = req.body;

  let uploadPath = "src/screens/img/pessoas/";
  pessoa.foto = "img/pessoas/SemFoto.png";

  if (req.files) {
    if (req.files.foto) {
      // fotoDesaparecido = `img/pessoas/${pessoa.nome.replaceAll(" ", "")}.png`
      let data = new Date();
      pessoa.foto = `img/pessoas/${
        pessoa.nome.replaceAll(" ", "") + data.getTime()
      }.png`;
      uploadPath = `src/screens/img/pessoas/${
        pessoa.nome.replaceAll(" ", "") + data.getTime()
      }.png`;

      req.files.foto.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
  }

  try {
    stmt = await db.prepare(
      `INSERT INTO Pessoas (nome, cpf, genero, olhos, altura,  data_nascimento, idade, peso, cabelo, caracte, vestimentas, residente, foto, data_desaparecimento, local_desaparecimento, detalhes_desaparecimento, contato) VALUES(@nome, @cpf, @genero, @olhos, @altura,@data_nascimento,@idade, @peso, @cabelo, @caracte, @vestimentas, @residente, @foto, @data_desaparecimento, @local_desaparecimento, @detalhes_desaparecimento, @contato)`
    );
    await stmt.bind({
      "@nome": pessoa.nome,
      "@cpf": pessoa.cpf,
      "@genero": pessoa.genero,
      "@olhos": pessoa.olhos,
      "@altura": pessoa.altura,
      "@data_nascimento": pessoa.data_nascimento,
      "@idade": pessoa.idade,
      "@peso": pessoa.peso,
      "@cabelo": pessoa.cabelo,
      "@caracte": pessoa.caracte,
      "@vestimentas": pessoa.vestimentas,
      "@residente": pessoa.residente,
      "@foto": pessoa.foto,
      "@data_desaparecimento": pessoa.data_desaparecimento,
      "@local_desaparecimento": pessoa.local_desaparecimento,
      "@detalhes_desaparecimento": pessoa.detalhes_desaparecimento,
      "@contato": pessoa.contato,
    });
    await stmt.run();

    res.status(201).json({ message: "Pessoa cadastrada com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar Pessoa:", error);
    throw error;
  } finally {
    stmt ? await stmt.finalize() : null;
    await db.close();
  }
}

export async function updatePessoa(req, res) {
  const db = await openDB();
  let stmt = null;

  const pessoa = req.body;

  let query = `UPDATE Pessoas SET nome = ?, genero = ?, olhos = ?, peso = ?, cabelo = ?, caracte = ?, vestimentas = ?, residente = ?, data_desaparecimento = ?, local_desaparecimento = ?, detalhes_desaparecimento = ?, contato = ?, data_nascimento = ? , altura = ?`;
  const params = [
    pessoa.nome,
    pessoa.genero,
    pessoa.olhos,
    pessoa.peso,
    pessoa.cabelo,
    pessoa.caracte,
    pessoa.vestimentas,
    pessoa.residente,
    pessoa.data_desaparecimento,
    pessoa.local_desaparecimento,
    pessoa.detalhes_desaparecimento,
    pessoa.contato,
    pessoa.data_nascimento,
    pessoa.altura
    
  ];


  query += ` WHERE id = ?`;
  params.push(pessoa.id);

  try {
    stmt = await db.prepare(query);
    await stmt.bind(params);
    await stmt.run();
    res.status(201).json({ message: "Pessoa atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar Pessoa:", error);
    res.status(500).json({ message: "Erro ao atualizar Pessoa" });
  } finally {
    stmt ? await stmt.finalize() : null;
    await db.close();
  }
}


export async function deletePessoa(req, res) {
  const db = await openDB();
  let stmt = null;
  const id = req.params.id;

  try {
    stmt = await db.prepare(`DELETE FROM Pessoas WHERE id = ?`);
    await stmt.bind([id]);
    await stmt.run();
    res.status(201).json({ message: "Pessoa deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar Pessoa:", error);
    throw error;
  } finally {
    stmt ? await stmt.finalize() : null;
    await db.close();
  }
}

//insertPessoa de outro jeito:
/*  
export async function insertPessoa(req, res) {
    const db = await openDB()
    let stmt = null
    
    const pessoa = req.body
    
    const colunas = []
    const valores = []
    let bind = {}

    for (const propriedade in pessoa) {
        colunas.push(propriedade);
        valores.push(`@${propriedade}`)
        bind[`@${propriedade}`] = pessoa[propriedade];
    }

    try {
        stmt = await db.prepare(`INSERT INTO Pessoas (${colunas.join(', ')}) VALUES (${valores.join(', ')})`)
        await stmt.bind(bind)
        await stmt.run()
        res.status(201).json({ message: 'Pessoa cadastrada com sucesso' })
    } catch(error) {
        console.error('Erro ao cadastrar Pessoa:', error)
        throw error
    } finally {
        stmt ? await stmt.finalize() : null
        await db.close()
    }
}
*/
