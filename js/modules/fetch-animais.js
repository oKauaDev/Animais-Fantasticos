import initAnimaNumeros from "./anima-numeros.js";

export default class FetchAnimais {
  constructor(url, element) {
    this.numerosGrid = document.querySelector(element);
    this.url = url;
  }

  static createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  init() {
    const createAnimalReference = this.constructor.createAnimal;
    fetch(this.url)
      .then((r) => r.json())
      .then((animaisJSON) => {
        animaisJSON.forEach((animal) => {
          const divAnimal = createAnimalReference(animal);
          this.numerosGrid.appendChild(divAnimal);
        });
        initAnimaNumeros();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
}
