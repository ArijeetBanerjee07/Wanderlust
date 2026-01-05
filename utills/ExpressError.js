class ExpressError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status; // MUST be a number
    }
}

module.exports = ExpressError;
