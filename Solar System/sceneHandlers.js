
// An integer value, in pixels, indicating the X coordinate at which the mouse pointer was located when the event occurred. 
var mouseDown = false, pageX = 0, pageY = 0;

function rotateScene(deltax, deltay)
{
    solarSystem.rotation.y += deltax / 100;
    solarSystem.rotation.x += deltay / 100;

    $("#rotation").html("rotation:" + solarSystem.rotation.x.toFixed(1) + "," + solarSystem.rotation.y.toFixed(1) + ",0");
}

function scaleScene(scale)
{
    solarSystem.scale.set(scale, scale, scale);
    $("#scale").html("scale: " + scale);
}

function onMouseMove(evt)
{
    if (!mouseDown)
        return;
    
    // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    evt.preventDefault();
    
    var deltax = evt.pageX - pageX;
    pageX = evt.pageX;

    var deltay = evt.pageY - pageY;
    pageY = evt.pageY;

    rotateScene(deltax, deltay);
}

function onMouseDown(evt)
{
    evt.preventDefault();
    
    mouseDown = true;
    pageX = evt.pageX;
    pageY = evt.pageY;
}

function onMouseUp(evt)
{
    evt.preventDefault();
    
    mouseDown = false;
}

function addMouseHandler(canvas)
{
    canvas.addEventListener( 'mousemove', 
            function(e) { onMouseMove(e); }, false );
    canvas.addEventListener( 'mousedown', 
            function(e) { onMouseDown(e); }, false );
    canvas.addEventListener( 'mouseup', 
            function(e) { onMouseUp(e); }, false );
}