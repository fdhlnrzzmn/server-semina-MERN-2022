const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api-error');

class NotFound extends CustomAPIError {
    constructor (messsage) {
        super(messsage);

        this.statusCode = StatusCodes.NOT_FOUND;
}
}

module.exports = NotFound;