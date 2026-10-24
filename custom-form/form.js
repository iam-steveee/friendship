(() => {
  "use strict";
  const schema = window.FORM_SCHEMA;
  const config = window.FORM_CONFIG || {};
  const form = document.getElementById("friendship-form");
  const genderOptions = document.getElementById("gender-options");
  const genderSection = document.getElementById("gender-section");
  const branchSection = document.getElementById("branch-section");
  const branchTitle = document.getElementById("branch-title");
  const branchDescription = document.getElementById("branch-description");
  const branchFooter = document.getElementById("branch-footer");
  const questionsContainer = document.getElementById("questions-container");
  const progressBar = document.getElementById("progress-bar");
  const progressPercent = document.getElementById("progress-percent");
  const stepLabel = document.getElementById("step-label");
  const submitButton = document.getElementById("submit-button");
  const continueButton = document.getElementById("continue-button");
  const backButton = document.getElementById("back-button");
  const formActions = document.getElementById("form-actions");
  const submitLabel = document.getElementById("submit-label");
  const successCard = document.getElementById("success-card");
  const errorCard = document.getElementById("error-card");
  const errorMessage = document.getElementById("error-message");
  const retryButton = document.getElementById("retry-button");
  const transportForm = document.getElementById("transport-form");
  const transportPayload = document.getElementById("transport-payload");
  const transportWebsite = document.getElementById("transport-website");
  const frame = document.getElementById("submission-frame");
  const encoder = new TextEncoder();
  let selectedGender = "";
  let sending = false;
  let pendingPayload = null;
  let timeoutHandle = null;

  document.getElementById("form-title").textContent = schema.title;
  document.getElementById("form-description").textContent = schema.description;

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderGender() {
    schema.gender.options.forEach((option, index) => {
      const label = el("label", "choice-option");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "gender";
      input.value = option;
      input.required = true;
      input.id = "gender-" + index;
      input.addEventListener("change", () => {
        selectedGender = option;
        if (!sending) pendingPayload = null;
        document.getElementById("gender-error").textContent = "";
        updateProgress();
      });
      const span = el("span", "", option);
      label.append(input, span);
      genderOptions.appendChild(label);
    });
  }

  function renderBranch() {
    const branch = selectedGender === "Female" ? schema.female : schema.male;
    branchTitle.textContent = branch.title;
    branchDescription.textContent = branch.description;
    questionsContainer.replaceChildren();
    branchFooter.hidden = !branch.footer;
    branchFooter.textContent = branch.footer || "";
    branch.questions.forEach((question, index) => {
      const block = el("div", "question-block");
      block.dataset.questionId = question.id;
      const label = el("label", "question-title", question.q);
      label.id = "label-" + question.id;
      label.htmlFor = "answer-" + question.id;
      if (question.required) label.appendChild(el("span", "required-star", "*"));
      else label.appendChild(el("span", "optional-label", "Optional"));
      block.appendChild(label);

      if (question.type === "radio" || question.type === "checkbox") {
        const list = el("div", "choice-list");
        list.setAttribute("role", "group");
        list.setAttribute("aria-labelledby", label.id);
        question.options.forEach((option, optionIndex) => {
          const choice = el("label", "choice-option");
          const input = document.createElement("input");
          input.type = question.type;
          input.name = "answer-" + question.id;
          input.value = option;
          input.id = "answer-" + question.id + "-" + optionIndex;
          input.dataset.questionId = question.id;
          input.dataset.required = String(question.required);
          choice.append(input, el("span", "", option));
          list.appendChild(choice);
        });
        block.appendChild(list);
      } else {
        const input = document.createElement(question.type === "textarea" ? "textarea" : "input");
        input.id = "answer-" + question.id;
        input.name = input.id;
        input.className = question.type === "textarea" ? "answer-textarea" : "answer-input";
        if (question.type !== "textarea") input.type = "text";
        input.dataset.questionId = question.id;
        input.dataset.required = String(question.required);
        input.autocomplete = "off";
        if (question.minWords) {
          input.dataset.minWords = String(question.minWords);
          input.dataset.maxWords = String(question.maxWords);
          input.placeholder = `At least ${question.minWords} words`;
        } else if (question.type === "textarea") {
          input.rows = 4;
        }
        block.appendChild(input);
      }
      block.appendChild(el("p", "question-error"));
      questionsContainer.appendChild(block);
    });
    submitLabel.textContent = "Submit my answers";
    updateProgress();
  }

  function updateProgress() {
    if (!selectedGender) {
      progressBar.style.width = "0%";
      progressPercent.textContent = "0%";
      stepLabel.textContent = "Step 1 of 2";
      return;
    }
    if (branchSection.hidden) {
      progressBar.style.width = "50%";
      progressPercent.textContent = "50%";
      stepLabel.textContent = "Step 1 of 2";
      return;
    }
    const questions = (selectedGender === "Female" ? schema.female : schema.male).questions;
    const allInputs = Array.from(questionsContainer.querySelectorAll("[data-question-id]"));
    const answered = new Set();
    allInputs.forEach(input => {
      if (input.type === "checkbox" || input.type === "radio") {
        if (input.checked) answered.add(input.dataset.questionId);
      } else if (input.value.trim()) answered.add(input.dataset.questionId);
    });
    const percent = 50 + Math.round((answered.size / Math.max(1, questions.length)) * 50);
    progressBar.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    stepLabel.textContent = `${answered.size} of ${questions.length} answered`;
  }

  function getQuestions() {
    return selectedGender === "Female" ? schema.female.questions : schema.male.questions;
  }

  function collectAndValidate() {
    let valid = true;
    const answers = { gender: selectedGender, branch: selectedGender === "Female" ? "Wanna Be Friends ✨" : "What's up Man" };
    questionsContainer.querySelectorAll(".question-block").forEach(block => {
      const q = getQuestions().find(item => item.id === block.dataset.questionId);
      const inputs = Array.from(block.querySelectorAll("[data-question-id]"));
      const err = block.querySelector(".question-error");
      err.textContent = "";
      let value;
      if (q.type === "radio") value = (inputs.find(input => input.checked) || {}).value || "";
      else if (q.type === "checkbox") value = inputs.filter(input => input.checked).map(input => input.value);
      else value = (inputs[0] && inputs[0].value || "").trim();

      let message = "";
      const empty = Array.isArray(value) ? value.length === 0 : !value;
      if (q.required && empty) message = "Please answer this question.";
      if (!message && !empty && q.minWords) {
        const count = value.trim().split(/\s+/).filter(Boolean).length;
        if (count < q.minWords) message = `Please write at least ${q.minWords} words. (Currently ${count}.)`;
        if (q.maxWords && count > q.maxWords) message = `Please keep this to ${q.maxWords} words or fewer.`;
      }
      if (message) {
        valid = false;
        err.textContent = message;
      } else if (!empty) {
        answers[q.id] = value;
      }
    });
    if (!selectedGender) {
      document.getElementById("gender-error").textContent = "Please select an option.";
      valid = false;
    } else {
      document.getElementById("gender-error").textContent = "";
    }
    if (!valid) {
      const firstError = form.querySelector(".question-error:not(:empty)") || document.getElementById("gender-error");
      firstError.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    }
    return valid ? answers : null;
  }

  function b64(bytes) {
    let binary = "";
    const arr = new Uint8Array(bytes);
    for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
    return btoa(binary);
  }

  function randomId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = new Uint8Array(16);
    crypto.getRandomValues(b);
    return Array.from(b, x => x.toString(16).padStart(2, "0")).join("");
  }

  async function encryptAnswers(answers) {
    if (!window.crypto || !crypto.subtle) throw new Error("This browser does not support secure encryption. Please use an updated browser over HTTPS.");
    if (!config.publicKeySpkiB64 || config.publicKeySpkiB64.includes("PASTE_")) throw new Error("The form has not been configured with its public encryption key yet.");
    const publicBytes = Uint8Array.from(atob(config.publicKeySpkiB64.replace(/\s/g, "")), c => c.charCodeAt(0));
    const publicKey = await crypto.subtle.importKey("spki", publicBytes, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
    const aesKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plaintext = encoder.encode(JSON.stringify({ ...answers, submittedAtClient: new Date().toISOString() }));
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, plaintext);
    const rawAes = await crypto.subtle.exportKey("raw", aesKey);
    const wrappedKey = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, rawAes);
    return {
      v: 1,
      id: randomId(),
      algorithm: "RSA-OAEP-256+A256GCM",
      wrappedKey: b64(wrappedKey),
      iv: b64(iv),
      ciphertext: b64(ciphertext)
    };
  }

  function setSending(state) {
    sending = state;
    submitButton.disabled = state;
    submitLabel.textContent = state ? "Sending encrypted answers…" : "Submit my answers";
  }

  function showError(message) {
    clearTimeout(timeoutHandle);
    setSending(false);
    errorMessage.textContent = message;
    errorCard.hidden = false;
    errorCard.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function sendPayload(payload) {
    if (!config.endpoint || !/^https:\/\/script\.google\.com\/macros\/s\//.test(config.endpoint)) {
      showError("The submission endpoint has not been configured yet. The form owner must finish the setup steps in the README.");
      return;
    }
    pendingPayload = payload;
    transportForm.action = config.endpoint;
    transportPayload.value = JSON.stringify(payload);
    transportWebsite.value = "";
    errorCard.hidden = true;
    setSending(true);
    try { transportForm.submit(); }
    catch (_) { showError("The browser couldn't send the submission. Please try again."); return; }
    timeoutHandle = window.setTimeout(() => {
      showError("We couldn't confirm the server's reply. Your answers may or may not have arrived. Wait a moment before retrying to avoid a duplicate submission.");
    }, 25000);
  }

  window.addEventListener("message", event => {
    if (event.source !== frame.contentWindow || !event.data || event.data.source !== "steve-friendship-form") return;
    if (event.data.status === "success") {
      clearTimeout(timeoutHandle);
      setSending(false);
      form.hidden = true;
      document.querySelector(".progress-wrap").hidden = true;
      successCard.hidden = false;
      successCard.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (event.data.status === "error") {
      showError("The server couldn't save this submission. Please try again later.");
    }
  });

  continueButton.addEventListener("click", () => {
    if (!selectedGender) {
      document.getElementById("gender-error").textContent = "Please select an option.";
      document.getElementById("gender-error").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    renderBranch();
    genderSection.hidden = true;
    branchSection.hidden = false;
    formActions.hidden = false;
    branchSection.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    updateProgress();
  });
  backButton.addEventListener("click", () => {
    if (sending) return;
    branchSection.hidden = true;
    formActions.hidden = true;
    genderSection.hidden = false;
    updateProgress();
    genderSection.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  form.addEventListener("input", () => { if (!sending) pendingPayload = null; updateProgress(); });
  form.addEventListener("change", updateProgress);
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (sending) return;
    errorCard.hidden = true;
    const answers = collectAndValidate();
    if (!answers) return;
    if (!pendingPayload) {
      setSending(true);
      try { pendingPayload = await encryptAnswers(answers); }
      catch (error) { showError(error.message || "Encryption failed in this browser."); return; }
      setSending(false);
    }
    sendPayload(pendingPayload);
  });
  retryButton.addEventListener("click", () => {
    errorCard.hidden = true;
    if (pendingPayload) sendPayload(pendingPayload);
    else form.requestSubmit();
  });

  renderGender();
  updateProgress();
})();
