import { Schema, model } from 'mongoose'

const scoreSchema = Schema({
    name: String,
    score: Number
})

scoreSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

global.Score = global.Score || model('Score', scoreSchema)

export default global.Score