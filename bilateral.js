var loop = false;

function endloop() {
    loop = false;
}

function startloop(amount) {
    loop = true;
    changeOffset(amount);
}

function changeOffset(amount) {
    if (!loop) { return; }
    var o = parseInt(document.getElementById("offset").value, 10);
    o += amount;
    document.getElementById("offset").value = o;
    var q = queryObj();
    draw(q.url, o);
    setTimeout(function () {changeOffset(amount)}, 100);
}

function draw(url, offset) {
    if (!url) {
	return;
    }
    if (!offset) {
	offset = 0;
    }
    offset = parseInt(offset, 10);
    var can = document.getElementById('canvas');
    var ctx = can.getContext('2d');
    var img = new Image();
    img.onload = function(){
	var w = img.width + (offset * 2);
	var h = img.height;
	var hw = w / 2;
	can.width = w;
	can.height = h;

	// left half
	ctx.drawImage(img, 0, 0, hw, h, 0, 0, hw, h);

	// right half
	ctx.translate(hw, 0);
	ctx.scale(-1, 1);
	ctx.drawImage(img, 0, 0, hw, h, -hw, 0, hw, h);
    }
    img.src = url;
    document.getElementById('url').value = url;
    document.getElementById('offset').value = offset;
}

function decode(s) {
    try {
        return decodeURIComponent(s).replace(/\r\n|\r|\n/g, "\r\n");
    } catch (e) {
        return "";
    }
}

function queryObj() {
    var result = {}, keyValuePairs = location.search.slice(1).split('&');

    keyValuePairs.forEach(function(keyValuePair) {
        keyValuePair = keyValuePair.split('=');
        result[decode(keyValuePair[0])] = decode(keyValuePair[1] || '');
    });

    return result;
}

var q = queryObj();
draw(q.url, q.offset);

