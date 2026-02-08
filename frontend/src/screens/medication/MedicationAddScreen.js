import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { addMedication } from '../../api/medication';
import { COLORS } from '../../constants/colors';

const MedicationAddScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name) {
      Alert.alert('알림', '약 이름을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await addMedication(form);
      Alert.alert('완료', '약이 등록되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('오류', error.message || '등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Input label="약 이름 *" value={form.name} onChangeText={(v) => updateField('name', v)} placeholder="약 이름을 입력하세요" />
      <Input label="복용량" value={form.dosage} onChangeText={(v) => updateField('dosage', v)} placeholder="예: 1정, 5ml" />
      <Input label="설명" value={form.description} onChangeText={(v) => updateField('description', v)} placeholder="복용 시 참고사항" multiline numberOfLines={3} />
      <Input label="시작일" value={form.startDate} onChangeText={(v) => updateField('startDate', v)} placeholder="YYYY-MM-DD" />
      <Input label="종료일" value={form.endDate} onChangeText={(v) => updateField('endDate', v)} placeholder="YYYY-MM-DD (미입력 시 계속)" />

      <Button title="등록하기" onPress={handleSubmit} loading={loading} style={styles.submitButton} />
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
  submitButton: {
    marginTop: 16,
  },
});

export default MedicationAddScreen;
