
const { UserModel } = require('./schema')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config();



const handleRegister = async (req, res) => {

    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email })

    if (user) {
        return res.send({ message: 'Email already exists' });
    }

    const HashPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserModel({
        name,
        email,
        password: HashPassword,
    });

    try {

        const dbRes = await UserModel.create(newUser)


        if (!dbRes) {
            return res.send({ message: 'Error creating user' });
        } else {

            const token = jwt.sign({
                id: dbRes._id,
                name: dbRes.name,
                email: dbRes.email,
            }, process.env.JWT_SECERT)

            res.send({
                message: 'User created successfully',
                token,
                data: dbRes
            });
            return;
        }

    } catch (error) {
        return res.send({ message: 'Error creating user' });
    }



}

const handleLogin = async (req, res) => {
    const { email, password } = req.query;

    try {

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.send({ message: 'Invalid Email' });
        }

        const isValid = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isValid) {
            return res.send({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECERT)


        res.send({
            message: 'Login Successful',
            token,
            data: {
                name: user.name,
                email: user.email,
            }
        });

        return;

    } catch (error) {
        return res.send({ message: 'Error logging in user' });
    }


}


module.exports = {
    handleRegister,
    handleLogin,


}
