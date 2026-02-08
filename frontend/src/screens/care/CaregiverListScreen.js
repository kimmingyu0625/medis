import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import CaregiverCard from '../../components/care/CaregiverCard';
import { findCaregivers } from '../../api/care';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const CaregiverListScreen = ({ navigation }) => {
  const [caregivers, setCaregivers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCaregivers();
  }, []);

  const loadCaregivers = async () => {
    try {
      const response = await findCaregivers();
      setCaregivers(response.data || []);
    } catch (error) {
      console.error('Failed to load caregivers:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCaregivers();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={caregivers}
        keyExtractor={(item) => String(item.caregiverId)}
        renderItem={({ item }) => (
          <CaregiverCard
            caregiver={item}
            onPress={() => navigation.navigate('CareRequest', { caregiver: item })}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>등록된 돌보미가 없습니다</Text>
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
});

export default CaregiverListScreen;
