"use strict"; 

function MakeFoodRating({
foodName = "unknown Food",
thePrice = 0, 
theRating = 0,
imgURL = null,
thedescription = "unknown description",
EnjoymentList = [{"display":"List is not supported" , "val":"pics/noimage.jpg"}], 
theEnjoyment = "pics/noimage.jpg",
theLikeCount = 0
}) {


// create a div for foodRatingObj and add class name emp to it
var foodRatingObj = document.createElement('div');
foodRatingObj.classList.add("foodRating");

//transfer the parameter to foodRatingObj that is going to change
foodRatingObj.rating = theRating; 

//create a private varible to hold the likecounter
foodRatingObj.likeCount = theLikeCount;

//create a private varible to hold the description
foodRatingObj.description = thedescription;

//create a private varible to hold the description
foodRatingObj.price = thePrice;





//Setter funciton 
foodRatingObj.changeRating = function(newRating){
    if(isNaN(newRating) || Number(newRating)> 10 || Number(newRating)<1) {
        alert("Not a number between 1-10, Enter a number");
    }  
    else{
        foodRatingObj.rating = newRating;
    }
    display(); 
};



//Setter funciton 
foodRatingObj.changeDescription = function(newDescription){
    foodRatingObj.description = newDescription;
    display(); 
};


//Change price funciton 
foodRatingObj.changePrice = function(newPrice){
    if(isNaN(newPrice) || newPrice ==0){
        alert("Not a number, can't be 0. Enter a number");
    }
    else{
        foodRatingObj.price = Number(foodRatingObj.price) * Number(newPrice);
    }
    display(); 
};



//check if the image is null, if not add to foodRatingObj div
if(imgURL == null){
    foodRatingObj.innerHTML += "<p>image not available</p>";
} else {
    foodRatingObj.innerHTML += `<img src='${imgURL}'/>`;
}



//add to foodRatingObj div, 
foodRatingObj.innerHTML += `

<div class = 'foodRatingInfoClass'></div>

<div>
<button class = 'priceButtonClass'> Change Price by a factor of </button>
<input class = 'newPriceButtonClass'/> 
<br/>
<button class = 'ratingButtonClass'> Change Rating to </button>
<input class = 'newRatingButtonClass'/> 
<br/>
<button class = 'descriptionButtonClass'> Change Description to </button>
<input class = 'newDescriptionButtonClass'/> 
<br/>
Select a image for your rating
<select class = "selectEnjoymentE">
</select>

<br/>
<img src = "pics/LikeButton.png", class = 'likeButtonClass'>
Press the like Button to add Likes
</div>

`;

//make variable to use the buttons, and make info div
var foodRatingInfo = foodRatingObj.getElementsByClassName("foodRatingInfoClass")[0];
var ratingButton = foodRatingObj.getElementsByClassName("ratingButtonClass")[0];
var newRatingInput = foodRatingObj.getElementsByClassName("newRatingButtonClass")[0];
var selectEnjoyment = foodRatingObj.getElementsByClassName("selectEnjoymentE")[0];
var likeButton = foodRatingObj.getElementsByClassName("likeButtonClass")[0];
var descriptionButton = foodRatingObj.getElementsByClassName("descriptionButtonClass")[0];
var newDescriptionInput = foodRatingObj.getElementsByClassName("newDescriptionButtonClass")[0];
var priceButton = foodRatingObj.getElementsByClassName("priceButtonClass")[0];
var newPriceInput = foodRatingObj.getElementsByClassName("newPriceButtonClass")[0];


// put the options into the select tag (from EnjoymentList)
for (var listEle of EnjoymentList) {
        var opt = document.createElement("option");
        opt.innerHTML = listEle.display;
        opt.value=listEle.val;
        selectEnjoyment.appendChild(opt);
}
selectEnjoyment.value = theEnjoyment;

//When the price button is click, change price
ratingButton.onclick = function (){
    foodRatingObj.changeRating(newRatingInput.value);
}

descriptionButton.onclick = function (){
    foodRatingObj.changeDescription(newDescriptionInput.value);
}

priceButton.onclick = function (){
    foodRatingObj.changePrice(newPriceInput.value);
}

//When the price button is click, change price
likeButton.onclick = function (){
    foodRatingObj.likeCount += 1;
    display();
}


selectEnjoyment.onchange = function() {
    display();
};

// private function, use to format currency.
function formatCurrency(numStr) {

    numStr += ""; // convert to string, if it's not a string.

    // remove formatting characters, if there are any
    numStr = numStr.replace("$", "");
    numStr = numStr.replace(",", "");

    var num = Number(numStr); // convert to number again.

    var formattedNum = num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
    console.log("formattedNum:" + formattedNum);
    return formattedNum;
}



var display = function ()
{
    foodRatingInfo.innerHTML = `
    <h3>${foodName}</h3> 
    <h3>Price: ${formatCurrency(foodRatingObj.price)}</h3>
    <p> Rating(1-10): ${foodRatingObj.rating}</p> 
    <p>Description: ${foodRatingObj.description}</p>
    <img src='${selectEnjoyment.value}'/>
    <p> Likes ${foodRatingObj.likeCount} <p>

    `
};

display();





return foodRatingObj;

}