const editFormHandler = async (event) => {
  try {
    event.preventDefault();

    // collect values of the title and content from input fields
    const title = document.querySelector("#new-blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();

    // collect value of the blog_id from the button href
    const id = document.querySelector(".submit-blog-btn").getAttribute("value");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        blog_id: id,
        title,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
  } catch (err) {
    console.log(err);
    alert(response.statusText);
  }
};

document
  .querySelector(".submit-blog-btn")
  .addEventListener("click", editFormHandler);
