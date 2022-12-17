const Publication = require('../models/Publication');


async function getAllArts(){
    return Publication.find({}).lean()
}
async function createPublication(artData){
    const publication = new Publication(artData);

    return publication.save()
}

async function getPublicationById(id){
    return Publication.findById(id).lean()
}
module.exports = {
    getAllArts,
    createPublication,
    getPublicationById
   
}