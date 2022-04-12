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
