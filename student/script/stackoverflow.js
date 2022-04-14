const message = document.getElementById("message");
const answers = new Map();

function addMessage(id, title) {
  const newMessage = document.createElement("div");
  newMessage.innerText = title;
  newMessage.id = id;
  newMessage.onclick = () => {
    console.log(answers.get(id));
  };
  message.appendChild(newMessage);
}

function search() {
  const data = document.querySelector("#myInput").value;
  const apiUrl =
    "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=" +
    data;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const questoins = [];

      data.items.forEach((item) => {
        questoins.push({
          id: item.question_id,
          title: item.title,
        });
        addMessage(item.question_id, item.title);
      });

      console.log(questoins);
      questoins.forEach((item) => {
        fetch(
          "https://api.stackexchange.com/2.3/questions/" +
            item.id +
            "/answers?site=stackoverflow",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
          .then((res) => res.json())
          .then((ans) => {
            answers.set(item.id, ans.items);
          });
      });
    });
}

const stackoverflowAccessToken = localStorage.getItem(
  "STACKOVERFLOW_ACCESS_TOKEN"
);
if (!stackoverflowAccessToken) {
  window.location.href =
    "http://127.0.0.1:5500/pages/student/student-panel.html";
}

SE.init({
  clientId: 23251,
  key: "EbjpaG07VQK6mQ3e)e0)aQ((",
  channelUrl: "http://127.0.0.1:5500/pages/student/blank.html",
  complete: (data) => {
    console.log(data);
  },
});

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
