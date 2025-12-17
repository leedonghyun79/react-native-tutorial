import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface LogContextType {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
}

const LogContext = createContext<LogContextType>({
    text: "",
    setText: () => { },
});

export function LogContextProvider({ children }: { children: React.ReactNode }) {
    const [text, setText] = useState("");
    return (
        <LogContext.Provider value={{ text, setText }}>
            {children}
        </LogContext.Provider>
    );
}

export default LogContext;
