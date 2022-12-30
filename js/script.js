import ScrollSuave from "./modules/scroll-suave.js";
import AnimacaoScroll from "./modules/scroll-animacao.js";
import Accordion from "./modules/accordion.js";
import TabNav from "./modules/tabnav.js";
import Modal from "./modules/modal.js";

import initTooltip from "./modules/tooltip.js";
import initDropdownMenu from "./modules/dropdown-menu.js";
import initMenuMobile from "./modules/menu-mobile.js";
import initFuncionamento from "./modules/funcionamento.js";
import initFetchAnimais from "./modules/fetch-animais.js";
import initFetchBitcoin from "./modules/fetch-bitcoin.js";

const initList = [
  new ScrollSuave('[data-menu="suave"] a[href^="#"]'),

  new AnimacaoScroll('[data-anime="scroll"]', "ativo"),

  new Accordion('[data-anime="accordion"] dt', "ativo"),

  new TabNav('[data-tab="menu"] li', '[data-tab="content"] section', "ativo"),

  new Modal(
    '[data-modal="abrir"]',
    '[data-modal="fechar"]',
    '[data-modal="container"]',
    "ativo"
  ),
];

initList.forEach((classContent) => {
  if (classContent.init) {
    classContent.init();
  }
});

initTooltip();
initDropdownMenu();
initMenuMobile();
initFuncionamento();
initFetchAnimais();
initFetchBitcoin();
