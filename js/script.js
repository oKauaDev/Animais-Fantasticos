import ScrollSuave from "./modules/scroll-suave.js";
import AnimacaoScroll from "./modules/scroll-animacao.js";
import Accordion from "./modules/accordion.js";
import TabNav from "./modules/tabnav.js";
import Modal from "./modules/modal.js";
import DropdownMenu from "./modules/dropdown-menu.js";
import MenuMobile from "./modules/menu-mobile.js";
import initFuncionamento from "./modules/funcionamento.js";
import FetchAnimais from "./modules/fetch-animais.js";
import initFetchBitcoin from "./modules/fetch-bitcoin.js";

import initTooltip from "./modules/tooltip.js";

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

  new DropdownMenu("[data-dropdown]"),

  new MenuMobile('[data-menu="button"]', '[data-menu="list"]'),

  new FetchAnimais("./animaisapi.json", ".numeros-grid"),
];

initList.forEach((classContent) => {
  if (classContent.init) {
    classContent.init();
  }
});

initTooltip();

// Iniciamento por funções
initFuncionamento();
initFetchBitcoin(".btc-preco");
