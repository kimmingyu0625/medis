import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MedicationCard from '../../components/medication/MedicationCard';
import Button from '../../components/common/Button';
import { getMedications } from '../../api/medication';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const MedicationListScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadMedications();
    }, [])
  );

  const loadMedications = async () => {
    try {
      const response = await getMedications();
      setMedications(response.data || []);
    } catch (error) {
      console.error('Failed to load medications:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMedications();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        keyExtractor={(item) => String(item.medicationId)}
        renderItem={({ item }) => (
          <MedicationCard
            medication={item}
            onPress={() => navigation.navigate('MedicationSchedule', { medication: item })}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>등록된 약이 없습니다</Text>
          </View>
        }
      />
      <View style={styles.addButtonContainer}>
        <Button title="약 추가" onPress={() => navigation.navigate('MedicationAdd')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: 16,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  addButtonContainer: {
    padding: 16,
  },
});

export default MedicationListScreen;
