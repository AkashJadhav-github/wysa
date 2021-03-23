let config = require('../config/config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// API to create/register new user
const register = async (req, res) => {
    try {
        const db = req.app.locals.db;
        let dba = db.db(config.wysa_db);
        console.log(req.body);
        
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        if (name && email && password) {
            let data_obj = {
                name,
                email,
                password: bcrypt.hashSync(password, 8),
            }

            let result = await dba.collection(config.users_collection).insertOne(data_obj);
            
            if (result.insertedCount) {
                res.status(200).send("User register successfully");
            } else {
                res.status(500).send("Data not inserted.")
            }
        } else {
            res.status(500).send("Invalid params")
        }

    } catch (error) {
        res.status(400).send("There was a problem registering the user. " + error)
    }
}

module.exports.register = register;


// login API for existing users
const login = async (req, res) => {
    try {
        const db = req.app.locals.db;
        let dba = db.db(config.wysa_db);

        if (req.body.email && req.body.password) {
            let result = await dba.collection(config.users_collection).find({ email: req.body.email }).project({ password: 1 }).toArray();

            if (result.length) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

                let token = jwt.sign({ id: result[0]._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({ auth: true, token: token });
            } else {
                res.status(404).send('No user found.');
            }
        } else {
            res.status(500).send('Invalid parameters.')
        }

    } catch (error) {
        res.sendStatus(400)
    }
}

module.exports.login = login;



const saveUserData = async (req, res) => {
    try {
        let db = req.app.locals.db;
        let dba = db.db(config.wysa_db);

        let name = req.body.name
        let expected_changes = req.body.expected_changes
        let struggle = req.body.struggle
        let sleep_time = req.body.sleep_time
        let wake_time = req.body.wake_time
        let current_efficiency = req.body.current_efficiency
        let proposed_efficiency = req.body.proposed_efficiency
        let plan_type = req.body.plan_type
        
        if (name && expected_changes && struggle && sleep_time && wake_time && current_efficiency && proposed_efficiency && plan_type) {
            let data_obj = {
                name,
                expected_changes,
                struggle,
                sleep_time,
                wake_time,
                current_efficiency,
                proposed_efficiency,
                plan_type
            }
            let result = await dba.collection(config.users_collection).insertOne(data_obj)

            if (result.insertedCount) {
                res.status(200).send({ message: 'Data successfully inserted' });
            } else {
                res.status(404).send('Data not inserted');
            }
        } else {
            res.status(500).send('Invalid parameters.')
        }
    } catch (error) {
        res.send(400)
    }
}

module.exports.saveUserData = saveUserData;