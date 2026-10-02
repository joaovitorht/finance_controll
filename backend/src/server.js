const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

app.get('/api/health', async (req, res) => {
    try{
        const result = await pool.query('SELECT NOW()');

        res.json({
            status:'ok',
            message: 'finance control api funcionandop',
            database: 'conected',
            time: result.rows[0].now
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'erro ao conectar ao banco'
        });
    }
});

app.listen(PORT, () =>{
    console.log(`servidor rodando na porta ${PORT}`);
})