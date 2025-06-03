const { PrismaClient } = require("../../generated/prisma")
const prisma = new PrismaClient({})

exports.getAddBook = async (req, res) => {
    res.render("pages/addbook.twig", {user: req.session.user})
}

exports.postAddBook = async (req, res) => {
    try{
        const book = await prisma.book.create({
            data:{
                title: req.body.title,
                author: req.body.author,
                id_user: req.session.user.id
            }
        })
        res.redirect("/")
    }
    catch(error){
        res.render("pages/addbook.twig", {user: req.session.user})
    }
}