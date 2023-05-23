const validNumber = function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value !== "number") return false
    return true
}

const validString = function(value){
    return value.match(/^[a-zA-Z ]+$/)
}

const validEmail = function(value){
    return value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+\.[a-zA-Z-.]+$/)
}

const validPassword = function(value){
    return value.match(/^[A-Za-z]{8,15}$/)
}

const validPhone = function(value){
    return value.match(/^[0]?[789]\d{9}$/)
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0; // it checks, is there any key is available or not in request body
}

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

module.exports = {validString, isValidObjectId,isValidRequestBody, validEmail, validPassword, validPhone, validNumber }