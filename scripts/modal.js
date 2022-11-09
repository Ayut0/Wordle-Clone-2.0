const modalContainer = document.querySelector(".globalContainer");
const modalOverRay = document.querySelector(".modalOverRay");
const showModalBtn = document.querySelector(".showRuleModal");

export const resultModalContainer = modalContainer;
export const resultModalOverRay = modalOverRay;

document.addEventListener("DOMContentLoaded", () => {

    const createModal = () => {
      modalOverRay.classList.add("active");
      const modalBody = document.createElement("div");
      modalBody.classList.add("modal");
      const modalInner = document.createElement("div");
      modalInner.classList.add("modal__inner");
      const modalTitle = document.createElement("div");

      const ruleModal = `
            <div class="modalTop">
              <h3>Welcome to Yutole !!</h3>
              <span class="modalCloseBtn">Close</span>
            </div>
            <h4>How to play</h4>
            <div class="modal__inner-explanation">
                <span>Rule is pretty simple !!</span>
                <span>&nbsp;<b>Guess the word</b> in six trials.</span>
                <span>Each guess, you can put five-letter word.&nbsp;Push Enter button or "Enter key" to submit.</span>
                <span>After each guess, the color of the boxes will change to show how close your guess was to the answer.</span>
            </div>
            <div class="modal__inner-example">
              <span><b>Examples</b></span>
                <div class="examples">
                  <div class="example-box greened">W</div>
                  <div class="example-box">E</div>
                  <div class="example-box">A</div>
                  <div class="example-box">R</div>
                  <div class="example-box">Y</div>
                </div>
              <span>The letter <b>W</b> is in the word and in the correct spot</span>
                <div class="examples">
                  <div class="example-box">R</div>
                  <div class="example-box yellowed">E</div>
                  <div class="example-box">A</div>
                  <div class="example-box">C</div>
                  <div class="example-box">T</div>
                </div>
                <span>The letter <b>E</b> is in the word but in the wrong spot</span>
                <div class="examples">
                  <div class="example-box">I</div>
                  <div class="example-box">N</div>
                  <div class="example-box">P</div>
                  <div class="example-box">U</div>
                  <div class="example-box grayed">T</div>
                </div>
                <span>The letter <b>T</b> is not the word in any spot</span>
            </div>
      `
      modalTitle.innerHTML = ruleModal;
      modalBody.appendChild(modalInner);
      modalInner.appendChild(modalTitle);
      modalContainer.append(modalBody);

      //Show modal by clicking
      showModalBtn.addEventListener("click", ()=>{
        createModal();
      })

      //Rule Modal close
      const ruleModalClose = () =>{
        modalContainer.removeChild(modalBody);
        modalOverRay.classList.remove("active");
      }
      const modalCloseBtn = document.querySelector(".modalCloseBtn");

      modalOverRay.addEventListener("click", ruleModalClose);
      modalCloseBtn.addEventListener("click", ruleModalClose);
    };

    const modalShowInterval = 2000;
    setTimeout(createModal, modalShowInterval)

});

