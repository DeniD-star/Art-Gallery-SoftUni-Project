const Publication = require('../models/Publication');


async function getAllArts(){
    return Publication.find({}).lean()
}
async function createPublication(artData){
    const publication = new Publication(artData);

    return publication.save()
}
module.exports = {
    getAllArts,
    createPublication
   
}