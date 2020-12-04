import comments from '../../content/comments.json'

export default (req, res) => {
    res.status(200).json(comments)
}