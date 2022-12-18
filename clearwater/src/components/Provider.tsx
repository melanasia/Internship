import React, {createContext, useContext, useState} from 'react';

export interface MyContextProps{ 
  numCols: number;
  numRows: number;
 };

export const MyContext = createContext<MyContextProps>({} as MyContextProps);
// <MyContextProps> is a typeScript generic. A typesafe language is strict about how types are used. A generic is a way to change the type that you're using for a particular function (read TS documentation***)
export const Provider = (props:any) => {
  const [numCols, setNumCols] = useState(0);
  const value = {
    numCols
  } as MyContextProps;
  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  // this provider is going to accept an object of this shape (aka implements an interface)
}