import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { getTodaySchedules, markAsTaken } from '../../api/medication';
import { COLORS, FONT_SIZES } from '../../constants/colors';
import { DAYS_OF_WEEK } from '../../constants/config';

const MedicationScheduleScreen = ({ route }) => {
  const { medication } = route.params;
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const response = await getTodaySchedules();
      const filtered = (response.data || []).filter(
        (s) => s.medicationId === medication.medicationId
      );
      setSchedules(filtered);
    } catch (error) {
      console.error('Failed to load schedules:', error);
    }
  };

  const handleToggleTaken = async (schedule) => {
    try {
      await markAsTaken(schedule.scheduleId, !schedule.taken);
      loadSchedules();
    } catch (error) {
      Alert.alert('오류', '상태 변경에 실패했습니다.');
    }
  };

  const renderSchedule = ({ item }) => (
    <TouchableOpacity onPress={() => handleToggleTaken(item)}>
      <Card style={[styles.scheduleCard, item.taken && styles.takenCard]}>
        <View style={styles.scheduleRow}>
          <View style={[styles.checkbox, item.taken && styles.checked]} />
          <View style={styles.scheduleInfo}>
            <Text style={styles.time}>{item.scheduledTime}</Text>
            <Text style={styles.day}>{DAYS_OF_WEEK[item.dayOfWeek] || item.dayOfWeek}</Text>
          </View>
          <Text style={[styles.status, item.taken ? styles.takenText : styles.pendingText]}>
            {item.taken ? '복용 완료' : '미복용'}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{medication.name}</Text>
        <Text style={styles.medDosage}>{medication.dosage}</Text>
      </View>

      <FlatList
        data={schedules}
        keyExtractor={(item) => String(item.scheduleId)}
        renderItem={renderSchedule}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>오늘의 복용 스케줄이 없습니다</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  medInfo: {
    padding: 24,
    backgroundColor: COLORS.primary,
  },
  medName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.white,
  },
  medDosage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primaryLight,
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  scheduleCard: {
    padding: 16,
  },
  takenCard: {
    opacity: 0.7,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 12,
  },
  checked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  scheduleInfo: {
    flex: 1,
  },
  time: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  day: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  status: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  takenText: {
    color: COLORS.success,
  },
  pendingText: {
    color: COLORS.warning,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
});

export default MedicationScheduleScreen;
