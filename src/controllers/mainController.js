exports.getHome = async (req, res) => {
    res.render("pages/home.twig", {user: req.session.user})
}