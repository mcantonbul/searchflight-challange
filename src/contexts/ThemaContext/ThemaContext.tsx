import { ReactNode, createContext, useState } from "react";

/** Models */
import { IThema } from "@/models";

const initialThema: IThema = {
  backgroundColor: "#063048",
  header: {
    color: 'white'
  },
  footer: {
    color: 'white'
  }
};

interface IThemaContext {
  thema: IThema;
  changeThema: (thema?: IThema) => void;
}

export const ThemaContext = createContext<IThemaContext>({
  thema: initialThema,
  changeThema: () => {},
});

interface ThemaContextProviderProps {
  children: ReactNode;
}

const ThemaContextProvider = ({ children }: ThemaContextProviderProps) => {
  const [thema, setThema] = useState(initialThema);

  const changeThema = (thema = initialThema) => {
    // Todo: if thema is same do not change
    setThema(thema);
  };

  return (
    <ThemaContext.Provider value={{ thema, changeThema }}>
      {children}
    </ThemaContext.Provider>
  );
};

export default ThemaContextProvider;
