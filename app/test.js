const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');
const { get } = require('express/lib/response');

mongoose.connect('mongodb://localhost:27017/clean_blog_test');


// Insert document into collection BlogPost
async function createBlogPost() {
    try {
        const blogPost = await BlogPost.create({
            title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
            body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. They’re full of old chestnuts like: “switch off lights when you leave a room” and “don’t leave appliances on standby”.'
        }); 
        console.log(blogPost);
    } catch (e) {
        console.log(e);
    }
}

// createBlogPost();

// Find all documents in collection BlogPost
async function getAllBlogPosts() {
    const blogPosts = await BlogPost.find({});
    console.log(blogPosts);
}

// getAllBlogPosts();

// Update document in collection BlogPost
async function updateBlogPost(id) {
    const blogPost = await BlogPost.findById(id);
    blogPost.title = 'Updated Title';
    blogPost.body = 'Updated Body';
    await blogPost.save();
    console.log(blogPost);
}

// updateBlogPost("6667b6996ea3ce917b3ffafe");

// Delete document in collection BlogPost
async function deleteBlogPost(id) {
    const result = await BlogPost.deleteOne({
        _id: id
    });
    console.log(result);
}

deleteBlogPost("6667b8d5ea7d975ed282136e");