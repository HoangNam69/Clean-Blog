const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        console.log(post);
        res.render('post', {detailPost: post});
    } catch (e) {
        console.log(e);
    }
}