export default class Modal {
  constructor(openButton, closeButton, container, className) {
    this.botaoAbrir = document.querySelector(openButton);
    this.botaoFechar = document.querySelector(closeButton);
    this.containerModal = document.querySelector(container);

    this.toggleModal = this.toggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);

    this.className = className;
  }

  toggleModal(event) {
    event.preventDefault();
    this.containerModal.classList.toggle(this.className);
  }

  cliqueForaModal(event) {
    if (event.target === event.currentTarget) {
      this.toggleModal(event);
    }
  }

  init() {
    if (this.botaoAbrir && this.botaoFechar && this.containerModal) {
      this.botaoAbrir.addEventListener("click", this.toggleModal);
      this.botaoFechar.addEventListener("click", this.toggleModal);
      this.containerModal.addEventListener("click", this.cliqueForaModal);
    }
  }
}
