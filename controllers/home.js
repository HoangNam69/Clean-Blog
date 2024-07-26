const BlogPost = require('../models/BlogPost.js');
module.exports = async (req, res) => {
    try {
       const posts = await BlogPost.find({});
        // console.log(allBlogPost)
        // console.log(req.session)
        res.render('index', {blogposts: posts});
    } catch (e) {
        console.log(e);
    }
}
