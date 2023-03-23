document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    email: email,
    password: password,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(
    "https://my-brand-backend-production-6c58.up.railway.app/login",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status == 200) {
        alert("Log in  Successfuly");
        localStorage.setItem("loginedUser", JSON.stringify(result.data));
        if (result.data.user.role == "Admin") {
          location.href = "./adminPage.html";
        } else {
          location.href = "/allBlogs.html";
        }
      } else {
        alert(result.error);
      }
    })
    .catch((error) => console.log("error", error));
});
