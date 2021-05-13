const searchBar = document.querySelector(".search-bar")

// document.addEventListener("DOMContentLoaded", async (event) => {
//     searchBar.addEventListener("submit", async (e) => {
      // e.preventDefault();
      
      const search = searchBar.value.toLowerCase();
      const body = { something: 'hello' }
      try {
          const res = await fetch("/restaurants/search", {
          method: "POST",
          body: JSON.stringify({search}),
          headers: {
            "Content-type": "application/json",
          },
        });
        console.log("-------");
        if (!res.ok) {
          throw res;
        }
        
        
        // window.location.href = '/'
        const json = await res.json();
        console.log(restaurantName)
        console.log(json.restaurantById[restaurantName.toString()])
  
        if(json.restaurantById[restaurantName.toString()]) {
            window.location.href = `/restaurants/${json.restaurantById[restaurantName.toString()]}`
        }

        console.log(json);
      } catch (err) {
        console.log(err);
      }
  //   });
  // });