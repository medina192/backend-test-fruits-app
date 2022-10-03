const User = require('../models/User');
const bcrypt = require("bcrypt");

const CreateUser = async( req, res ) => {

    const { name, password, email } = req.body;


    try {
        const userExists = await User.findOne({ email });
        
        if(userExists)
        {
            return res.status(400).json({
                msg: 'The email already exists'
            })
        }

        const newUser = new User({
            name,
            email,
            password
        })

        const user = await newUser.save();

         res.json({
            user,
        });


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk with the administer'
        })
    }

}


const LogIn = async(req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if(!user)
        {
            return res.status(400).json({
                msg: 'The Email is not register'
            })
        }

        const hash = bcrypt.hashSync(password, 10);

        if( bcrypt.compareSync( hash, user.password) ) // the order matters
        {
            return res.status(401).json({
                message: "El email o contraseña son incorrectos"
            })
        }

        res.json({
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'El email o contraseña son incorrectos and update online'
        })
    }
}


const LogOut = async(req, res) => {

    const uid = req.body.userId;

    try {
        
        //await User.findOneAndUpdate({ _id: uid }, { new: true });
        
        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        return res.status(405).json({
            ok: false,
            msg: 'error set online to false'
        })
    }
}


module.exports = {
    CreateUser,
    LogIn,
    LogOut
}