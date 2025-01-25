"use strict"; 
function MakeFoodRating_CGF(){

    var ele = document.createElement("div");

    var myFoodrating = MakeFoodRating({foodName : "Pizza", thePrice: 10, theRating: 8, imgURL:"pics/Pizza.jpg", theLikeCount: 10, thedescription: "Hot and delicious pizza",
        EnjoymentList: [{ "display": "Disgust", "val": "pics/disgust.png" },
        { "display": "Meh", "val": "pics/meh.png" },
        { "display": "Yummy", "val": "pics/yummy.png" }
        ], 
        theEnjoyment: "pics/yummy.png"



    });
    ele.appendChild(myFoodrating);

    var sallyFoodrating = MakeFoodRating({foodName : "Tacos", thePrice: 12, theRating: 9, imgURL:"pics/taco.jpg", theLikeCount: 8, thedescription: "Crunchy and tasty taco",
        EnjoymentList: [{ "display": "One star", "val": "pics/oneStar.png" },
        { "display": "Two star", "val": "pics/twoStars.png" },
        { "display": "Three star", "val": "pics/threeStars.png" }
        ], 
        theEnjoyment: "pics/oneStar.png"



    });
    ele.appendChild(sallyFoodrating);

    var yourFoodrating = MakeFoodRating({});
    ele.appendChild(yourFoodrating);
    
    return ele;
}