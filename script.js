//Marrige date counter
document.addEventListener("DOMContentLoaded", function() {
  const day = document.querySelector(".day");
  const countDownDate = new Date("Sep 15, 2021 00:00:00").getTime();
  const getMarriageDateCounter = () => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    // Time calculations for days
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // Display the result in the element
    day.innerHTML = `${days} days to go`;
    // If the count down is finished, write some text
    if (distance <= 0) {
      day.innerHTML = "Wedding Day!";
    }
  };

  getMarriageDateCounter();
});

//////////////////////

const sendRsvpData = async data => {
  const baseUrl = "http://localhost:3000";
  const url = baseUrl + "/rsvp";

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
  return await response.json(); // parses JSON response into native JavaScript objects
};

const form = document.querySelector(".signup-form");
const success = document.querySelector('.success');
const error = document.querySelector('.error');

//Function to get form values
const getInputValue = id => {
  return document.getElementById(id).value;
};

//Submit form
form.addEventListener("submit", e => {
  e.preventDefault();
  //get values
  const data = {
    firstName: getInputValue("firstname"),
    lastName: getInputValue("lastname"),
    email: getInputValue("email"),
    plusGuests: getInputValue("controlselector"),
    password: getInputValue("password").toLowerCase()
  };

  sendRsvpData(data)
    .then(response => {
      const isSuccess = response.isSuccess;

      if (isSuccess) {
        showMessage(success)
      } else {
        showMessage(error)
      }
    })
    .catch(error => {
      console.error(error);
    });
});

const showMessage = (domElement) => {
  domElement.style.display = 'inline-block';

  setTimeout(function(){
    domElement.style.display = 'none';
  }, 5000);
}
