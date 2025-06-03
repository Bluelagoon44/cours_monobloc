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

exports.deleteBook = async (req, res) => {
    try{
        const book = await prisma.book.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.redirect("/")
    }
    catch(error){
        res.redirect("/")
    }
}

exports.getUpdateBook = async (req, res) => {
    try{
        const book = await prisma.book.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        })
        
        res.render("pages/addbook.twig", {book})
    }
    catch(error){
        console.log(error);
        
        res.redirect("/")
    }
}

exports.postUpdateBook = async (req, res) => {
    try{
        const book = await prisma.book.update({
            where:{
                id:parseInt(req.params.id)
            },
            data:{
                title:req.body.title,
                author:req.body.author
            }
        })
        res.redirect("/")
    }
    catch(error){
        const book = await prisma.book.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.render("pages/addbook.twig", {book})
    }
}