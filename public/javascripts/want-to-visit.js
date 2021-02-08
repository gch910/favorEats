const removeWantButton = document.querySelectorAll(".remove-want-button");
const wantRestaurantInfo = document.querySelectorAll(".want-restaurant");

document.addEventListener("DOMContentLoaded", async (event) => {
  removeWantButton.forEach((button) => {
    button.addEventListener("click", async (e) => {
      // e.preventDefault();
      const body = { restaurantId: e.target.id };
      console.log("target", e.target.id);
      // addVisitedButton.classList.add("hidden");
      button.classList.add("hidden");
      console.log("hello");

      wantRestaurantInfo.forEach((info) => {
        // if(info.id === e.target.id)
        //  info.classList.add("hidden")
        if (e.target.id == info.id) info.innerHTML = "";
      });

      try {
        const res = await fetch("/restaurants/want-to-visit/delete", {
          method: "DELETE",
          body: JSON.stringify(body),
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

        console.log(json);
      } catch (err) {
        console.log(err);
      }
    });
  });
});