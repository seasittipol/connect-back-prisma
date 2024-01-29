module.exports = (err, req, res, next) => {
    let errMsg = err.message.split('::')[0]
    let statusCode = err.message.split('::')[1] || 500
    res.status(statusCode).json({ error: errMsg })
}