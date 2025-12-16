import AsyncStorage from "@react-native-async-storage/async-storage";

const key = 'todos';

const todosStorage = {
    async get() {
        try {
            const rawTodos = await AsyncStorage.getItem(key);
            if (!rawTodos) {
                throw new Error("저장된 데이터가 없습니다.");
            }
            const savedTodos = JSON.parse(rawTodos);
            return savedTodos;


        } catch (error) {
            console.log(error)
        }
    },

    async set(data: any) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }

}

export default todosStorage;