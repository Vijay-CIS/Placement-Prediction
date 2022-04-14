SE.init({
  clientId: 23251,
  key: "EbjpaG07VQK6mQ3e)e0)aQ((",
  channelUrl: "http://127.0.0.1:5500/pages/student/blank.html",
  complete: (data) => {
    console.log(data);
  },
});

//signin.html
function login() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  if (email == "admin" && pass == "admin") {
    window.location = "/admin/dashboard/index.html";
    return false;
  } else {
    window.location = "/admin/dashboard/401.html";
    return false;
  }
}

//register.html
function register() {
  window.location = "index.html";
}

//student-login.html
function resetAll() {
  document.getElementById("myForm").reset;
}

//add_course.html
function addCourse() {
  event.preventDefault();
  let url = "http://localhost:5000/api/courses";
  let id = document.querySelector("#id").value;
  let code = document.querySelector("#code").value;
  let title = document.querySelector("#title").value;
  let type = document.querySelector("#type").value;
  let data = {
    id: id,
    code: code,
    title: title,
    type: type,
  };
  axios.post(url, data).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}

//leaderboard.html

const search = () => {
  const data = document.querySelector("#myInput").value;
  const api =
    "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=" +
    data;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

function auth() {
  SE.authenticate({
    success: () => {
      console.log("success");
      // window.location.href = "/pages/student/stackoverflow.html";
    },
    error: () => {
      console.log("error");
    },
    scope: ["read_inbox"],
    redirect_uri: "https://stackexchange.com/oauth/login_success",
    networkUsers: true,
  });

  window.location.href =
    "https://stackoverflow.com/oauth/dialog?client_id=23251&scope=no_expiry&redirect_uri=http://127.0.0.1:5500/pages/student/student-panel.html";
}

const urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
if (urlParams.get("access_token")) {
  const accesstoken = urlParams.get("access_token");
  localStorage.setItem("STACKOVERFLOW_ACCESS_TOKEN", accesstoken);
  window.location.href =
    "http://127.0.0.1:5500/pages/student/stackoverflow.html";
}
