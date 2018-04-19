var button = document.querySelectorAll('.nexus');

for (var i = 0; i < button.length; i++) {
    button[i].onmousedown = function (e) {
        var x = (e.offsetX == undefined) ? e.layerX : e.offsetX;
        var y = (e.offsetY == undefined) ? e.layerY : e.offsetY;
        var effect = document.createElement('div');
        effect.className = 'effect';
        effect.style.top = y + 'px';
        effect.style.left = x + 'px';
        e.srcElement.appendChild(effect);
        setTimeout(function () {
            e.srcElement.removeChild(effect);
        }, 1100);
    }
}