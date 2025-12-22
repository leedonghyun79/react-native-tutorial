import { StyleSheet } from "react-native";
import { Calendar } from 'react-native-calendars';

const CalendarView = ({
  markedDates,
  selectedDate,
  onSelectDate
}: {
  markedDates: Record<string, { marked: boolean }>;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) => {

  // 현재 연/월 사용하기
  // const markedDates = {
  //   '2025-12-11': { selected: true },
  //   '2025-12-14': { marked: true },
  //   '2025-12-15': { marked: true },

  // }
  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      onDayPress={(day) => onSelectDate(day.dateString)}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  )
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  }
})

export default CalendarView
