export default class ScrollSuave {
  constructor(selector, options) {
    this.linksInternos = document.querySelectorAll(selector);
    if (this.options) {
      this.options = options;
    } else {
      this.options = {
        behavior: "smooth",
        block: "start",
      };
    }

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    section.scrollIntoView(this.options);
  }

  addEventClick() {
    this.linksInternos.forEach((link) => {
      link.addEventListener("click", this.scrollToSection);
    });
  }

  init() {
    this.addEventClick();
  }
}
