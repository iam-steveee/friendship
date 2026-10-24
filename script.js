(() => {
  "use strict";

  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf8i-aBT4vX4xNbEUkMEsRyS3v1hvcF11MKyITgsljeOW32cQ/viewform?usp=header";
  const welcome = document.getElementById("welcome");
  const openButton = document.getElementById("open-letter");
  const letterSection = document.getElementById("letter-section");
  const letterBody = document.getElementById("letter-body");
  const signatureBlock = document.querySelector(".signature-block");
  const flowerDivider = document.querySelector(".flower-divider");
  const formInvitation = document.querySelector(".form-invitation");
  const formButton = document.getElementById("form-button");
  const buttonLabel = document.getElementById("button-label");
  const invitationCopy = document.getElementById("invitation-copy");
  const footnote = document.getElementById("button-footnote");
  const toast = document.getElementById("toast");
  const note = document.getElementById("env-note");
  const music = document.getElementById("background-music");
  let hasClickedOnce = false;
  let opening = false;
  let typingStarted = false;

  music.loop = true;
  music.controls = false;
  music.preload = "auto";

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 2400);
  }

  function makeTextNodesTypeable(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      const replacement = document.createDocumentFragment();
      const holder = document.createElement("span");
      holder.className = "typed-text";
      holder.dataset.fullText = text;
      holder.textContent = "";
      replacement.appendChild(holder);
      node.parentNode.replaceChild(replacement, node);
      return;
    }
    Array.from(node.childNodes).forEach(makeTextNodesTypeable);
  }

  // Preserve inline formatting (such as the emphasized MISSION) while preparing text for reveal.
  function prepareTyping() {
    if (typingStarted) return;
    typingStarted = true;
    letterBody.querySelectorAll("p").forEach((paragraph) => {
      Array.from(paragraph.childNodes).forEach(makeTextNodesTypeable);
      paragraph.classList.add("type-paragraph");
    });
    [signatureBlock, flowerDivider, formInvitation].forEach((element) => {
      element.classList.add("reveal-after-typing");
    });
  }

  function typeLetter() {
    prepareTyping();
    const paragraphs = Array.from(letterBody.querySelectorAll("p"));
    const textNodes = Array.from(letterBody.querySelectorAll(".typed-text"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      textNodes.forEach((node) => { node.textContent = node.dataset.fullText; });
      [signatureBlock, flowerDivider, formInvitation].forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    let nodeIndex = 0;
    let charIndex = 0;
    let current = textNodes[nodeIndex];
    const typeNext = () => {
      if (!current) {
        [signatureBlock, flowerDivider, formInvitation].forEach((element, index) => {
          window.setTimeout(() => element.classList.add("is-revealed"), index * 420);
        });
        return;
      }
      const fullText = current.dataset.fullText || "";
      if (charIndex < fullText.length) {
        current.textContent += fullText.charAt(charIndex);
        const char = fullText.charAt(charIndex);
        charIndex++;
        let delay = 11;
        if (/[,.!?]/.test(char)) delay = 115;
        else if (char === " ") delay = 5;
        window.setTimeout(typeNext, delay);
        return;
      }
      nodeIndex++;
      current = textNodes[nodeIndex];
      charIndex = 0;
      window.setTimeout(typeNext, current ? 18 : 250);
    };
    typeNext();
  }

  function showLetter() {
    welcome.hidden = true;
    letterSection.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
    typeLetter();
  }

  openButton.addEventListener("click", () => {
    if (opening) return;
    opening = true;

    // The tap is the browser-approved gesture for starting audio with sound.
    music.currentTime = 0;
    const playback = music.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => showToast("Tap the letter again if the music doesn't start."));
    }

    welcome.classList.add("opening");
    let finished = false;
    function leave() {
      if (finished) return;
      finished = true;
      window.setTimeout(() => {
        welcome.classList.add("leaving");
        window.setTimeout(showLetter, 620);
      }, 550);
    }
    note.addEventListener("animationend", leave, { once: true });
    window.setTimeout(leave, 3600);
  });

  formButton.addEventListener("click", () => {
    if (!hasClickedOnce) {
      hasClickedOnce = true;
      try { if ("vibrate" in navigator) navigator.vibrate(35); } catch (_) {}
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
