const router= require ('express').Router()
const books= require ('../models/books.js')
const db= require('../models')
//Seed
router.get("/seed", (req, res) => {
  books.insertMany([
    {
      title: "The Shinobi Initiative",
      description:
        "The reality-bending adventures of a clandestine service agency in the year 2166",
      year: 2014,
      quantity: 10,
      imageURL: "https://imgur.com/LEqsHy5.jpeg",
    },
    {
      title: "Tess the Wonder Dog",
      description: "The tale of a dog who gets super powers",
      year: 2007,
      quantity: 3,
      imageURL: "https://imgur.com/cEJmGKV.jpg",
    },
    {
      title: "The Annals of Arathrae",
      description:
        "This anthology tells the intertwined narratives of six fairy tales.",
      year: 2016,
      quantity: 8,
      imageURL: "https://imgur.com/VGyUtrr.jpeg",
    },
    {
      title: "Wâˆ€RP",
      description:
        "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
      year: 2010,
      quantity: 4,
      imageURL: "https://imgur.com/qYLKtPH.jpeg",
    },
  ])
    .then(
      res.status(200).json({
        message: "Seed successful",
      })
    )
    .catch(
      res.status(400).json({
        message: "Seed unsuccessful",
      })
    );
});

//Index
router.get('/', (req,res)=>{
books.find()
.limit(40)
.then (foundBooks=>{
res.json('',{
    books: foundBooks,
    title: 'Books Title'
})
.catch(err=>{
    console.log(err)
    res.status(404)
})
})
})

//CREATE
router.post('/', (req,res)=>{
    db.Book.create(req.body)
    .then((books)=>{
        res.status(201).json(books)
    })
    .catch(err=>{
        if(err && err.name=='ValidationError'){
            let message= 'Validation Error:'
            for(let field in err.errors){
                message += `${field} was ${err.errors[field].value}.`
                message+= `${err.errors[field].message}`
            }
            console.log('Validation error message', message)
            res.status(401).json({message, prev: req.body})     
        }else{
            console.log(err)
            res.status(500).send('Internal server error.')
        }
    })
})


//SHOW
router.get('/:id', (req,res)=>{
    db.Book.findById(req.param.id)
    .then(books=>{
        res.render('/books',{books} )
    })
    .catch(err=>{
        console.log('err',err)
        res.render('error404')
    })
})
//UPDATE
router.put('/:id', (req,res)=>{
    db.Book.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
    .then(books=>{
        res.redirect(`/books/${req.params.id}`)
    })
    .catch(err=>{
        console.log(err)
        res.status('error404')
    })
})

//DELETE
router.delete('/:id', (req,res)=>{
    db.Book.findByIdAndDelete(req.params.id)
.then(books=>{
    if(books){
        res.sendStatus(200)

    }else{
        res.sendStatus(400)
    }
})
.catch(err=>{
    console.log(err)
    res.status(401).json(err)

})
})
// router.get('/:id', (req,res)=>{
// books.findById(req.params.id)
// .populate({path: 'books', options:{limit: 10}})
// .then(books =>{
//     res.render('/books', {Books})
// })
// .catch(err => {
//     console.log('err', err)
//     res.render('error404')
// })
// })
module.exports= router