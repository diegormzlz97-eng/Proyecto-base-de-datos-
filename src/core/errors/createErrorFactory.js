export const createErrorFactory = function (name){
    return class BusinessError extends Error {
        constructor (message, status = 500, originalError = null){
            super(message)
            this.name = name
            this.status = status
            this.originalError = originalError
        }
    }
} 
