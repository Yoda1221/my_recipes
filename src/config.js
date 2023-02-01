import {noimage, uploadImage}      from './assets'

const TABLES = Object.freeze({
    recipes: "recipes",
    ingredients: "ingredients"
})
const TIME = cookTime()
const TEMP = cookTemp()
const TYPES = Object.freeze({
    s: {
        key: "s",
        value: "soup"},    // soup leves
    m: {
        key: "m",    
        value: "main"},   // main főétel
    c: {
        key: "c",
        value: "desszert"}, // cake sütemény
    o: {
        key: "o",
        value: "other"}     // other egyéb
})
const COMPLEX = Object.freeze({
    e: "egyszerű",
    g: "gyors",
    k: "könnyű",
    m: "macerás",
    n: "nehéz",
    z: "közepesen nehéz"
})
function cookTime() {
    let time = []
    for (let i = 0; i < 121;) {
        time.push(i)
        i = i + 5
    }
    return time
}
function cookTemp() {
    let temp = [0]
    for (let i = 100; i < 230;) {
        temp.push(i)
        i = i + 5
    }
    return temp
}
function uppercaseFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
const ImgConfig = {
    noimage,
    uploadImage
}
const USER_REGEX    = /^[A-z0-9]{3,20}$/
const INPUT_REGEX   = /^[A-z0-9]{3,20}$/
const PASSWD_REGEX  = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX   = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export { 
    TABLES,
    TIME,
    TEMP,
    TYPES, 
    COMPLEX, 
    ImgConfig, 
    USER_REGEX ,
    INPUT_REGEX,
    PASSWD_REGEX, 
    EMAIL_REGEX, 
    uppercaseFirstChar
}
