import logStorage from "@/storages/logsStorage";
import { createContext, useEffect, useRef, useState } from "react";
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
    const initialLogsRef = useRef<Log[]>([]);
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

    // 로컬 스토리지에서 상태(logs)를 가져와서 초기 상태로 설정
    useEffect(() => {
        (async () => {
            const savedLogs = await logStorage.get();
            if (savedLogs) {
                initialLogsRef.current = savedLogs;
                setLogs(savedLogs);
            }
        })()
    }, [])

    // 상태(logs)가 변경될때마다 로컬 스토리지에 저장
    useEffect(() => {
        // 불러오는 과정에서 초기 상태로 설정된 상태라면 저장하지 않음
        if (logs === initialLogsRef.current) return;
        logStorage.save(logs);
    }, [logs])

    return (
        <LogContext.Provider value={{ logs, onCreate, onModify, onRemove }}>
            {children}
        </LogContext.Provider>
    );
}

export default LogContext;
export { LogContextProvider };

