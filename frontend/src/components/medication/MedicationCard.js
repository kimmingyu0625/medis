import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../common/Card';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const MedicationCard = ({ medication, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress?.(medication)}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.name}>{medication.name}</Text>
          <Text style={styles.dosage}>{medication.dosage}</Text>
        </View>
        {medication.description && (
          <Text style={styles.description}>{medication.description}</Text>
        )}
        <View style={styles.dateRow}>
          <Text style={styles.date}>
            {medication.startDate} ~ {medication.endDate || '계속'}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  dosage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
});

export default MedicationCard;
