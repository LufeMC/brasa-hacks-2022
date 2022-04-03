const shortid = require('shortid');

const routes = (app, lms, accounts) => {
    app.post('/register', async (req, res) => {
        let data = req.body.data
        let id = shortid.generate() + shortid.generate()
        console.log(accounts)
        lms.sendUser(id, data, { from: accounts })
            .then((_data, _address) => {
                res.json({ "status": "success", id })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ "status": "failed", "reason": "An error occured during register process" })
            })
    })

    app.post('/retrieve', (req, res) => {
        let id = req.body.id
        console.log(id)
        lms.getData(id, { from: accounts })
            .then(async (data) => {
                console.log(data)
                if (!data || data === "") {
                    res.status(500).json({ "status": "failed", "reason": "An error occured during retrieve process" })
                } else {
                    res.json({ "status": "success", data })
                }
            })
            .catch(err => {
                res.status(500).json({ "status": "failed", "reason": "An error occured during retrieve process" })
            })
    })
}

module.exports = routes