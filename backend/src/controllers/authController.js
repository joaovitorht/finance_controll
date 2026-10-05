const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')

const register = async(req, res)=>{
    try{
        const{name, email, password} = req.body;

        if(!name || !email || !password){
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

       const hashedPassword = await bcrypt.hash(password, 10);
       const user = await userModel.createUser( name, email, hashedPassword);
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

const login = async(req, res)=>{
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:' Email e senha são obrigatorios!'
            });
        }

        const user = await userModel.findUserByEmail(email);

        if(!email){
            return res.status(401).json({
                message:'Usuario nao encontrado'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({
                message:' Senha incorreta'
            });
        }

        return res.status(200).json({
            message:'Login realizado com sucesso!',
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error){
        console.log('erro ao tentar logar');

        return res.status(500).json({
                    message:'erro interno no servidor '
                })
    }
}

module.exports = {
    register,
    login
};