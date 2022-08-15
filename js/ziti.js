!(function(doc, win) {
    var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "orientationchange" : "resize",
        fn = function() {
            var width = docEle.clientWidth;
          
           
            width && (docEle.style.fontSize = 13 * (width / 320) + "px");
//          console.log(width)
			if(width>=640){
				width && (docEle.style.fontSize = 26 + "px");
			}
			if(width<=328){
				width && (docEle.style.fontSize = 13 + "px");
			}
        };
        
    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));