import outsideClick from "./outsideclick.js";

export default class DropdownMenu {
  constructor(selector) {
    this.dropdownMenus = document.querySelectorAll(selector);
  }

  // Adicionando os eventos de clicks
  addEventForAll() {
    this.dropdownMenus.forEach((menu) => {
      ["touchstart", "click"].forEach((userEvent) => {
        menu.addEventListener(userEvent, this.handleClick);
      });
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.classList.add("active");

    // Pegando uma função externa pra filtrar os clicks e impedir "Cliques duplos"
    outsideClick(this, ["touchstart", "click"], () => {
      this.classList.remove("active");
    });
  }

  init() {
    this.addEventForAll();
  }
}
