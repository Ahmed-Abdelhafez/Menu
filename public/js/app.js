document.getElementById('content').innerHTML = document.getElementById('menu').innerHTML

document.getElementById('menuBtn').onclick = function changeContent() {
    document.getElementById('content').innerHTML = document.getElementById('menu').innerHTML
}

document.getElementById('reviewsBtn').onclick = function changeContent() {
    document.getElementById('content').innerHTML = document.getElementById('reviews').innerHTML
}

document.getElementById('infoBtn').onclick = function changeContent() {
    document.getElementById('content').innerHTML = document.getElementById('info').innerHTML
}