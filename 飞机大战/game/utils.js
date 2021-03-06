var log = console.log.bind(console);

var config = {
    player_speed: 10,
    cooldown: 10,
}

var imageFromPath = function (path) {
    var image = new Image();
    image.src = path;
    return image;
}

var rectIntersects = function (a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}