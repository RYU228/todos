const bgBtn = document.querySelector(".changeBG");
const body = document.querySelector("body");

bgBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.click();
  input.addEventListener("change", function () {
    if (input.value) {
      //modal_input.value = input.value;
      const str = input.value.split("\\");
      const file = str[str.length - 1];
      const filename = file.split(".");
      const image = new Image();
      image.src = `images/${filename[0]}.jpg`;
      body.appendChild(image);
      image.classList.add("bgImage");
    }
  });
});
