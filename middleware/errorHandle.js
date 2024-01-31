const { constants } = require("../constants");
const errorHandle = (err, req, res, next) => {
    const errorCode = res.statusCode ? res.statusCode : 500;
    switch (errorCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validate failed", message: err.message, stackTrace: err.stack });
            break;

        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;

        case constants.UNAUTHORIZED:
            res.json({ title: "Un authorized", message: err.message, stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;

        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("No Error , All Good !");
            break;
    }

}

module.exports = errorHandle;