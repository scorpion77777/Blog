const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment-content").value.trim();

  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  //   users can't submit empty comments
  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ blog_id, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
