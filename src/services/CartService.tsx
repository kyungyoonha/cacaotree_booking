import Storage from "./index";
import { Carts } from "./types";

const KEY = "cacaotree-cart";

export default Object.freeze({
  // 전체 데이터 조회
  findAll() {
    return Storage.get(KEY, []);
  },
  // 전체 데이터 저장
  saveAll(carts: Carts) {
    Storage.set(KEY, carts);
  },
  // 아이템 리스트 찾기
  findItemAll(itemKey: string) {
    const carts = this.findAll();
    return carts[itemKey];
  },
  // 아이템 리스트 저장
  saveItemAll(itemKey: string, cartKeyItems) {
    let carts = this.findAll();
    carts[itemKey] = cartKeyItems;
    this.saveAll(carts);
  },

  // 아이템 찾기
  findItemBySeq(itemKey: string, seq: number) {
    return this.findAll()[itemKey].find((v) => v.seq === seq);
  },

  // 아이템 추가
  addItem(itemKey: string, newCartItem) {
    const cartKeyItems = this.findItemAll(1);
    cartKeyItems.push({
      ...newCartItem,
      seq:
        cartKeyItems.reduce((seq, cartItem) => Math.max(seq, cartItem.seq), 0) +
        1,
    });

    this.saveItemAll(itemKey, cartKeyItems);
  },
  // 아이템 제거
  removeItem(itemKey: string, seq: number) {
    const cartKeyItems = this.findItemAll(itemKey);
    const newCartItems = cartKeyItems.filter(
      (cartItem) => cartItem.seq !== seq
    );
    this.saveItemAll(itemKey, newCartItems);
  },
  // 아이템 업데이트
  updateItem(itemKey: string, newCartItem) {
    let cartKeyItems = this.findItemAll(itemKey);
    let index = cartKeyItems.findIndex(({ seq }) => cartKeyItems.seq === seq);
    cartKeyItems[index] = newCartItem;
    this.saveItemAll(itemKey, cartKeyItems);
  },
});
