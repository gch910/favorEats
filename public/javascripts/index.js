

document.addEventListener("DOMContentLoaded", async (event) => {
  const commentForm = document.querySelector(".comment-form");
  commentForm.addEventListener("submit", async (e) => {
    console.log('hello!')
    // e.preventDefault();
    const formData = new FormData(commentForm);

    const userComment = formData.get("comment");

    const body = { userComment }
    try {
      const comment = await fetch("http://localhost:8080/restaurants/comment", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!res.ok) {
        throw res;
      }

      // window.location.href = '/'
      const json = await comment.json();

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  });
});
