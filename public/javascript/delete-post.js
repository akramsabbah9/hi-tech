const deleteFormHandler = async event => {
    event.preventDefault();

    const url = window.location.toString().split("/");
    const id = url[url.length - 1];

    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    }
    else {
        alert(response.statusText);
    }
};

document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);