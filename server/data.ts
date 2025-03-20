import type { ProductCardType } from "~/types/ProductCardType";

export const productCardList: ProductCardType[] = [
  {
    id: "1",
    name: "商品1",
    price: 100.49,
    image: "/images/placeholder.png",
    soldCount: 100,
    category: ["分类1"],
    discount: 0.1,
    merchant: "商家1",
  },
  {
    id: "2",
    name: "商品2一个超长名字在商品卡片上展示会不会有问题",
    price: 200.99,
    image: "/images/placeholder.png",
    soldCount: 200,
    category: ["分类2", "分类3"],
    discount: 0.2,
    merchant: "商家2",
  },
  {
    id: "3",
    name: "商品3",
    price: 300,
    image: "/images/placeholder.png",
    soldCount: 300,
    category: ["分类3", "分类4"],
    discount: 0.3,
    merchant: "商家3",
  },
  {
    id: "4",
    name: "商品4",
    price: 400.5,
    image: "/images/placeholder.png",
    soldCount: 400,
    category: ["分类4"],
    discount: 0.4,
    merchant: "商家4",
  },
  {
    id: "5",
    name: "商品5",
    price: 500,
    image: "/images/placeholder.png",
    soldCount: 500,
    category: ["分类5"],
    discount: 0.5,
    merchant: "商家2",
  },
  {
    id: "6",
    name: "商品6",
    price: 600,
    image: "/images/placeholder.png",
    soldCount: 600,
    category: ["分类6"],
    discount: 0.6,
    merchant: "商家1",
  },
  {
    id: "7",
    name: "商品7",
    price: 700,
    image: "/images/placeholder.png",
    soldCount: 700,
    category: ["分类7"],
    discount: 0.7,
    merchant: "商家3",
  },
  {
    id: "8",
    name: "商品8",
    price: 800,
    image: "/images/placeholder.png",
    soldCount: 800,
    category: ["分类8"],
    discount: 0.8,
    merchant: "商家4",
  },
  {
    id: "9",
    name: "商品9",
    price: 900,
    image: "/images/placeholder.png",
    soldCount: 900,
    category: ["分类9"],
    discount: 0.9,
    merchant: "商家2",
  },
  {
    id: "10",
    name: "商品10",
    price: 1000,
    image: "/images/placeholder.png",
    soldCount: 1000,
    category: ["分类10"],
    discount: 1.0,
    merchant: "商家1",
  },
];
