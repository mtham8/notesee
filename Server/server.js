var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require("body-parser")
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'mysqlcluster16.registeredsite.com',
        user     : 'notesee',
        password : '!Qaz2wsx',
        database : 'notesee',
        charset  : 'utf8'
	  }
	})
var Bookshelf = require('bookshelf')(knex)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

var router = express.Router()

// User model
var User = Bookshelf.Model.extend({
    tableName: 'users',
    classroom: function () {
      return this.belongsToMany(Classroom)
    }
}) 
// Note model
var Note = Bookshelf.Model.extend({
    tableName: 'notes',
    hasTimestamps: true,
    classroom: function () {
      return this.belongsTo(Classroom)
    },
    tags: function () {
        return this.belongsToMany(Tag)
    },
    author: function () {
        return this.belongsTo(User)
    }
}) 
// Classroom model
var Classroom = Bookshelf.Model.extend({
    tableName: 'classrooms',
    notes: function () {
       return this.hasMany(Note) 
    },
    author: function () {
      return this.belongsToMany(User) 
    }
}) 
// Tag model
var Tag = Bookshelf.Model.extend({
    tableName: 'tags',
    notes: function () {
       return this.belongsToMany(Note) 
    }
}) 

var Users = Bookshelf.Collection.extend({
  model: User
}) 
var Notes = Bookshelf.Collection.extend({
  model: Note
}) 
var Classrooms = Bookshelf.Collection.extend({
  model: Classroom
}) 
var Tags = Bookshelf.Collection.extend({
  model: Tag
}) 

router.get('/', function (req, res){
	res.json({ message: 'Notesee API working' }) 
}) 

app.use('/api', router) 

router.route('/users')
// create a user
  .post(function (req, res) {
    User.forge({
      name: req.body.name,
      email: req.body.email
    })
    .save()
    .then(function (user) {
      res.json({error: false, data: {id: user.get('id')}}) 
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    })  
  })  

router.route('/users/:id')
  // fetch user
  .get(function (req, res) {
    User.forge({id: req.params.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}}) 
      }
      else {
        res.json({error: false, data: user.toJSON()}) 
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    }) 
  }) 

router.route('/classrooms')
  // fetch all classrooms
  .get(function (req, res) {
    Classrooms.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()}) 
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: 'this is a test'}}) 
    }) 
  })
  // create a new classroom
  .post(function (req, res) {
    Classroom.forge({name: req.body.name})
    .save()
    .then(function (classroom) {
      res.json({error: false, data: {id: classroom.get('id')}}) 
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: 'this is a post test'}}) 
    })  
  }) 

router.route('/classrooms/:id')
  // fetch all classrooms by id
  .get(function (req, res) {
    Classroom.forge({id: req.params.id})
    .fetch()
    .then(function (classroom) {
      if(!classroom) {
        res.status(404).json({error: true, data: {}}) 
      }
      else {
        res.json({error: false, data: classroom.toJSON()}) 
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    }) 
  }) 
    // update a classroom
  .put(function (req, res) {
    Classroom.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (classroom) {
      classroom.save({name: req.body.name || classroom.get('name')})
      .then(function () {
        res.json({error: false, data: {message: 'Classroom updated'}}) 
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}}) 
      }) 
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    }) 
  })
  // delete a classroom
  .delete(function (req, res) {
    Classroom.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (classroom) {
      classroom.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Classroom successfully deleted'}}) 
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}}) 
      }) 
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    }) 
  }) 

router.route('/notes')
  // fetch all notes
  .get(function (req, res) {
    Notes.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()}) 
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    }) 
  }) 

router.route('/notes/:id')
  // fetch a note by id
  .get(function (req, res) {
    Note.forge({id: req.params.id})
    .fetch({withRelated: ['classrooms', 'tags']})
    .then(function (post) {
      if (!note) {
        res.status(404).json({error: true, data: {}}) 
      }
      else {
        res.json({error: false, data: note.toJSON()}) 
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    }) 
  })

router.route('/notes')
  .post(function (req, res) {
    var tags = req.body.tags 
   // parse tags variable
    if (tags) {
      tags = tags.split(',').map(function (tag) {
        return tag.trim() 
      }) 
    }
    else {
      tags = ['uncategorized'] 
    }
    // save note variables
    Note.forge({
      user_id: req.body.user_id,
      classroom_id: req.body.category_id,
      attachment: req.body.attachment
    })
    .save()
    .then(function (note) {
      // note successfully saved
      // save tags
      saveTags(tags)
      .then(function (ids) {
        note.load(['tags'])
        .then(function (model) {
          // attach tags to note
          model.tags().attach(ids) 
          res.json({error: false, data: {message: 'Tags saved'}}) 
        })
        .catch(function (err) {
          res.status(500).json({error: true, data: {message: err.message}}) 
        }) 
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}})  
      })       
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    })  
  }) 

function saveTags(tags) {
  // create tag objects
  var tagObjects = tags.map(function (tag) {
    return {
      name: tag
    } 
  }) 
  return Tags.forge()
  // fetch tags that already exist
  .query('whereIn', 'name', _.pluck(tagObjects, 'name'))
  .fetch()
  .then(function (existingTags) {
    var doNotExist = [] 
    existingTags = existingTags.toJSON() 
    // filter out existing tags
    if (existingTags.length > 0) {
      var existingSlugs = _.pluck(existingTags, 'name') 
      doNotExist = tagObjects.filter(function (t) {
        return existingSlugs.indexOf(t.name) < 0 
      }) 
    }
    else {
      doNotExist = tagObjects 
    }
    // save tags that do not exist
    return new Tags(doNotExist).mapThen(function(model) {
      return model.save()
      .then(function() {
        return model.get('id') 
      }) 
    })
    // return ids of all passed tags
    .then(function (ids) {
      return _.union(ids, _.pluck(existingTags, 'id')) 
    }) 
  }) 
}

router.route('/notes/classroom/:id')
  .get(function (req, res) {
    Classroom.forge({id: req.params.id})
    .fetch({withRelated: ['notes']})
    .then(function (classroom) {
      var notes = classroom.related('notes')
      res.json({error: false, data: notes.toJSON()})
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}})
    })
  })

router.route('/notes/tag/:name')
  .get(function (req, res) {
    Tag.forge({name: req.params.name})
    .fetch({withRelated: ['notes']})
    .then(function (tag) {
      var notes = tag.related('notes') 
      res.json({error: false, data: notes.toJSON()}) 
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}}) 
    }) 
  }) 


app.listen(port) 
console.log('Magic happens on port', port)  

// client --> Filestack --> AWS --> Notesee API --> Bookshelf/Knex --> MySQL --> Notesee API --> back to client
// POST: Client post data --> organize data in database
// GET: Client ask for data --> API --> SQL queries --> return in JSON 

