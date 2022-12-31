export default class Tooltip {
  constructor(selector) {
    this.tooltipsContainer = document.querySelectorAll(selector);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // Adicionar o evento mouseover
  addOverEvent() {
    this.tooltipsContainer.forEach((element) => {
      element.addEventListener("mouseover", this.onMouseOver);
    });
  }

  onMouseOver({ currentTarget }) {
    // .constructor para acessar o métrodo statico
    const tooltip = this.constructor.criarTooltipBox(currentTarget);
    // Adicionar o evento de quando o mouse mover e ativar
    // a função onMouseMove
    currentTarget.addEventListener("mousemove", (event) => {
      // .constructor para acessar o métrodo statico
      this.constructor.onMouseMove(event, tooltip);
    });

    // Adicionar o evento de quando o mouse leave e ativar
    // a função onMouseLeave
    currentTarget.addEventListener("mouseleave", (event2) => {
      this.onMouseLeave(event2, tooltip);
    });
  }

  static onMouseMove(event, tooltip) {
    tooltip.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 240 < window.innerWidth) {
      tooltip.style.left = `${event.pageX + 20}px`;
    }
  }

  onMouseLeave({ currentTarget }, tooltip) {
    tooltip.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  static criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    return tooltipBox;
  }

  init() {
    this.addOverEvent();
  }
}
