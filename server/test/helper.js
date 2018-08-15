import mongoose from 'mongoose'
import utils from '../controllers/utils'

before((done) => {
    console.log('Before Hook');
    mongoose.connect('mongodb://localhost:27017/RedlineControlTest', {useNewUrlParser: true})

    const db = mongoose.connection
    db.on('open', function() {
        console.log('Connected to test DB')
        this.dropDatabase().then(() => {
            console.log('dropDatabase')
            utils.buildFromFile().then(results => {
                done()
            })
        }).catch(err => console.error(err))
    })
    db.on('error', () => console.error('Database connection failed'))
})
