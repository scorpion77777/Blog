const newFormHandler = async (event) => {
  try {
    event.preventDefault();

    ///// Values from  title and content from input fields /////

    const title = document.querySelector("#new-blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();

    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({
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
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);
