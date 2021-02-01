const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json('wrong username or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('wrong username or password');
        }
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.cookie('jwt', token, {
            httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            username,
            userId: user._id
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json('server error');
    }
}
const signUp = async (req, res) => {
    try {
        const {username, password} = req.body;
        const candidate = await User.findOne({username});
        if (candidate) {
            return res.status(400).json('username already taken');
        }
        const hashedPass = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            password: hashedPass
        });
        await user.save();
        return res.status(200).json('signup success');
    } catch (err) {
        console.log(err);
        return res.status(500).json('server error');
    }
}

const signOut = (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json();
    }catch (err){
        console.log(err);
        return res.status(500).json('server error');
    }
}


module.exports = {
    signIn,
    signUp,
    signOut
}