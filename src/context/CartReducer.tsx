import type { CartAction, CartItem, CartState } from "../types/cart";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  let updatedList: CartItem[];
  let updatedTotalAmount: number; // Declaramos la variable aquí

  switch (action.type) {
    case "ADD_TO_CART": {
      const productToAdd = action.payload;
      const existingItem = state.items.find(
        (item: CartItem) => item.id === productToAdd.id
      );

      if (existingItem) {
        // si existe, actualizo cantidad ...item hace la copia y sobreescribo cantidad
        updatedList = state.items.map((item: CartItem) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // creo un nuevo array con lo que ya tenia + la copia del nuevo item
        updatedList = [...state.items, { ...productToAdd, quantity: 1 }];
      }

      updatedTotalAmount = updatedList.reduce(
        (sum, item) => (sum = sum + item.price * item.quantity),
        0
      );

      return { ...state, items: updatedList, totalAmount: updatedTotalAmount };
    }

    case "REMOVE_FROM_CART": {
      const productIdToRemove = action.payload;

      // filter crea un nuevo array, es inmutable y seguro
      updatedList = state.items.filter((item) => item.id !== productIdToRemove);

      updatedTotalAmount = updatedList.reduce(
        (sum, item) => (sum = sum + item.price * item.quantity),
        0
      );

      return { ...state, items: updatedList, totalAmount: updatedTotalAmount };
    }

    case "DECREMENT_QUANTITY": {
      
      const productIdToDecrement = action.payload;
      const existingItem = state.items.find(
        (item: CartItem) => item.id === productIdToDecrement.id
      );

      if (existingItem){
        // si existe, actualizo cantidad ...item hace la copia y sobreescribo cantidad}
        if(existingItem.quantity > 1 ){
          updatedList = state.items.map((item: CartItem) =>
            item.id === productIdToDecrement.id ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
        else{
          updatedList = state.items.filter((item) => item.id !== productIdToDecrement.id);
        }
        updatedTotalAmount = updatedList.reduce((sum, item) => sum + item.price * item.quantity,0);
        return {...state, items: updatedList, totalAmount: updatedTotalAmount};
      }

      return state;
      
    }

    case "CLEAR_CART": {
      return { ...state, items: [], totalAmount: 0 };
    }

    default:
      return state;
  }
};
