document.addEventListener("DOMContentLoaded", function(){
	var canvas = oCanvas.create({
		canvas: "#star-canvas",
		background: "#000"
	});
	// set canvas width and height
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	// context menu initialization
	var menu = document.querySelector("#context-menu");
	var menuState = 0;
	var active = "context-menu--active";
	var menuPosition;
	var menuPositionX;
	var menuPositionY;
	//end menu init
	//input info initialization
  var input = document.querySelector("#dotInfo");
	var inputState = 0;
	var inputActive = "dotInfo--active";
	//end input init

	function positionMenu(e) {
	  menuPosition = getPosition(e);
	  menuPositionX = menuPosition.x + "px";
	  menuPositionY = menuPosition.y + "px";
	 	input.style.left = menuPositionX;
	  input.style.top = menuPositionY; 
	  menu.style.left = menuPositionX;
	  menu.style.top = menuPositionY;
	}

	function toggleInputOn(){
		if ( inputState !== 1){
			inputState = 1;
			input.classList.add(inputActive);
		}
	}

	function toggleInputOff(){
		if ( inputState !== 0) {
			inputState =0;
			input.classList.remove(inputActive);
		}
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
	    menu.classList.remove(active);
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
	document.getElementsByTagName("body")[0].addEventListener("click",function(event){
		if(event.button === 0 && menuState ){
		toggleMenuOff();
		}
	})
	var inputBox = document.getElementById("inputBox");
	inputBox.addEventListener("click",function(event){
		if(event.button === 0){
			toggleInputOn();
			positionMenu(event);
		}
	})
	canvasHtml.addEventListener("click", function(event){
		if(!menuState){
			var ellipse = canvas.display.ellipse({
				x: event.clientX,
				y: event.clientY,
				radius: 3,
				fill: "#fff"
			});

			canvas.addChild(ellipse);
			ellipse.bind("click", function(event){

				if(event.button === 2 ){
					toggleMenuOn();
					toggleInputOff();
					positionMenu(event);
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
		}
	});



});
