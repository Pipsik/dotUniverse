document.addEventListener("DOMContentLoaded", function(){
	var canvas = oCanvas.create({
		canvas: "#star-canvas",
		background: "#000"
	});

	// context menu initialization
	var menu = document.querySelector("#context-menu");
	var menuState = 0;
	var active = "context-menu--active";
	var menuPosition;
	var menuPositionX;
	var menuPositionY;
	//end menu init
	function positionMenu(e) {
	  menuPosition = getPosition(e);
	  menuPositionX = menuPosition.x + "px";
	  menuPositionY = menuPosition.y + "px";

	  menu.style.left = menuPositionX;
	  menu.style.top = menuPositionY;
	}
	function toggleMenuOn() {
	  if ( menuState !== 1 ) {
	    menuState = 1;
	    menu.classList.add(active);
	  }
	}
	function toggleMenuOff() {
	  if ( menuState !== 0 ) {
	    menuState = 0;
	    menu.classList.remove(activeClassName);
	  }
	}
	function getPosition(e) {
	  var posx = 0;
	  var posy = 0;

	  if (!e) var e = window.event;

	  if (e.pageX || e.pageY) {
	    posx = e.pageX;
	    posy = e.pageY;
	  } else if (e.clientX || e.clientY) {
	    posx = e.clientX + document.body.scrollLeft + 
	                       document.documentElement.scrollLeft;
	    posy = e.clientY + document.body.scrollTop + 
	                       document.documentElement.scrollTop;
	  }

	  return {
	    x: posx,
	    y: posy
	  }
	}
	var dotList = [];
	var canvasHtml = document.getElementById("star-canvas");

	canvasHtml.addEventListener("click", function(event){
		var ellipse = canvas.display.ellipse({
			x: event.clientX,
			y: event.clientY,
			radius: 3,
			fill: "#fff"
		});

		canvas.addChild(ellipse);
		ellipse.bind("click", function(event){
			if(event.button === 2){
				toggleMenuOn();
				positionMenu(event);
			} else {
				toggleMenuOff();
			}
		})


		ellipse.animate({radius: 8}, {duration: "short"});
		ellipse.animate({radius: 2}, {duration: "short"});
		ellipse.animate({radius: 7}, {duration: "short"});
		ellipse.animate({radius: 3}, {duration: "short"});
		ellipse.animate({radius: 5}, {duration: "short"});
		ellipse.animate({radius: 4}, {duration: "short"});
		dotList.forEach(function(elem){
			var line = canvas.display.line({
				start: { x: ellipse.x, y: ellipse.y },
				end: { x: elem.x, y: elem.y },
				stroke: "1px #ffc",
				cap: "round"
			});
			canvas.addChild(line);
		})
		dotList.push({x:ellipse.x, y: ellipse.y})
	});

	
});

