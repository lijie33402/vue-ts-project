import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart';
import products from './modules/products';
import test from './modules/test';

Vue.use(Vuex);

// 从 module 的 state 中提取 state 的类型并集合
interface State {
  cart: typeof cart.state;
  products: typeof products.state;
  test: typeof test.state
}
// 将 getter 函数转换成 {getterName: getterFuncsReturnType} 的对象类型
export type ReturnGetters<T extends { [key: string]: (...args: any) => any }> = {
  [P in keyof T]: ReturnType<T[P]>;
};

// 提取所有 module 的 getter 函数类型对象
type GettersFuncs = typeof cart.getters & typeof products.getters & typeof test.getters;
// 将 getter 转换成对象
type Getters = ReturnGetters<GettersFuncs>;

// 提取 mutation 函数类型
type CommitFuncs = typeof cart.mutations & typeof products.mutations & typeof test.mutations;
// 将 mutation 函数名及 payload 类型转换成 commit 函数的两个入参类型
interface Commit {
  <T extends keyof CommitFuncs>(type: T, payload?: Parameters<CommitFuncs[T]>[1]): void;
}
// dispatch 处理步骤同 commit
type DispatchFuncs = typeof cart.actions & typeof products.actions & typeof test.actions;
interface Dispatch {
  <T extends keyof DispatchFuncs>(type: T, payload?: Parameters<DispatchFuncs[T]>[1]): Promise<any>;
}

const store = new Vuex.Store({
  modules: {
    cart,
    products,
    test
  }
});

export default store;

export interface Product {
  id: number;
  title: string;
  price: number;
  inventory: number;
}

// 导出类型 Store 以便在 Vue 原型上定义类型
export interface Store {
  state: State;
  getters: Getters;
  commit: Commit;
  dispatch: Dispatch;
}

// 结构导出时对每个对象进行类型的定义
export const { state } = store;
export const { getters }: { getters: Getters } = store; // 定义 getters 的类型
export const { commit }: { commit: Commit } = store; // 定义 commit 的类型
export const { dispatch }: { dispatch: Dispatch } = store; // 定义 commit 的类型
