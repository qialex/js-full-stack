// "use client";
import { createContext, useContext, useState, useReducer } from "react";

const Context = createContext<string>('');
function reducer(state: any, action: any): any {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      throw new Error('Invalid action type');
  }
}

export default function RootProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
  // const [rootState, setrootState] = useState<string>("light");
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export function useRootContext() {
  return useContext(Context);
}



// // Create a context
// const AppContext = createContext();
// // Define a reducer 
// function

// function reducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { count: state.count + 1 }
// ;
//     case 'DECREMENT':
//       return { count: state.count - 1 }
// ;
//     default:
//       throw new Error('Invalid action type');
//   }

// }

// Create a context provider

// function AppProvider({ children }
// ) {
//   const [state, dispatch] = useReducer(reducer, { count: 0 }
// );
//   return (
//     <AppContext.Provider value={{ state, dispatch }
// }
// >
//       {children}

//     </AppContext.Provider>
//   );
// }

// Consume the context in a component

// function Counter() {
//   const { state, dispatch }
//  = useContext(AppContext);

//   const increment = () => dispatch({ type: 'INCREMENT' }
// );
//   const decrement = () => dispatch({ type: 'DECREMENT' }
// );
//   return (
//     <div>
//       <button onClick={decrement}
// >-</button>
//       <span>{state.count}
// </span>
//       <button onClick={increment}
// >+</button>
//     </div>
//   );
// }