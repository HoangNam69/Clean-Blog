module.exports = (req, res, next) => {
    console.log("Files: " + JSON.stringify(req.files) + "Body: " + JSON.stringify(req.body));
    if (req.files == null || req.body.title == null || req.body.body == null) {
        return res.redirect('/posts/new');
    }
    next();
};