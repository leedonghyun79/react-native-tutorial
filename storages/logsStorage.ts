import { Log } from '@/context/LogContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'logs'

const logStorage = {
  async get() {
    try {
      const raw = await AsyncStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      return parsed;
    } catch (error) {
      throw new Error('Failed to load logs')
    }
  },
  async save(logs: Log[]) {
    try {
      const raw = JSON.stringify(logs);
      await AsyncStorage.setItem(key, raw);
    } catch (error) {
      throw new Error('Failed to save logs')
    }
  },
}

export default logStorage;
