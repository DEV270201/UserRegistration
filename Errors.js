//different types of errors that can occur in the server

export class AuthenticationError extends Error{
     constructor(message){
         super(message);
         this.statusCode = 401;
         this.name - "AuthenticationError";
     }
}

export class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 404;
        this.name - "NotFoundError";
    }
}

export class InternalServerError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 500;
        this.name - "InternalServerError";
    }
}

export class DatabaseError extends Error{
    constructor(message){
        super(message);
        this.statusCode = 503;
        this.name - "DatabaseError";
    }
}