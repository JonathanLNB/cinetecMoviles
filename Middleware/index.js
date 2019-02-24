function authentication(username, password) {
    return username === '1c74c0982d71920ae5b339846a174633' && password === '0afe81932095089d200bebcb9856d266'
}
function notFound(req, res, next) {
    const error = new Error('Not Found - ' + req.originalUrl);
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
        error: process.env.NODE_ENV === 'production' ? {} : error.stack,
    });
}

module.exports = {
    authentication,
    notFound,
    errorHandler
};