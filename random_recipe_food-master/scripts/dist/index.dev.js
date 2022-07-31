"use strict";

var cardsContainer = document.querySelector('.section-center');
var searchFoodInput = document.querySelector('#searchFoodInput');
var searchFoodSubmit = document.querySelector('#searchFoodSubmit');
var spinner = document.querySelector('.spinner');
var id = 'a3eb042c';
var API_KEY = "971b494bf790410ec1e9abae75b2799c";
var id_Food = '8e59d3bc';
var API_KEY_FOOD = "f459e28ce2872bed0fbe6481a6df3665";
cardsContainer.innerHTML = '';
var recipesContainer = [];
var meals = [];

window.onload = function () {
  setTimeout(function () {
    spinner.style.display = 'none';
  }, 800);
};

function getMeals() {
  var RANDOM_FOOD, URI_FOOD, response;
  return regeneratorRuntime.async(function getMeals$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // const URI = `https://api.edamam.com/search?q=${val}&app_id=${id}&app_key=${API_KEY}`;
          RANDOM_FOOD = "https://www.themealdb.com/api/json/v1/1/random.php";
          URI_FOOD = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=red%20apple&app_id=".concat(id_Food, "&app_key=").concat(API_KEY_FOOD);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(RANDOM_FOOD));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          recipesContainer = _context.sent;
          meals.push(recipesContainer.meals[0]); //id meal 

          currentMealId = recipesContainer.meals[0].idMeal; //set every recipe on localstorage

          localStorage.setItem('recipe', JSON.stringify(meals));
          randomMeal(meals);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 15]]);
} //display the recipe on screen


function randomMeal(item) {
  var itemm = item[item.length - 1];
  var ingredientes = []; //loop on ingredient 

  for (var i = 1; i < 20; i++) {
    if (itemm["strIngredient".concat(i)]) {
      ingredientes.push("".concat(itemm["strIngredient".concat(i)]));
      ingredientes.push("".concat(itemm["strMeasure1".concat(i)]));
    } else {
      break;
    }
  }

  var ingredientsTrimed = ingredientes.filter(function (ing) {
    return ing !== '' && ing !== 'undefined';
  }); //ui staff 

  cardsContainer.innerHTML = "\n    <article class=\"menu-item\">\n    <img src=\"".concat(itemm.strMealThumb, "\" alt=\"..\" class=\"recipeImg\">\n    <div class=\"item-info\">\n      <header>\n        <h4 class='fw-bold shadow-sm  rounded'>").concat(itemm.strMeal, "</h4>\n        <h3 class=\"\">Category : <span class='text-danger badge bg-dark'> ").concat(itemm.strCategory, "</span></h3>\n        <h4 class=\"price badge rounded-pill bg-success p-3 \">").concat(itemm.strArea, " </h4>\n      </header>\n          <p class=\"item-text\">").concat(itemm.strInstructions, "</p>\n      <div class='d-flex justify-content-between'>\n        <button class='btn'>ingredients</button>\n        <a class='btn' href=").concat(itemm.strSource, " target='_blank'>Meal Source</a>\n      </div>\n      <div class=\"menu-ingredients\">\n        <i class='bx bx-x close-ing'></i>\n        <ul>\n        ").concat(ingredientsTrimed.map(function (ing) {
    return "\n        <li class=\"list-item-ing\">".concat(ing, "</li>\n        ");
  }).join(''), "\n        </ul>\n      </div>\n\n\n      </div>\n    </div>\n</article>\n    "); //images info 

  var ulRecipe = cardsContainer.querySelector('.menu-ingredients');
  var listItemIngs = cardsContainer.querySelectorAll(['.list-item-ing']);
  var listArr = Array.from(listItemIngs);
  listArr.filter(function (listItem) {
    return listItem.textContent !== undefined;
  });
  var closeIng = cardsContainer.querySelector('.close-ing').addEventListener('click', function () {
    ulRecipe.classList.remove('active');
  });
  var ingredientsBtn = cardsContainer.querySelector('.btn').addEventListener('click', function (e) {
    console.log(e.target);
    ulRecipe.classList.add('active');
  });
} //button function


searchFoodSubmit.addEventListener('click', function (e) {
  getMeals();
});

if (localStorage.getItem('recipe')) {
  var rec = JSON.parse(localStorage.getItem('recipe'));
  randomMeal(rec);
}