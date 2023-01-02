export default class Slide {
  constructor(wrapper, slide, activeItem) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.wrapper.style.transform = `translate3d(0px, 0, 0)`;
    this.activeItem = activeItem;

    // Criar objeto com as posições
    this.positions = { clickPosition: 0, movePosition: 0, savePosition: 0 };
  }

  setTransiction(bool) {
    this.slide.style.transition = bool ? "0.5s" : "";
  }

  // Dar bind em todos os eventos
  bindEvents() {
    this.onMousePress = this.onMousePress.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onResize = this.onResize.bind(this);
    this.navToNext = this.navToNext.bind(this);
    this.navToPrev = this.navToPrev.bind(this);
  }

  // Mover o slides deacordo com as posições
  moveSlide(clientX) {
    // Armazenar os movimentos na propriedade
    const movePos = (clientX - this.positions.clickPosition) * 1.5;
    const moveSlidePos = Math.round(movePos + this.positions.savePosition);
    this.positions.movePosition = movePos;
    this.slide.style.transform = `translate3d(${moveSlidePos}px, 0, 0)`;

    // Salvar o movimento para depois armazenar ele
    // Para quando precionarmos o slide novamente começar
    // A partir dai
    this.positions.lastMove = moveSlidePos;
  }

  onMousePress(event) {
    let clientX;
    // Previnir o padão
    if (event.type === "touchstart") {
      // Adicionar eventos de Touch
      window.addEventListener("touchend", this.onMouseLeave);
      this.wrapper.addEventListener("touchmove", this.onMouseMove);
      clientX = event.changedTouches[0].clientX;
    } else {
      event.preventDefault();
      // Adicionar os eventos ao click
      window.addEventListener("mouseup", this.onMouseLeave);
      this.wrapper.addEventListener("mousemove", this.onMouseMove);
      clientX = event.clientX;
    }
    this.setTransiction(false);
    this.positions.clickPosition = clientX;
  }

  onMouseMove(event) {
    let clientX;

    if (event.type === "touchmove") {
      clientX = event.changedTouches[0].clientX;
    } else {
      clientX = event.clientX;
    }
    this.moveSlide(clientX);
    // Verificar se tirou o mouse da tela
    if (event.clientX > window.innerWidth - 5 || event.clientX < 5) {
      this.onMouseLeave();
    }
  }

  onMouseLeave() {
    // Retirar os eventos
    this.wrapper.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseLeave);

    const distanciaClick = this.positions.movePosition;
    this.setTransiction(true);

    if (distanciaClick < 120) {
      this.navToNext();
    } else if (distanciaClick > 120) {
      this.navToPrev();
    } else {
      this.navTo(this.slideNav.actual);
    }

    // Armazenar a ultima posição para começar apartir dela.
    this.positions.savePosition = this.positions.lastMove;
  }

  addDefaultEvents() {
    this.wrapper.addEventListener("mousedown", this.onMousePress);
    this.wrapper.addEventListener("touchstart", this.onMousePress);
    window.addEventListener("resize", this.onResize);
  }

  getCenterPosition(element) {
    // Calcular uma margin
    const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2;

    // Retornar o valor somado com o elemento.
    return -(element.offsetLeft - margin);
  }

  resetAtiveClass() {
    this.configSlides.forEach((cnf) => {
      cnf.element.classList.remove(this.activeItem);
    });
  }

  navTo(index) {
    this.setTransiction(true);
    if (index !== undefined) {
      this.resetAtiveClass();
      this.configSlides[index].element.classList.add(this.activeItem);
      const pos = this.configSlides[index].position;
      this.slideIndexNav(index);

      // Ir até a posição calculada de pos.
      this.slide.style.transform = `translate3d(${pos}px, 0, 0)`;
      this.positions.lastMove = pos;
      this.positions.savePosition = pos;
    } else {
      this.navTo(this.slideNav.actual);
    }

    return index !== undefined;
  }

  navToNext() {
    this.navTo(this.slideNav.next);
  }

  navToPrev() {
    this.navTo(this.slideNav.prev);
  }

  slideIndexNav(index) {
    this.slideNav = {
      prev: index ? index - 1 : undefined,
      actual: index,
      next: index === this.configSlides.length - 1 ? undefined : index + 1,
    };
  }

  // Configurações de cada slide
  initConfig() {
    let childrens = [...this.slide.children];
    childrens = childrens.map((element) => {
      const position = this.getCenterPosition(element);
      return {
        element,
        position,
      };
    });

    this.configSlides = childrens;
  }

  onResize() {
    // CRIAR UMA FUNÇÃO DE DEBOUNCE PARA AQUI.
    setTimeout(() => {
      this.positions = { clickPosition: 0, movePosition: 0, savePosition: 0 };
      this.setTransiction(false);
      this.navTo(this.slideNav.actual);
      this.initConfig();
    }, 500);
  }

  init() {
    this.bindEvents();
    this.addDefaultEvents();
    this.initConfig();
  }
}
