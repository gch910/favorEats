const commentForm = document.querySelector(".comment-form");

document.addEventListener("DOMContentLoaded", (event) => {
  commentForm.addEventListener("submit", async (e) => {
    console.log('hello!')
    e.preventDefault();
    const formData = new FormData(commentForm);

    const userComment = formData.get("comment");

    //   const body = { userComment }
    try {
      const comment = await fetch("http://localhost:8080/restaurants/comment", {
        method: "POST",
        body: userComment,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await comment.json();

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  });
});
