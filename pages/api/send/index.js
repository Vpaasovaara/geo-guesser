import connectDB from '../../../middleware/mongodb'
import Score from '../../../models/scores'

// POST /api/send
const handler = async(req, res) => {

    let { name, score } = req.body
    console.log(name, score)
    if (name && score) {
        try {
            let user = new Score({
                name,
                score
            })
            var usercreated = await user.save();
            return res.status(200).send(usercreated);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        res.status(422).send('name or score not provided')
    }
}

export default connectDB(handler)