const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

// connection to postgres db

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'face-recognition'
    }
});

// using node library express

const app = express();

// middlewares

app.use(express.json());
app.use(cors());

// controllers (API routes)

app.get('/', (req, res) => {
    postgres.select('*').from('users')
            .then(users => res.send(users))
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt) })

app.post('/register', (req,res) => { register.handleRegister(req, res, postgres, bcrypt) })

app.get('/profile/:id', (req,res) => { profile.handleProfile(req, res, postgres) })

app.put('/image', (req,res) => { image.handleImage(req, res, postgres) })

app.post('/imageurl', (req,res) => { image.handleApiCall(req, res) })


// server listens on port that gets from environmental variable PORT

app.listen(process.env.PORT || 3000, () => {
    console.log('App is running on port ${process.env.PORT}')
})

