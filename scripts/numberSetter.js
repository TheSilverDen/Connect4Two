function addNumbers() {
    const canvasWidth = document.getElementById("my-canvas").width;
    const canvasOffsetLeft = document.getElementById("my-canvas").getBoundingClientRect().left;
    const numberContainer = document.getElementById("number-container");
    const numCount = 7;
    const spacing = canvasWidth / (numCount);
    let numbersHTML = "";

    for (let i = 1; i <= numCount; i++) {
        const leftPosition = (canvasOffsetLeft + spacing * i)- 30;
        numbersHTML += `<span style="position: absolute; left: ${leftPosition}px;">${i}</span>`;
    }

    numberContainer.innerHTML = numbersHTML;
}

// Call the function to add numbers when the page is loaded and also when the window is resized
window.addEventListener("load", addNumbers);
window.addEventListener("resize", addNumbers);