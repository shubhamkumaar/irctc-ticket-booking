function get_login_btn() {
  const btn = document.getElementsByClassName("loginText")[0];
  btn.click();
}
get_login_btn();

function waitForElement(selector, callback, timeout = 10000) {
  const startTime = Date.now();
  const checkInterval = setInterval(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      clearInterval(checkInterval);
      callback(elements);
    } else if (Date.now() - startTime > timeout) {
      clearInterval(checkInterval);
      console.error(
        `Timeout after waiting ${timeout}ms for element(s) "${selector}"`
      );
    }
  }, 100);
}

function enter_captcha() {
  let captcha = prompt("Enter the captcha");
  const enter = () => {
    waitForElement("#captcha", (element) => {
      element[0].value = captcha;
      element[0].dispatchEvent(new Event("input", { bubbles: true }));
      const btn = document.getElementsByClassName("train_Search");
      for (let i = 0; i < btn.length; i++) {
        if (btn[i].innerText === "SIGN IN") {
          btn[i].click();
          search();
          break;
        }
      }
    });
  };
  enter();
  if (captcha !== null) {
    enter();
  }
  if (captcha) {
    const closeBtn = document.getElementsByClassName("close-btn-modal")[0];
    // console.log(closeBtn);
    closeBtn.click();
  }
  // console.log(captcha);
}

async function create_img(targetImage) {
  // Create the modal container
  const modal = document.createElement("div");
  modal.style.display = "none"; // Hidden by default
  modal.style.position = "fixed";
  modal.style.zIndex = "1000";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.overflow = "auto";
  modal.style.backgroundColor = "rgba(0,0,0,0.9)";

  // Create the image element
  const modalImg = document.createElement("img");
  modalImg.style.margin = "auto";
  modalImg.style.display = "block";
  modalImg.style.maxWidth = "200%";
  modalImg.style.maxHeight = "200%";
  modalImg.style.top = "30%";
  modalImg.style.width = "71rem";
  modalImg.style.height = "17.5rem";
  modalImg.style.marginTop = "15%";
  modalImg.className = "created-img";
  modal.appendChild(modalImg);

  // Create the close button
  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "50%";
  closeBtn.style.right = "35px";
  closeBtn.style.color = "#f1f1f1";
  closeBtn.style.fontSize = "40px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";
  closeBtn.className = "close-btn-modal";
  modal.appendChild(closeBtn);

  // Append the modal to the body
  document.body.appendChild(modal);

  // Event listener to close the modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Function to display the modal with the specified image
  function showImageModal(imageUrl) {
    modalImg.src = imageUrl;
    modal.style.display = "block";
  }

  // Attach click event to the target image

  if (targetImage) {
    targetImage.style.cursor = "pointer";
    showImageModal(targetImage.src);
  }
  // console.log("Img Src", targetImage.src);
  return true;
}

function fill_username_password() {
  const inputs = document.getElementsByClassName("form-control");
  if (inputs.length >= 2) {
    // Set the value for the username field
    inputs[0].value = "shubham_kumaar";
    // Dispatch the 'input' event for the username field
    inputs[0].dispatchEvent(new Event("input", { bubbles: true }));

    // Set the value for the password field
    inputs[1].value = "@Monujha77";
    // Dispatch the 'input' event for the password field
    inputs[1].dispatchEvent(new Event("input", { bubbles: true }));
  }
}

function find_train() {
  // const train = document.getElementsByClassName("train-heading");
  waitForElement(
    ".form-group .train-heading",
    (element) => {
      for (let i = 0; i < element.length; i++) {
        const train_name = element[i].innerText.split(" ");
        console.log(train_name[train_name.length - 1].slice(1, -1));
      }
    },
    1000
  );
}
async function click_search(element) {
  element[0].value = "SAMASTIPUR JN - SPJ";
  element[0].dispatchEvent(new Event("input", { bubbles: true }));

  element[1].value = "DALSINGH SARAI - DSS";
  element[1].dispatchEvent(new Event("input", { bubbles: true }));

  const btn = document.getElementsByClassName("train_Search");
  // console.log(btn);
  for (let i = 0; i < btn.length; i++) {
    if (btn[i].innerText === "Search") {
      // console.log(btn[i]);

      btn[i].click();
      break;
    }
  }
}
// #captcha

waitForElement(
  ".captcha-img",
  async (elements) => {
    const element = elements[0];
    console.log(element.src);
    const ans = await chrome.runtime.sendMessage({
      type: "captcha",
      imageUrl: element.src,
    });
    console.log("from content.js", ans);

    await create_img(element);
    document
      .getElementsByClassName("created-img")[0]
      .addEventListener("load", () => {
        enter_captcha();
      });
    fill_username_password();
  },
  60000
);

function search() {
  waitForElement(
    ".ui-inputtext",
    async (element) => {
      await click_search(element);
      find_train();
      waitForElement(
        ".fa-repeat",
        (element) => {
          for (let i = 0; i < element.length; i++) {
            element[i].click();
          }
          waitForElement(
            ".pre-avl .AVAILABLE",
            (element) => {
              // console.log(element);

              for (let i = 0; i < element.length; i++) {
                //   // console.log(parent);
                element[i].click();
                const parent =
                  element[i].parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement;
                const train = parent.document.querySelector(".train-heading");
                console.log(train.innerHTML, element[i].innerHTML);

                element[i].style.backgroundColor = "red";
              }
            },
            6000
          );
        },
        6000
      );
    },
    1000
  );
}
