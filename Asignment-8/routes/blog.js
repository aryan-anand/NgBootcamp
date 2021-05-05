const express = require('express')
const Blog = require('../models/blog')
const Review = require('../models/review')

const router = express.Router()


// Landing Page
router.get('/',async(req,res)=>{
    try{
        const blogs = await Blog.find({})
    res.render('blogs/landing',{ blogs })
    }
    catch(e){
        console.log(e)
        req.flash('error','Problem in Loading Page')
    }
    
})

// Starting REST
// Indexing all Blogs
router.get('/blogs',async (req,res)=>{
    try{
        const blogs = await Blog.find({})
        res.render('blogs/index',{ blogs })
        req.flash('success','Page Loaded Successfully')
    }
    catch(e){
        console.log(e)
        req.flash('error','Cannot load the Blogs')
        res.redirect('/error')
    }
    
})

// Showing a New Blog Page
router.get('/blogs/new',(req,res)=>{
    try{
        res.render('blogs/new')
    }
    catch(e){
        console.log(e)
        res.redirect('/error')
    }
    
})

// Uploading the new Blog into the Server
router.post('/blogs', async (req,res)=>{
    try{
        const blog = req.body
        await Blog.create(blog)
        req.flash('success','Created Successfully')
        res.redirect('/blogs')

    }
    catch(e){
        console.log(e)
        req.flash('error','Cannot Upload the Blog')
        res.redirect('/error')
    }

        
})

// Showing the Individual Blog
router.get('/blogs/:id',async (req,res)=>{
   try{
    const blog = await Blog.findById(req.params.id).populate('reviews')

    res.render('blogs/view',{ blog })   
   }
   catch(e){
       console.log(e)
       req.flash('error','Cannot show right now.')
       res.redirect('/error')
   }
})

// Showing Edit Window
router.get('/blogs/:id/edit', async (req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)

        res.render('blogs/edit',{ blog })
    }
    catch(e){
        console.log(e)
        req.flash('error','Cannot Edit the page.')
        res.redirect('/error')
    }
    
})

// Updating the editted Blog
router.patch('/blogs/:id', async (req,res)=>{
    try{
        await Blog.findByIdAndUpdate(req.params.id, req.body)
        req.flash('success','Blog has been edited successfully.')
        res.redirect(`/blogs/${req.params.id}`)
    }
    catch(e){
        console.log(e)
        req.flash('error','Cannot Edit the Page')
        res.redirect('/error')
    }
    
})

// Deleting the Blog
router.delete('/blogs/:id',async (req,res)=>{
    try{
        await Blog.findByIdAndDelete(req.params.id)
        req.flash('success','Blog deleted successfully.')
        res.redirect('/blogs')

    }
    catch(e){
        console.log(e)
        req.flash('error','Cannot Delete right Now.')
        res.redirect('/error')
    }
        
})


// Error Page
router.get('/error', (req,res)=>{
    res.status(500).render('error')
})

// Comment Section
router.post('/blogs/:id',async (req,res)=>{
    // console.log(req.body)
    // res.send('Hitting It')
    const blog = await Blog.findById(req.params.id)
    const review = new Review(req.body)

    blog.reviews.push(review)

    await review.save()
    await blog.save()

    res.redirect(`/blogs/${req.params.id}`)
})

module.exports = router