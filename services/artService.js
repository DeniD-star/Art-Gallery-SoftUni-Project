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
async function editPublication(id, newData){
    const publication = await Publication.findById(id);

    publication.title = newData.title;
    publication.paintingTec = newData.paintingTec;
    publication.picture = newData.picture;
    publication.certificate = newData.certificate;
    
   return publication.save();
   

}
module.exports = {
    getAllArts,
    createPublication,
    getPublicationById,
    editPublication
   
}