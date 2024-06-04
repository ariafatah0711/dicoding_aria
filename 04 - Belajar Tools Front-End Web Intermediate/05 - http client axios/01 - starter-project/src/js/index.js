import axios from "axios";

const CONFIG = {
  BASE_URL: "https://yesno.wtf/api",
  BASE_URL_WITH_FORCED: (forcedValue) => `https://yesno.wtf/api?force=${forcedValue}`,
};

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#questionForm");
  const forcedAnswerCheckbox = document.querySelector("#forcedAnswerCheckbox");
  const forcedAnswerContainer = document.querySelector("#forcedAnswerContainer");
  const forcedAnswerRadios = document.querySelectorAll('input[name="forcedAnswer"]');
  const textAnswer = document.querySelector("#textAnswer");

  function getCheckedRadios(radioElements) {
    return [...radioElements].filter((item) => item.checked)[0];
  }

  function setLoading(element) {
    element.textContent = "Loading...";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const checkedForcedAnswerRadio = getCheckedRadios(forcedAnswerRadios);
    let endpoint = CONFIG.BASE_URL;
    if (checkedForcedAnswerRadio) {
      endpoint = CONFIG["BASE_URL_WITH_FORCED"](checkedForcedAnswerRadio.value);
    }

    // Set conditional endpoint
    if (checkedForcedAnswerRadio) {
      console.log(checkedForcedAnswerRadio.value);
    }

    setLoading(textAnswer);
    console.log("Kirim HTTP request ke web server");
    console.log(endpoint);

    const response = await axios(endpoint);
    textAnswer.textContent = response.data.answer;
  });

  forcedAnswerCheckbox.addEventListener("change", (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      forcedAnswerContainer.style.display = "block";
    } else {
      forcedAnswerContainer.style.display = "none";
      getCheckedRadios(forcedAnswerRadios).checked = false;
    }
  });
});
