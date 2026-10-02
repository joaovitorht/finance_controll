const userModel = require('../models/userModel');

const register = async(req, res)=>{
    try{
        const{name, email, password} = req.body;

        if(!name || !password || !password){
            return res.status(400).json({
                message: 'Nome, email e senha sao obrigatorios'
            });
        }

        const existingUser = await userModel.findUserByEmail(email);
        if(existingUser){
            return res.status(409).json({
                message:'email ja cadastrado'
            });
        }

        const user = await userModel.createUser(name, email, password);
        return res.status(201).json({
            message:'usuario criado com sucesso', user
        });

    } catch(error){
        console.log('erro ao registrar email', error);

        return res.status(500).json({
            message:'erro interno no servidor '
        })
    }
};

module.exports = {
    register
};