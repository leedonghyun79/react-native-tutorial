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

export function LogContextProvider({ children }: { children: React.ReactNode }) {
    const [logs, setLogs] = useState<Log[]>([]);

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
