import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Card, List, FAB, useTheme } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
  const theme = useTheme();

  // Seçili tarihi saklamak için state
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState<{ [key: string]: { id: string; title: string; time: string }[] }>({
    '2024-02-20': [
      { id: '1', title: 'Team Meeting', time: '10:00 AM' },
      { id: '2', title: 'Project Review', time: '2:00 PM' },
    ],
    '2024-02-21': [
      { id: '3', title: 'Client Call', time: '11:00 AM' },
    ],
  });
  

  return (
    <Surface style={styles.container}>
      {/* Takvim Bileşeni */}
      <Calendar
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: theme.colors.primary };
            return acc;
          }, {} as { [date: string]: { marked: boolean; dotColor: string } }),
          ...(selectedDate ? { [selectedDate]: { selected: true, selectedColor: theme.colors.primary } } : {}),
        }}
        theme={{
          selectedDayBackgroundColor: theme.colors.primary,
          todayTextColor: theme.colors.primary,
          arrowColor: theme.colors.primary,
        }}
      />

      {/* Seçilen güne ait etkinlikleri gösteren kart */}
      <Card style={styles.eventsCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
            {selectedDate || 'Select a Date'}
          </Text>
          {selectedDate && events[selectedDate] ? (
            events[selectedDate].map((event: { id: string, title: string, time: string }) => (
              <List.Item
                key={event.id}
                title={event.title}
                description={`Time: ${event.time}`}
                left={(props) => <List.Icon {...props} icon="calendar" color={theme.colors.primary} />}
                titleStyle={{ color: theme.colors.onSurface }}
                descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
              />
            ))
          ) : (
            <Text style={styles.noEventsText}>No events for this day.</Text>
          )}
        </Card.Content>
      </Card>

      {/* Yeni etkinlik ekleme butonu */}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => {}}
        label="Add Event"
        color={theme.colors.onPrimary}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  eventsCard: {
    margin: 16,
    elevation: 2,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

