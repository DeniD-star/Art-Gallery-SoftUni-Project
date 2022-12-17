const User = require('../models/User');

async function createUser( username, address, hashedPassword){
    const user = new User({
        username,
        address,
        hashedPassword,
        myPublications: []
    })

    await user.save();
    console.log(user);
    return user;
}

async function getUserByUsername(username){
    const pattern = new RegExp(`^${username}$`, 'i')
    const user = await User.findOne({username: {$regex: pattern}});
    return user;
}


module.exports = {
    createUser,
    getUserByUsername,
   
}