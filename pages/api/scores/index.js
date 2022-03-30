import connectDB from '../../../middleware/mongodb'
import Score from '../../../models/scores'

// GET /api/scores
const handler = async(req, res) => {
    try {
        // Get scores from mongoDB
        let scoreList = await Score.find({})

        // sort by ascending order and get 10 first results
        let copy = scoreList.sort((a, b) => b.score - a.score).slice(0, 10)

        // send sorted list
        res.send(copy)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
    
}

export default connectDB(handler)