const { PrismaClient } = require("../../generated/prisma")
const hashPasswordExtension = require("../services/extensions/hashPasswordExtension")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient({}).$extends(hashPasswordExtension)

exports.getRegister = async (req, res) => {
    res.render('pages/register.twig') 
}

exports.postRegister = async (req, res) => {
    try{
        if(req.body.password === req.body.confirmPassword){
            const user = await prisma.user.create({
                data:{
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mail: req.body.mail,
                    password: req.body.password
                }
            })
            res.redirect("/login")
        }
        else throw ({confirmPassword : "Veuillez renseigner des mots de passe identiques"})
    }
    catch(error){
        res.render('pages/register.twig', {error})
    }
}

exports.getLogin = async (req, res) => {
    res.render('pages/login.twig')
}

exports.postLogin = async (req, res) => {
    try{    
        const user = await prisma.user.findUnique({
            where: {
                mail: req.body.mail
            }
        })
        if(user){
            if(await bcrypt.compare(req.body.password, user.password)){
                req.session.user = user
                res.redirect("/")
            }
            else throw {password : "Mot de passe incorrect"}
        }
        else throw {mail: "Email incorrect"}
    }
    catch(error){
        res.render("pages/login.twig", {error})
    }
}

exports.getLogout = (req, res) => {
    req.session.destroy();
    res.redirect("/login")
}