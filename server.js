const express = require('express')
const cors = require('cors');

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

//GET Usuários
app.get('/users', async (req, res) => {
    
    // const users = [
    //     { id: 1, name: 'Maria' },
    //     { id: 2, name: 'João' },
    //     { id: 3, name: 'Aline' },
    //     { id: 4, name: 'Alfredo' },
    // ];

    setTimeout(async () => {
        const limit = +req.query.limit || 10;
        // const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        
        const users = await response.json();
    
        res.send(`
            <h1 class="text-2xl font-bold my-4">Usuários</h1>
            <ul>
                ${users.map((user) => `<li>${user.name}</li>`).join('')}
            </ul>
        `);
    }, 1000);
});

app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000');
});