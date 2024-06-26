const signUp = (e) => {
  let fname = document.getElementById("fullname").value;
  let lname = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let pwd = document.getElementById("password").value;
  let formData = JSON.parse(localStorage.getItem("formData")) || [];
  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem("formData")).some(
      (data) =>
        data.fname.toLowerCase() == fname.toLowerCase() &&
        data.lname.toLowerCase() == lname.toLowerCase()
    );
  if (!exist) {
    formData.push({ fname, lname, email, pwd });
    localStorage.setItem("formData", JSON.stringify(formData));
    document.querySelector("form").reset();
    document.getElementById("fname").focus();
    alert("Account Created.\nNow you can sign in");
  } else {
    alert("Ooopppssss..\nYou have already signed up");
  }
  e.preventDefault();
};
let tbody = document.querySelector("tbody");
async function displayData() {
  tbody.innerHTML = "";
  const response= await fetch('http://localhost:8000/users')
  const res= await response.json()
  const users = res.data
  users.forEach((user, i) => {
    tbody.innerHTML += `<tr>
   <td>${++i}</td>
   <td>${user.fullname}</td>
   <td>${user.email}</td>
   <td>${user.username}</td>
   <td>${user.pwd}</td>
   <td>
   <button class= "btn3" onclick = "deleteUser('${user.email}')">Delete</button>
   </td>
   </tr>
   `;
  });
  e.preventDefault();
}
// deleteUser = (email) => {
//   console.log(email);
//   if (confirm("Are you sure You want to delete this User")) {
//     const posts = JSON.parse(localStorage.getItem("formData")) || [];
//     const newPost = posts.filter((item) => item.email != email);
//     localStorage.setItem("formData", JSON.stringify(newPost));
//     displayData();
//   }
// };
async function displayData() {
  tbody.innerHTML = "";
  const response = await fetch('http://localhost:8000/users');
  const res = await response.json();
  const users = res.data;
  users.forEach((user, i) => {
    tbody.innerHTML += `<tr>
      <td>${++i}</td>
      <td>${user.fullname}</td>
      <td>${user.email}</td>
      <td>${user.username}</td>
      <td>${user.pwd}</td>
      <td>
        <button class="btn3" onclick="deleteUser('${user._id}')">Delete</button>
      </td>
    </tr>`;
  });
}

async function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        // User deleted successfully, update the UI
        displayData();
        console.log("User deleted successfully");
      } else if (response.status === 404) {
        console.error("User not found");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}


function signIn(e) {
  let email = document.getElementById("email").value;
  let pwd = document.getElementById("pwd").value;
  let formData = JSON.parse(localStorage.getItem("formData")) || [];
  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem("formData")).some(
      (data) =>
        data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd
    );
  console.log(exist);
  if (!exist) {
    alert("Invalid email or password");
  } else {
    const user = JSON.parse(localStorage.getItem("formData")).filter(
      (item) => item.email == email && item.pwd == pwd
    )[0];
    if (user.role.toLowerCase() == "admin") {
      location.href = "/dashboard.html";
    } else {
      location.href = "/index.html";
    }
  }
  e.preventDefault();
}


