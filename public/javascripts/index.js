const commentForm = document.querySelector(".comment-form");
const commentDiv = document.getElementById("all-comments")

document.addEventListener("DOMContentLoaded", async (event) => {
  commentForm.addEventListener("submit", async (e) => {
    console.log('hello!')
    e.preventDefault();
    const formData = new FormData(commentForm);
    console.log("target", e.target)
    const userComment = formData.get("comment");
    const token = formData.get("_csrf")
    const body = { 
      comment: userComment,
      restaurantId: e.target.id
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
      const newCommentDiv = document.createElement('div');
      const comment = document.createTextNode(json.comment)
      newCommentDiv.appendChild(comment)
      commentDiv.appendChild(newCommentDiv)

    } catch (err) {
      console.log(err);
    }
  });
});
