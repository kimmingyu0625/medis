import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../common/Card';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const CaregiverCard = ({ caregiver, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress?.(caregiver)}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.name}>{caregiver.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>
              {caregiver.rating?.toFixed(1) || '-'}
            </Text>
            <Text style={styles.reviewCount}>
              ({caregiver.reviewCount || 0})
            </Text>
          </View>
        </View>
        <Text style={styles.specialization}>{caregiver.specialization}</Text>
        {caregiver.introduction && (
          <Text style={styles.introduction} numberOfLines={2}>
            {caregiver.introduction}
          </Text>
        )}
        <View style={styles.footer}>
          <Text style={styles.area}>{caregiver.availableArea}</Text>
          <Text style={styles.experience}>
            {caregiver.experienceYears ? `${caregiver.experienceYears}년 경력` : ''}
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
    marginBottom: 6,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  reviewCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginLeft: 2,
  },
  specialization: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 6,
  },
  introduction: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  area: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  experience: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
});

export default CaregiverCard;
