import Slide from "./slide.js";

export default class SlideNav extends Slide {
  addNavElements(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);

    this.prevElement.addEventListener("click", this.navToPrev);
    this.nextElement.addEventListener("click", this.navToNext);
  }

  createNavBar(element, customControls) {
    if (!customControls) {
      const div = document.createElement("ul");
      const el = document.querySelector(element);
      this.configSlides.forEach((configItem, i) => {
        div.innerHTML += `<li data-slide-index="${i + 1}"><a href="#slide${
          i + 1
        }"></a></li>`;
      });
      el.appendChild(div);
      this.navElements = div;
      this.addControlEvents();
    } else {
      this.navElements = document.querySelector(customControls);
      this.addControlEvents();
    }
  }

  addColtrol(element) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      this.navTo(+(event.currentTarget.getAttribute("data-slide-index") - 1));
    });
  }

  addControlEvents() {
    const liElements = [...this.navElements.children];
    liElements.forEach((element) => {
      this.addColtrol(element);
    });
  }

  navTo(index) {
    if (super.navTo(index)) {
      const liElements = [...this.navElements.children];
      liElements.forEach((i) => {
        i.classList.remove("active");
      });
      const li = liElements[index];
      li.classList.add("active");
    }
  }
}
