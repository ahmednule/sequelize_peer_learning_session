const { sequelize } = require('./models');
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello my people!');
});

app.post('/users', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await sequelize.models.user.create({name, email, password: hashedPassword});
        res.json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
});

app.post('/expenses', async (req, res) => {
    try{
        const {salary,  description} = req.body;
        const expenses = await sequelize.models.expenses.create({salary, description});
        res.json(expenses);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
});


app.get('/expenses', async (req, res) => {
    try{
        const expenses = await sequelize.models.expenses.findAll();
        res.json(expenses);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
});

app.get('/users', async (req, res) => {
    try{
        const users = await sequelize.models.user.findAll();
        res.json(users);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
});

app.delete('/expenses/:id', async (req, res) => {
    try{
        const {id} = req.params;        const expenses = await sequelize.models.expenses.destroy({where: {id}});
        res.json(expenses);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }

});

app.patch('/expenses/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {salary, description} = req.body;
        const expenses = await sequelize.models.expenses.update({salary, description}, {where: {id}});
        res.json(expenses);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
});


app.listen(port, () => {    
    console.log(`App  is running at http://localhost:${port}`);

    sequelize.authenticate().then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.log('Error connecting to database', error);
    })

});