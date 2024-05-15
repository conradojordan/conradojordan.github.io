function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
} 

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}
