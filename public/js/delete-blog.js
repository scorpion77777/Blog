const deleteFormHandler = async (event) => {
  try {
    event.preventDefault();

    // Collect value of blog_id from the button href
    const id = document.querySelector(".delete-blog-btn").getAttribute("value");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        blog_id: id,
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
  .querySelector(".delete-blog-btn")
  .addEventListener("click", deleteFormHandler);
