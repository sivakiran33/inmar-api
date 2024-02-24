module.exports.success = (data, res, statusCode) => {
    let code = statusCode?statusCode:200;
    let response = {
        success: true,
        data: data
    }
    res.status(code).json(response);
}

module.exports.fail = (message, res, statusCode) => {
    let code = statusCode?statusCode:400;
    let response = {
        success: false,
        message: message
    }
    res.status(code).json(response);
}