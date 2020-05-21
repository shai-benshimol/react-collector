import React, { createContext, useContext } from "react";
import { StorageAction,SessionAction,CookieAction } from "./actions";

const uuid = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const [storage, session, cookies] = [
    new StorageAction(),
    new SessionAction(),
    new CookieAction()
  ];

 
  export const Context = createContext<any>({});

  export const useCollector = () => useContext(Context);
  
  const ReactCollector = (props: any) => {
    return (
      <Context.Provider value={{ uuid, storage,session,cookies } as any}>
        {props.children}
      </Context.Provider>
    );
  };
  
  export default ReactCollector;