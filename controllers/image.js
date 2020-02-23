const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: 'aa5896dab06f43d88554b3d846cab3a3'
  });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, postgres) => {
    const { id } = req.body;
    postgres('users').where('id', '=', id)
            .increment('entries', 1)
            .returning('entries')
            .then(entries => {
                if(entries.length){
                    res.json(entries[0])
                } else {
                    res.status(404).json('No such user')
                }
            })
            .catch(err => res.status(404).json('Error when updating entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}