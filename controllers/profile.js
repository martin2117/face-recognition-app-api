const handleProfile = (req, res, postgres) => {
    const { id } = req.params;
    postgres.select('*').from('users').where({ id: id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(404).json('User not found')
            }
        })
        .catch(err => res.status(404).json('Error getting user'))

}

module.exports = {
    handleProfile: handleProfile
}