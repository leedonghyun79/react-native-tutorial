import { createContext, useState } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Log {
    id: string;
    title: string;
    body: string;
    date: string;
}

export interface LogContextType {
    logs: Log[];
    onCreate: ({ title, body, date }: { title: string, body: string, date: string }) => void;
}

const LogContext = createContext<LogContextType>({
    logs: [],
    onCreate: ({ title, body, date }) => { },
});

const LogContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [logs, setLogs] = useState<Log[]>(
        Array.from({ length: 10 })
            .map((_, index) => ({
                id: uuidv4(),
                title: `제목 ${index + 1}`,
                body: `내용 ${index + 1}`,
                date: new Date().toISOString(),
            }))
            .reverse()
    )

    const onCreate = ({ title, body, date }: { title: string, body: string, date: string }) => {
        const log = {
            id: uuidv4(),
            title,
            body,
            date,
        };
        setLogs([log, ...logs]);
    };

    return (
        <LogContext.Provider value={{ logs, onCreate }}>
            {children}
        </LogContext.Provider>
    );
}

export default LogContext;
export { LogContextProvider };

