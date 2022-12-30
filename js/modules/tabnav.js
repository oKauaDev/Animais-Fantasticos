export default class TabNav {
  constructor(selectorMenu, tabContent, className) {
    this.tabMenu = document.querySelectorAll(selectorMenu);
    this.tabContent = document.querySelectorAll(tabContent);

    this.className = className;
  }

  activeTab(index) {
    this.tabContent.forEach((section) => {
      section.classList.remove(this.className);
    });
    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add(this.className, direcao);
  }

  init() {
    if (this.tabMenu.length && this.tabContent.length) {
      this.tabContent[0].classList.add(this.className);

      this.tabMenu.forEach((itemMenu, index) => {
        itemMenu.addEventListener("click", () => {
          this.activeTab(index);
        });
      });
    }
  }
}
