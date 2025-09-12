import { MenuItem } from "@/types/menu";
import hamburguerImage from "@/assets/hamburguer-artesanal.jpg";

export const menuItems: MenuItem[] = [
  {
    id: "hamburguer-artesanal",
    name: "HAMBURGUER ARTESANAL",
    description: "Hamburguer artesanal: Carne, Queijo Chedar, Alface, Pão, Tomate",
    price: 24.50,
    category: "LANCHES",
    image: hamburguerImage
  },
  {
    id: "x-bacon",
    name: "X-BACON",
    description: "Hamburguer com bacon, queijo, alface e tomate",
    price: 18.00,
    category: "LANCHES"
  },
  {
    id: "x-tudo",
    name: "X-TUDO",
    description: "Hamburguer completo com tudo que temos de melhor",
    price: 22.00,
    category: "LANCHES"
  },
  {
    id: "coca-cola",
    name: "COCA-COLA",
    description: "Refrigerante Coca-Cola lata 350ml",
    price: 5.00,
    category: "BEBIDAS"
  },
  {
    id: "suco-laranja",
    name: "SUCO DE LARANJA",
    description: "Suco natural de laranja 300ml",
    price: 7.50,
    category: "BEBIDAS"
  },
  {
    id: "prato-feito",
    name: "PRATO FEITO",
    description: "Arroz, feijão, batata frita, salada e carne",
    price: 16.00,
    category: "ALMOÇO"
  },
  {
    id: "feijoada",
    name: "FEIJOADA",
    description: "Feijoada completa com acompanhamentos",
    price: 25.00,
    category: "ALMOÇO"
  }
];

export const categories = ["LANCHES", "BEBIDAS", "ALMOÇO"];