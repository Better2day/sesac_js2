function showhide() {
    const divElement = document.getElementById("hiddenDiv");
    const divElementStyle = window.getComputedStyle(divElement).display;
    console.log(divElement);
    
    console.log(divElementStyle);
    // console.log(divElement.style.display);
    // console.log("showhide 호출");

    if (divElementStyle == 'none') {
        divElement.style.display = "block";
    } else {
        divElement.style.display = "none";
    }
}
