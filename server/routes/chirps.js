const express = require('express');
const chirpstore = require('../chirpstore');

const router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        res.json(chirpstore.GetChirp(id))
    } else {
        const data = chirpstore.GetChirps()
        const chirps = Object.keys(data).map(key => {
            return {
                id: key,
                name: data[key].name,
                text: data[key].text
            };
        });
        chirps.pop();
        res.json(chirps)
    }
})

router.post('/', (req, res) => {
    chirpstore.CreateChirp(req.body);
    res.json('added')
});

router.put('/:id', (req, res) => {
    id = req.params.id
    chirpstore.UpdateChirp(id, req.body);
    res.json('updated')
});

router.delete('/:id', (req, res) => {
    let id = req.params.id
    chirpstore.DeleteChirp(id);
    res.json('Deleted')
});

module.exports = router;