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
    onModify: (modified: Log) => void;
    onRemove: (id: string | undefined) => void;
}

const LogContext = createContext<LogContextType>({
    logs: [],
    onCreate: ({ title, body, date }) => { },
    onModify: (modified: Log) => { },
    onRemove: (id: string | undefined) => { },
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

    const onModify = (modified: Log) => {
        const newLogs = logs.map((log) => log.id === modified.id ? modified : log);
        setLogs(newLogs);
    }

    const onRemove = (id: string | undefined) => {
        console.log('onRemove called with id:', id);
        if (!id) {
            console.error('onRemove: id is undefined or empty');
            return;
        }
        const nextLogs = logs.filter(log => log.id !== id);
        console.log('Filtered logs:', nextLogs.length, 'remaining');
        setLogs(nextLogs);
    }

    return (
        <LogContext.Provider value={{ logs, onCreate, onModify, onRemove }}>
            {children}
        </LogContext.Provider>
    );
}

export default LogContext;
export { LogContextProvider };

