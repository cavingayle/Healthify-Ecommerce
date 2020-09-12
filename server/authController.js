const bcrypt = require('bcryptjs')

module.exports = {
    // Only sending back user id on the req.session

    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body
        const [user] = await db.auth.get_customer(email)
        if (!user) {
            res.status(401).send('Login Failed! Please use the correct usename and password')
        } else {
            const auth = bcrypt.compareSync(password, user.password)
            if (auth) {
                delete user.password
                req.session.user = user
                res.status(200).send(user)
            } else {
                res.status(403).send("Incorrect Login Information");

            }
        }
    },
// Only sending back user id on the req.session.user
    register: async (req, res) => {
        const db = req.app.get('db')
        const { email, password, firstName, lastName } = req.body
        const [user] = await db.auth.get_customer([email])
        if (user) {
            res.status(409).send('The email already exists')
        } else {
            const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.auth.add_customer([email, firstName, lastName, hash])
        req.session.user = { userId: newUser.user_id }
        res.status(200).send(req.session.user)
        }
        
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
          } else {
            res.sendStatus(404);
          }
    }
}