import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { createRequest } from '../../api/care';
import { COLORS, FONT_SIZES } from '../../constants/colors';
import { CARE_TYPES } from '../../constants/config';

const CareRequestScreen = ({ route, navigation }) => {
  const caregiver = route.params?.caregiver;

  const [form, setForm] = useState({
    caregiverId: caregiver?.caregiverId,
    careType: 'DAILY',
    description: '',
    requestedDate: '',
    startTime: '',
    endTime: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.careType || !form.requestedDate) {
      Alert.alert('알림', '필수 항목을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await createRequest(form);
      Alert.alert('완료', '돌봄 요청이 등록되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('오류', error.message || '요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {caregiver && (
        <View style={styles.caregiverInfo}>
          <Text style={styles.caregiverName}>{caregiver.name} 돌보미</Text>
          <Text style={styles.caregiverSpec}>{caregiver.specialization}</Text>
        </View>
      )}

      <View style={styles.typeSection}>
        <Text style={styles.label}>돌봄 유형 *</Text>
        <View style={styles.typeRow}>
          {Object.entries(CARE_TYPES).map(([key, label]) => (
            <Button
              key={key}
              title={label}
              variant={form.careType === key ? 'primary' : 'outline'}
              onPress={() => updateField('careType', key)}
              style={styles.typeButton}
            />
          ))}
        </View>
      </View>

      <Input label="요청 날짜 *" value={form.requestedDate} onChangeText={(v) => updateField('requestedDate', v)} placeholder="YYYY-MM-DD" />
      <Input label="시작 시간" value={form.startTime} onChangeText={(v) => updateField('startTime', v)} placeholder="HH:MM" />
      <Input label="종료 시간" value={form.endTime} onChangeText={(v) => updateField('endTime', v)} placeholder="HH:MM" />
      <Input label="주소" value={form.address} onChangeText={(v) => updateField('address', v)} placeholder="방문 주소" />
      <Input label="요청 사항" value={form.description} onChangeText={(v) => updateField('description', v)} placeholder="상세 요청 사항" multiline numberOfLines={3} />

      <Button title="요청하기" onPress={handleSubmit} loading={loading} style={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
  },
  caregiverInfo: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  caregiverName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.white,
  },
  caregiverSpec: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primaryLight,
    marginTop: 4,
  },
  typeSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default CareRequestScreen;
