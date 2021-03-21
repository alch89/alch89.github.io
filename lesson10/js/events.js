const requestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

let cityname = "";
switch (document.body.dataset.city) {
  case "preston":
    cityname = "Preston";
    break;
  case "soda-springs":
    cityname = "Soda Springs";
    break;
  case "fish-haven":
    cityname = "Fish Haven";
    break;
}

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towndata = jsonObject["towns"];
    const town = towndata.find((town) => town.name == cityname);

    let section = document.getElementById("events");
    let h2 = document.createElement("h2");
    let events = document.createElement("div");

    h2.textContent = "Events";
    town.events.forEach((cityevent) => {
      let p = document.createElement("p");
      p.textContent = cityevent;
      events.appendChild(p);
    });

    section.appendChild(h2);
    section.appendChild(events);
  });
