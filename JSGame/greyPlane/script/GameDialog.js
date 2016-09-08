function GameDialog(point){
    var dialogHeight = 350;
    var dialogWidth = 400;

    this.divBackground = document.createElement("div");
    this.divDialog = document.createElement("div");    
    this.divHead = document.createElement("div");    
    this.divContent = document.createElement("div");    
    this.closeButton = document.createElement("img");
    //Add background of dialog
    this.divBackground.style.position = "absolute";
    this.divBackground.style.background = "#000000";
    this.divBackground.style.width = "100%";
    this.divBackground.style.height = "100%";
    this.divBackground.style.left = "0px";
    this.divBackground.style.top = "0px";
    this.divBackground.style.zIndex = "99";
    this.divBackground.style.opacity = "0.6";  
    //ceate dialog    
    this.divDialog.style.width = dialogWidth + "px";
    this.divDialog.style.height = dialogHeight + "px";        
    this.divDialog.style.position = "absolute";
    this.divDialog.style.border = "1px solid #C0D7FA";
    this.divDialog.style.borderRight = "2px outset #DEDEDE";
    this.divDialog.style.borderLeft = "2px outset #DEDEDE";
    this.divDialog.style.left = ((document.body.clientWidth / 2) - (dialogWidth / 2)) + "px";
    this.divDialog.style.top = (document.body.scrollTop + (document.body.clientHeight / 2) - (dialogHeight / 2)) + "px";
    this.divDialog.style.zIndex = "100";
    //create head
    this.divHead.appendChild(document.createTextNode("Game Over"));
    this.divHead.style.width = "100%";
    this.divHead.style.height = "25px";
    this.divHead.style.lineHeight = "25px";
    this.divHead.style.fontSize = "14px";        
    this.divHead.style.fontWeight = "bold";
    this.divHead.style.borderBottom = "1px outset #8989FF";
    this.divHead.style.color = "white";
    this.divHead.style.textIndent = "10px";
    this.divHead.style.backgroundColor = "blue";    
    //create content
    this.divContent.style.padding = "15px";
    this.divContent.style.fontSize = "2.5em";
    this.divContent.style.height = parseInt(dialogHeight - 55) + "px";
    this.divContent.style.backgroundColor = "#ffffff";
    this.divContent.style.textAlign = "center";
    this.divContent.innerHTML = "&#x54CE;&#x5440;&#x5440;<br />&#x6E38;&#x620F;&#x7ED3;&#x675F;&#x4E86;<br />&#x6700;&#x7EC8;&#x5F97;&#x5206;:"+ point + "<br />";    
    //create close button
    this.closeButton.style.cursor = "hand";
    this.closeButton.setAttribute("alt", "OK");
    this.closeButton.style.position = "absolute";
    this.closeButton.style.bottom = "10px";
    this.closeButton.style.width = "50%";
    this.closeButton.style.height = "20%";
    this.closeButton.style.left = "25%";
    this.closeButton.onclick = function() {
        location.replace(window.location.href + "?t=" + Math.random() * 10); 
    };
}
GameDialog.prototype.show = function(){
    document.body.appendChild(this.divBackground);
    this.divDialog.appendChild(this.divHead);
    this.divContent.appendChild(this.closeButton);
    this.divDialog.appendChild(this.divContent);
    this.divDialog.focus();       
    document.body.appendChild(this.divDialog);    
}