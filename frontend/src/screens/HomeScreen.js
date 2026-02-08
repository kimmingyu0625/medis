import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import { getTodaySchedules } from '../api/medication';
import { COLORS, FONT_SIZES } from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTodaySchedules();
  }, []);

  const loadTodaySchedules = async () => {
    try {
      const response = await getTodaySchedules();
      setSchedules(response.data || []);
    } catch (error) {
      console.error('Failed to load schedules:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodaySchedules();
    setRefreshing(false);
  };

  const takenCount = schedules.filter((s) => s.taken).length;
  const totalCount = schedules.length;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>{user?.name}님, 안녕하세요</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}</Text>
      </View>

      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>오늘의 복용 현황</Text>
        <Text style={styles.summaryCount}>
          {takenCount} / {totalCount}
        </Text>
        <Text style={styles.summarySubtext}>
          {totalCount === 0 ? '등록된 스케줄이 없습니다' : takenCount === totalCount ? '모두 복용 완료!' : '복용할 약이 남아있습니다'}
        </Text>
      </Card>

      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MedicationTab')}>
          <Text style={styles.menuIcon}>💊</Text>
          <Text style={styles.menuText}>약 관리</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CareTab')}>
          <Text style={styles.menuIcon}>🤝</Text>
          <Text style={styles.menuText}>돌봄 매칭</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('GuardianTab')}>
          <Text style={styles.menuIcon}>👨‍👩‍👧</Text>
          <Text style={styles.menuText}>보호자</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  summaryCard: {
    marginHorizontal: 24,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 24,
  },
  summaryTitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    marginBottom: 8,
  },
  summaryCount: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  summarySubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primaryLight,
  },
  menuGrid: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
  },
  menuItem: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  menuText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default HomeScreen;
