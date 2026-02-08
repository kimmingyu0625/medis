import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, RefreshControl } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { getMyWards, getSeniorTodaySchedules } from '../../api/guardian';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const GuardianDashboardScreen = () => {
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadWards();
  }, []);

  const loadWards = async () => {
    try {
      const response = await getMyWards();
      const accepted = (response.data || []).filter((w) => w.status === 'ACCEPTED');
      setWards(accepted);
      if (accepted.length > 0 && !selectedWard) {
        selectWard(accepted[0]);
      }
    } catch (error) {
      console.error('Failed to load wards:', error);
    }
  };

  const selectWard = async (ward) => {
    setSelectedWard(ward);
    try {
      const response = await getSeniorTodaySchedules(ward.seniorUserId);
      setSchedules(response.data || []);
    } catch (error) {
      console.error('Failed to load senior schedules:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWards();
    if (selectedWard) {
      await selectWard(selectedWard);
    }
    setRefreshing(false);
  };

  const takenCount = schedules.filter((s) => s.taken).length;

  return (
    <View style={styles.container}>
      <View style={styles.wardSelector}>
        <FlatList
          data={wards}
          horizontal
          keyExtractor={(item) => String(item.guardianId)}
          renderItem={({ item }) => (
            <Button
              title={item.seniorName}
              variant={selectedWard?.guardianId === item.guardianId ? 'primary' : 'outline'}
              onPress={() => selectWard(item)}
              style={styles.wardButton}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.wardList}
          ListEmptyComponent={
            <Text style={styles.emptyWard}>연동된 시니어가 없습니다</Text>
          }
        />
      </View>

      {selectedWard && (
        <Card style={styles.statusCard}>
          <Text style={styles.wardName}>{selectedWard.seniorName}님의 복용 현황</Text>
          <Text style={styles.statusCount}>
            {takenCount} / {schedules.length}
          </Text>
        </Card>
      )}

      <FlatList
        data={schedules}
        keyExtractor={(item) => String(item.scheduleId)}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.scheduleRow}>
              <View style={[styles.dot, item.taken ? styles.takenDot : styles.pendingDot]} />
              <Text style={styles.time}>{item.scheduledTime}</Text>
              <Text style={[styles.status, item.taken ? styles.takenText : styles.pendingText]}>
                {item.taken ? '복용 완료' : '미복용'}
              </Text>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  wardSelector: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
  },
  wardList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  wardButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  emptyWard: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    padding: 16,
  },
  statusCard: {
    margin: 16,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 20,
  },
  wardName: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    marginBottom: 8,
  },
  statusCount: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
  },
  list: {
    paddingHorizontal: 16,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  takenDot: {
    backgroundColor: COLORS.success,
  },
  pendingDot: {
    backgroundColor: COLORS.warning,
  },
  time: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
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
});

export default GuardianDashboardScreen;
