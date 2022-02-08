const { response } = require("express");

const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:8000/results')
    .then(response => response.json())
    .then(data => {
        data.forEach(article => {
            const title = `<h3>title</3>`
            feedDisplay.insertAdjacentHTML("beforeend", title)
        })
    })
    .catch(err => console.log(err))