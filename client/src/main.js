//lets now get our table elements showing on the page
const animalDisplaySection = document.getElementById("app");

//create a function that makes a request to your server
async function fetchAnimals() {
  const response = await fetch(
    `https://wk04d04-databases-server.onrender.com/animals`
  );
  const animals = await response.json();
  //invoke function that is declared below this one
  createAnimals(animals);
}

//create function that uses a forEach loop to create a new element for both parts of the data using the DOM
function createAnimals(animalsArray) {
  animalsArray.forEach((singleAnimal) => {
    const div = document.createElement("div");

    const animalElement = document.createElement("p");
    const habitatElement = document.createElement("p");

    //set inner text
    animalElement.innerText = singleAnimal.animal;
    habitatElement.innerText = singleAnimal.habitat;

    //set a class so we can do some css styling
    div.setAttribute("class", "animal-container");
    //append elements to the div
    div.append(animalElement, habitatElement);
    //append the div to the page
    animalDisplaySection.append(div);
  });
}

//invoke the function
fetchAnimals();

//lets now work on a submit event that listens for users submitting their own animal info

const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const userAnimal = Object.fromEntries(data);

  //now let's send that info to the database using a post route
  const response = await fetch(
    "https://wk04d04-databases-server.onrender.com/animals",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAnimal),
    }
  );
});
