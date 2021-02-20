document.querySelector("input").addEventListener("keyup", async e => {
  console.log(e);
  if (e.key == "Enter") {
    try {
      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: `{"data":"${document.querySelector("input").value}"}` // body data type must match "Content-Type" header
      });
    } catch (e) {
      document.querySelector(
        "label"
      ).innerHTML = `<span style="color: ##b86f6f">Stop sending to fast!</span>`;
      setTimeout(() => {
        document.querySelector(
          "label"
        ).innerHTML = `What would you like to send?`;
      });
    }
  }
});

fetch("/api" /*using a named function to make a loop*/).then(gotData);

async function gotData(data) {
  const json = await data.json();
  document.querySelector(".messages").innerHTML = "";
  for (const msg of json) {
    const txt = msg.data;
    const elt = document.createElement("p");
    elt.innerHTML = txt;
    document.querySelector(".messages").appendChild(elt);
  }
  setTimeout(() => fetch("/api").then(gotData), 1000);
}

window.setInterval(function() {
  var elem = document.querySelector(".messages");
  elem.scrollTop = elem.scrollHeight;
}, 100);
