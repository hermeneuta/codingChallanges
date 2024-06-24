//p5.js
//funkcja setup jest dedykowaną funkcją dla p5.js
function setup() {
  //checking if i have navigator
  if ("geolocation" in navigator) {
    console.log("geolocation available");
  } else {
    console.log("geolocation not available");
  }

  const btn_server = document.getElementById("btn_server");
  const btn_map = document.getElementById("btn_map");

  navigator.geolocation.getCurrentPosition(async (position) => {
    //Getting info about geolocation

    const video = createCapture(VIDEO);
    video.size(320, 240);
    const lat = await position.coords.latitude.toFixed(2);
    const lon = await position.coords.longitude.toFixed(2);
    document.getElementById("lat").textContent = lat;
    document.getElementById("lon").textContent = lon;

    btn_map.addEventListener("click", () => {
      //Creating map
      const map = L.map("map").setView([51.29, 18.91], 6);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      const marker = L.marker([lat, lon])
        .bindTooltip("Moja aktualna lokalizacja.")
        .addTo(map);
    });

    document.getElementById("btn_clear").addEventListener("click", () => {
      const childContainer = document.querySelector(
        ".container .summary .all_data",
      );
      childContainer.innerHTML = "";
    });

    //EventListener to get all data from the server
    document.getElementById("btn_get").addEventListener("click", async () => {
      const childContainer = document.querySelector(
        ".container .summary .all_data",
      );
      try {
        const options = {
          method: "GET",
        };
        const response = await fetch("/api", options);
        const result = await response.json();
        console.log(result);

        //Oczyszczenie elementu div z poprzednich treści
        childContainer.innerHTML = "";
        for (item of result) {
          const root = document.createElement("div");
          const concept = document.createElement("div");
          const geo = document.createElement("div");
          const date = document.createElement("div");
          const image = document.createElement("img");
          const dateString = new Date(item.timestamp).toLocaleString();

          concept.textContent = `concept: ${item.concept}`;
          geo.textContent = `${item.lat}, ${item.lon}`;
          date.textContent = dateString;
          image.src = item.image64;

          //Przygotowanie paczki nowych danych
          root.append(concept, geo, date, image);

          //Wrzucenie przygotowanej paczki w odpowiednie miejsce
          childContainer.append(root);
        }
      } catch (error) {
        console.log(error);
        document.getElementById("all_data").textContent = "An error occured.";
      }
    });

    document
      .getElementById("phil-form")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        data.lat = lat;
        data.lon = lon;
        data.image64 = image64;

        try {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          const response = await fetch("/api", options);
          const result = await response.json();
          document.getElementById("result").textContent = result.message;
        } catch (error) {
          console.log(error);
          document.getElementById("result").textContent = "An error occured.";
        }
      });
  });
  //deaktywacja canvy
  noCanvas();
}
