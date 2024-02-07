/* const { createPostDB } = require("../controllers/postControllers")


//---ESTE handler CREA UN NUEVO TEMPERAMENTO Y LO ASOCIA A UN PERRO.--// 

const createPostHandler = async (req, res) => {
    const { name, dogId } = req.body

    try {
        const newPost = await createPostDB(name, dogId)
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    createPostHandler
} */