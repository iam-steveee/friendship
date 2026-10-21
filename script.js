(() => {
  "use strict";

  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf8i-aBT4vX4xNbEUkMEsRyS3v1hvcF11MKyITgsljeOW32cQ/viewform?usp=header";
  const welcome = document.getElementById("welcome");
  const openButton = document.getElementById("open-letter");
  const letterSection = document.getElementById("letter-section");
  const formButton = document.getElementById("form-button");
  const buttonLabel = document.getElementById("button-label");
  const invitationCopy = document.getElementById("invitation-copy");
  const footnote = document.getElementById("button-footnote");
  const toast = document.getElementById("toast");
  let hasClickedOnce = false;
  let opening = false;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 1800);
  }

  openButton.addEventListener("click", () => {
    if (opening) return;
    opening = true;

    // 1) Envelope flap opens first.
    welcome.classList.add("opening");

    // 2) After a short pause, the note slides out.
    window.setTimeout(() => {
      welcome.classList.add("note-out");

      // 3) Let the note be seen for a moment, then fade to the letter.
      window.setTimeout(() => {
        welcome.classList.add("leaving");
        window.setTimeout(() => {
          welcome.hidden = true;
          letterSection.hidden = false;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 650);
      }, 1500);
    }, 950);
  });

  formButton.addEventListener("click", () => {
    if (!hasClickedOnce) {
      hasClickedOnce = true;
      // Vibration is available on some mobile browsers only.
      try {
        if ("vibrate" in navigator) navigator.vibrate(35);
      } catch (_) {}

      buttonLabel.textContent = "Click me again";
      formButton.classList.add("is-second");
      invitationCopy.textContent = "Ohhh, so you really wanna be friends. Yayyyy! Click that button immediately!";
      footnote.textContent = "Okay, okay... this is your sign. One more click! ♡";
      showToast("Psst... one more click! ♡");
      return;
    }

    window.location.href = formUrl;
  });
})();