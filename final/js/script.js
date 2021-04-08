WebFont.load({
    google: {
      families: ["Roboto Slab:400,800", "Montserrat:400,600"],
    },
  });
  
  function navMenu() {
    document.getElementById("nav-menu").classList.toggle("hidden");
    document.getElementById("nav-button").classList.toggle("open");
  }
  

  
  function closeAlert() {
    document.getElementById("alert-box").style.display = "none";
  }
  
  function homeGallery(number) {
    const galleryAlts = [
      "Downtown at sunset",
      "West of downtown",
      "Downtown at day",
      "Looking down from the Y",
    ];
  
    let galleryMain = document.getElementById("gallery-main");
    let oldsrc = galleryMain.getAttribute("src");
    let oldcap = oldsrc.match(/(\d{3})/);
    galleryMain.setAttribute("src", `images/gallery/${number}-${oldcap[1]}.jpg`);
    galleryMain.setAttribute("alt", galleryAlts[number - 1]);
  
    let thumbs = document.querySelectorAll("#home-gallery img.thumb");
    thumbs.forEach((thumbnail) => {
      thumbnail.classList.remove("current");
    });
    thumbs[number - 1].classList.add("current");
  }
  
  function directoryDisplay(type) {
    document.getElementById("directory").setAttribute("class", type);
    document.getElementById("list").removeAttribute("class");
    document.getElementById("grid").removeAttribute("class");
    document.getElementById(type).classList.add("current");
  }
  
  function toggleLevelKey() {
    document.getElementById("level-key-button").classList.toggle("open");
    document.getElementById("level-key").classList.toggle("open");
  }
  
  if (document.body.dataset.page == "home") {
    let galleryMain = document.getElementById("gallery-main");
    // -- let galleryMainWidth = galleryMain.offsetWidth;
  
    // --if (galleryMainWidth > 590) {
    // --  galleryMain.setAttribute("src", `images/gallery/1-720.jpg`);
    // --// --} else if (galleryMainWidth > 400) {
    // --  galleryMain.setAttribute("src", `images/gallery/1-540.jpg`);
    // --} else {
    // --  galleryMain.setAttribute("src", `images/gallery/1-360.jpg`);
   // -- }
  
    const lat = "40.2338";
    const lon = "-111.6585";
    const apikey = "b8d1b70c38ea96665bef453b4918652b";
    const exclude = "minutely,hourly";
   //  const apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apikey}&units=imperial`;
    // ---------------JSON Request-----------------------
let cityID = 3936456;
let appid = "b8d1b70c38ea96665bef453b4918652b";

// ----------Weather Summary-------------
const requestURLweather = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${appid}&units=imperial`;
  
    fetch(requestURLweather)
      .then((response) => response.json())
     .then((jsObject) => {
        document.getElementById("temp").textContent = Math.round(
            jsObject.current.temp);
        document.getElementById("cond").textContent =
          jsObject.current.weather[0].main;
        document.getElementById("hum").textContent = Math.round(
          jsObject.current.humidity
        );
  
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const forecast = [
          jsObject.daily[0],
         jsObject.daily[1],
          jsObject.daily[2],
       ];
  
      forecast.forEach((day) => {
          let card = document.createElement("div");
          let span = document.createElement("span");
          let icon = document.createElement("img");
  
          let date = new Date(day.dt * 1000);
          span.textContent = `${weekdays[date.getDay()]} - ${Math.round(
            day.temp.day
          )} °F`;
  
          let imagesrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          let imagedesc = day.weather[0].main;
          icon.setAttribute("src", imagesrc);
          icon.setAttribute("alt", imagedesc);
  
          card.appendChild(span);
          card.appendChild(icon);
          document.getElementById("forecast").appendChild(card);
        });
  
        if (jsObject.hasOwnProperty("alerts")) {
          let alert = jsObject.alerts[0];
  
          let box = document.createElement("section");
          box.setAttribute(
            "style",
            "background: var(--red-3); color: var(--foreground-3)"
          );
          box.setAttribute("id", "alert-box");
          let alertEvent = document.createElement("h2");
          let alertDesc = document.createElement("p");
          let alertClose = document.createElement("p");
  
          alertEvent.innerText = alert.event;
          alertDesc.innerText = alert.description;
          alertClose.setAttribute("type", "button");
          alertClose.setAttribute("onclick", "closeAlert()");
          alertClose.setAttribute(
            "style",
            "font-weight: bold; text-decoration: underline; cursor: pointer;"
          );
          alertClose.innerText = "Close this message";
  
          box.appendChild(alertEvent);
          box.appendChild(alertDesc);
          box.appendChild(alertClose);
  
          document
            .querySelector("header")
            .insertAdjacentElement("beforebegin", box);
        } 
      });
  }
  
  if (document.body.dataset.page == "directory") {
    const requestURL = "json/businesses.json";
  
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        const businesses = jsonObject["businesses"];
  
        const styleClasses = ["col-g", "col-o", "col-w", "col-b", "col-x"];
  
        for (let i = 0; i < businesses.length; i++) {
          let business = businesses[i];
          let card = document.createElement("section");
          card.setAttribute("class", styleClasses[2]);
          let h3 = document.createElement("h2");
          let div = document.createElement("div");
          let addr = document.createElement("p");
          addr.setAttribute("class", "addr");
          let tel = document.createElement("p");
          addr.setAttribute("class", "tel");
          let link = document.createElement("a");
          let logo = document.createElement("img");
  
          h3.textContent = `${business.name}`;
          addr.innerHTML = `${business.address}`;
          tel.innerHTML = `${business.tel}`;
          link.setAttribute("href", business.weblink);
          link.innerHTML = `Website`;
          logo.setAttribute("src", `images/logos/${business.logo}`);
          logo.setAttribute("alt", `${business.name} logo`);
  
          card.appendChild(h3);
          div.appendChild(addr);
          div.appendChild(tel);
          div.appendChild(link);
          card.appendChild(div);
          card.appendChild(logo);
  
          document.getElementById("directory").appendChild(card);
        }
      });
  }