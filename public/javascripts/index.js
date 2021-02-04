

document.addEventListener("DOMContentLoaded", async (event) => {
  const commentForm = document.querySelector(".comment-form");
  commentForm.addEventListener("submit", async (e) => {
    console.log('hello!')
    e.preventDefault();
    const formData = new FormData(commentForm);
    console.log(e.target.id)
    const userComment = formData.get("comment");

    const body = { comment: userComment } 
    try {
      console.log("inside try")
      const res = await fetch("http://localhost:8080/restaurants/comment", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("-------")
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
