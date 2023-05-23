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


module.exports = {validString, validEmail, validPassword, validPhone, validNumber }