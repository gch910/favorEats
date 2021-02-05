const commentForm = document.querySelector(".comment-form");
const commentDiv = document.getElementById("all-comments")
const userComment = document.querySelector(".user-comment")
document.addEventListener("DOMContentLoaded", async (event) => {
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    console.log("target", e.target)
    const userComment = formData.get("comment");
    const userRating = formData.get("rate");
    const body = { 
      comment: userComment,
      restaurantId: e.target.id,
      rating: userRating
   }
   
    try {
      console.log("inside try")
      const res = await fetch("http://localhost:8080/restaurants/comment", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          // 'X-CSRF-TOKEN': token

        },
        // credentials: "include"
      });
      console.log("-------")
      if (!res.ok) {
        throw res;
      }
      
      // window.location.href = '/'
      const json = await res.json();

    // let totalRating = 0;
    // let counter = 0;
    // restaurantRatings.forEach((eachRating) => {
    //   counter++;
    //   const parsedRating = parseInt(eachRating.rating, 10);
    //   totalRating += parsedRating
    // });
    // const restaurantRating = Math.floor(totalRating / counter);

      console.log(json)
      const newCommentDiv = document.createElement('div');
      const comment = document.createTextNode(json.comment)
      newCommentDiv.appendChild(comment)
      commentDiv.appendChild(newCommentDiv)

    } catch (err) {
      console.log(err);
    }
  });
  
});
