const User = require('../model/userSchema');

exports.getHomepage = (req, res) => {
    res.json(200, { message: 'Welcome to the homepage' });
};

exports.postCreateUser = async (req, res) => {
  
    const { username, email, password } = req.body;
    
    const user = await User.create({  
        username,
        email,
        password
    });
    res.status(201).json({ message: 'User created successfully', user });
};

exports.loginuser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: 'Please provide email and password' });
    }

   const user = await User.findOne({ email }).select("+password");

   if(!user) {
       res.status(404).json({error: "User not found"});
   }


   const isPasswordMatch = await user.comparePassword(password);
   
   if (!isPasswordMatch){
         return res.status(422).json({ error: 'Invalid email or password' });
   }

   res.status(200).json({ message: 'User logged in successfully', user });
}