// including express
const express = require('express');

// including path to use path module features
const path = require('path');

// including uuid to use uuid module features to generate unique id
const { v4: uuidv4} = require('uuid');

// including module to receive http requests like put, patch, or delete
const methodOverride = require('method-override');

// initialiazing app
const app = express();

// setting port num
const port = 8080;


// midleware to parse url encoded data
app.use(express.urlencoded({extended:true}));

// midleware TO OVERRIDE METHODS REQUEST
app.use(methodOverride('_method'));

// setting view engine and path for views
app.set('view-engine','ejs');
app.set('views',path.join(__dirname,'/views'));

// middleware to setting public and path for public
app.use(express.static(path.join(__dirname,'/public/CSS')));

// post storing array
let posts = [
    {
        id : uuidv4(),
        username : 'Kumar',
        content : 'I love coding'
    },
    {
        id : uuidv4(),
        username : 'Maurya',
        content : 'I love you coding'
    },
    {
        id : uuidv4(),
        username : 'Pradeep',
        content : 'I love You very much coding'
    }
];

// route for getting all posts
app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
});


// route to render form to add new post
app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
});

// route to handle new post data
app.post('/posts',(req,res)=>{
    // console.log(req.body);
    let id = uuidv4();
    let { username , content} = req.body;
    posts.push({id, username,content});

    /* redirecting to /posts 
       after updating or pushing data 
       to database or array in this case */
    res.redirect('/posts');
});

// route to handle display specifie post based on id
app.get('/posts/:id',(req,res)=>{
    let { id } = req.params;

    let post = posts.find((p)=>{
        return (id === p.id);
    });
    res.render('show.ejs',{post});
});

// route to handle edit request
app.get('/posts/:id/edit',(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>{
        return (id === p.id);
    });

    res.render('edit.ejs', { post });
});

// route to update our specific post
app.patch('/posts/:id',(req,res)=>{
    let { id } = req.params;
    // console.log(id);
    let post = posts.find((p)=>{
        return (id === p.id);
    });
    // update partial data of post
    post.content = req.body.content;
    // redirect to /posts after updating data
    res.redirect('/posts');
});



// ROUTE TO HANDLE DELETE REQUEST
app.delete('/posts/:id',(req,res)=>{
    let { id } = req.params;
    /* filter all elements and remove specific 
       related post */
    posts = posts.filter((p)=>{
        return (id !== p.id);
    });
    // redirecting to /posts
    res.redirect('/posts');
});


// listening server on port 8080
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})