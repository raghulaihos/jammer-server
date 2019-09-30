const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../postgres/connection');

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password, 12).then(hashedPw => {
        let values = [name, email, hashedPw];
        create_user(values);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

const create_user = async (values) => {

    const text = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *'
    try {
        const res = await db.query(text, values)
        console.log(res.rows)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const login = async (req, res, next) => {
    const email = req.body.email;
    const passsword = req.body.password;
    try {
       let response = await find_user([email, passsword]);
       res.json(response);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const find_user = async (values) => {
    const text = `select * from users where email='Tademetti_vijay@gmail.com'`;
    try {
        const res = await db.query(text);
        if (!res) {
            const error = new Error('No user with this email exists');
            error.statusCode = 401;
            throw error;
        }
        let is_equal = await bcrypt.compare(values[1], res.rows[0].password);
        if (is_equal == false) {
            const error = new Error('wrong password!');
            error.statusCode = 401;
            throw error;
        }
        else{
            return 'welcome!';
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    }
}

module.exports = {
    signup,
    login
}