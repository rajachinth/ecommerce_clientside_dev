
export class ApplicationError {
    constructor(error: any, errorStatus?: any) {
        (errorStatus) ? errorStatus = errorStatus : errorStatus = 'Unknown';
        console.log(`Error Status ${errorStatus}`);
    }
}
export class BadRequestError extends ApplicationError {
    constructor(error, errorStatus) {
        super(error, errorStatus);
    }
}
export class NotFounfError extends ApplicationError {
    constructor(error, errorStatus) {
        super(error, errorStatus);
    }
}
export class InternalServerError extends ApplicationError {
    constructor(error, errorStatus) {
        super(error, errorStatus);
    }
}
export class ConflictError extends ApplicationError {
    constructor(error, errorStatus) {
        super(error, errorStatus);
    }
}
