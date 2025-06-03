const express = require("express")
const userRoutes = require("./src/routes/userRoutes");
const mainRoutes = require("./src/routes/mainRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const session = require("express-session");

const app = express();
app.set('views', './src/views')
app.use(express.static("./public"))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'yolowillsurvive',
    resave: true,
    saveUninitialized: true
}))
app.use(userRoutes)
app.use(mainRoutes)
app.use(bookRoutes)

app.listen(3000, ()=>{
    console.log("Écoute sur le port 3000");
})