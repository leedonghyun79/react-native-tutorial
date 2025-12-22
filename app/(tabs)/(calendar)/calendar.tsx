import CalendarView from '@/components/CalendarView';
import FeedList from '@/components/FeedList';
import LogContext from '@/context/LogContext';
import { format } from 'date-fns';
import { useContext, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

const CalendarScreen = () => {
  const { logs } = useContext(LogContext);
  //선택된 날짜 (기본값: 오늘)
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // 기록한 데이터의 날짜 부여하기
  const markedDates = useMemo(() =>
    logs.reduce((acc, current) => {
      const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
      acc[formattedDate] = { marked: true };
      return acc;
    }, {} as Record<string, { marked: boolean }>)
    , [logs])

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate
  )

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  }
});

export default CalendarScreen;
