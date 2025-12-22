import { createContext, useState } from "react";
import 'react-native-get-random-values';

export interface SearchContextType {
  keyword: string;
  onChangeText: (keyword: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  keyword: '',
  onChangeText: () => { }
});

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [keyword, onChangeText] = useState('');

  return (
    <SearchContext.Provider value={{ keyword, onChangeText }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
export { SearchContextProvider };

