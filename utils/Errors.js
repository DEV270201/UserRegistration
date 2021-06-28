//different types of errors that can occur in the server


class ClientError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 400;
        this.name - "ClientError";
    }
}

class AuthenticationError extends Error{
     constructor(message){
         super(message);
         this.statusCode = 401;
         this.name - "AuthenticationError";
     }
}

class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 404;
        this.name - "NotFoundError";
    }
}

class InternalServerError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 500;
        this.name - "InternalServerError";
    }
}

class DatabaseError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 503;
        this.name - "DatabaseError";
    }
}

module.exports = {
                 ClientError,
                 AuthenticationError,
                 InternalServerError,
                 NotFoundError,
                 DatabaseError
                }