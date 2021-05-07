//some shortcut functions
const qs = (query) => document.querySelector(`${query}`);
const qsa = (query) => document.querySelectorAll(`${query}`);
const ce = (element) => document.createElement(`${element}`);
const lsgi = (key) => {//returns or gets array of corresponding key from ls
    if (localStorage.getItem(key) === null) {
        return key = [];
    } else {
        return key = JSON.parse(localStorage.getItem(key));
    }
}
const lssi = (key, value) => {//sets the modified array(value) to the corresponding key in ls
    localStorage.setItem(key, JSON.stringify(value));
}
//an rng function
const rng = (lower, upper) => Math.floor(lower + (upper + 1 - lower) * Math.random());



//default export
const def = () => console.log("Default export");

//exports
export { qs, qsa, ce, lsgi, lssi, rng };
export default def;