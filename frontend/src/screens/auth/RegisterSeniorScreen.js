import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const RegisterSeniorScreen = ({ navigation, route }) => {
  const { register } = useAuth();
  // 초대 링크로 들어온 경우 초대 코드가 있을 수 있음
  const inviteCode = route.params?.inviteCode || '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    role: 'SENIOR',
    linkedPhone: '',   // 자녀 전화번호 (선택)
    inviteCode: inviteCode,
  });
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('알림', '이름, 이메일, 비밀번호를 입력해주세요.');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!form.phone) {
      Alert.alert('알림', '전화번호를 입력해주세요. 자녀와 연동에 사용됩니다.');
      return;
    }

    setLoading(true);
    try {
      await register(form);
      Alert.alert('완료', '회원가입이 완료되었습니다!', [
        { text: '확인', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('오류', error.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>어르신 회원가입</Text>
      <Text style={styles.subtitle}>약 복용 관리를 시작해보세요</Text>

      <Input
        label="이름 *"
        value={form.name}
        onChangeText={(v) => updateField('name', v)}
        placeholder="이름"
      />
      <Input
        label="이메일 *"
        value={form.email}
        onChangeText={(v) => updateField('email', v)}
        placeholder="이메일"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="비밀번호 *"
        value={form.password}
        onChangeText={(v) => updateField('password', v)}
        placeholder="비밀번호"
        secureTextEntry
      />
      <Input
        label="비밀번호 확인 *"
        value={form.passwordConfirm}
        onChangeText={(v) => updateField('passwordConfirm', v)}
        placeholder="비밀번호 확인"
        secureTextEntry
      />
      <Input
        label="전화번호 *"
        value={form.phone}
        onChangeText={(v) => updateField('phone', v)}
        placeholder="010-0000-0000"
        keyboardType="phone-pad"
      />

      {inviteCode ? (
        <Card style={styles.inviteCard}>
          <Text style={styles.inviteLabel}>초대 코드가 적용되었습니다</Text>
          <Text style={styles.inviteCode}>{inviteCode}</Text>
          <Text style={styles.inviteDesc}>
            가입 완료 시 자녀와 자동으로 연동됩니다
          </Text>
        </Card>
      ) : (
        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>자녀 연동 (선택)</Text>
          <Text style={styles.sectionDesc}>
            자녀의 전화번호를 입력하면 연동 요청을 보냅니다.
            {'\n'}나중에 설정에서도 연동할 수 있어요.
          </Text>
          <Input
            label="자녀 전화번호"
            value={form.linkedPhone}
            onChangeText={(v) => updateField('linkedPhone', v)}
            placeholder="010-0000-0000"
            keyboardType="phone-pad"
          />
        </View>
      )}

      <Button
        title="가입하기"
        onPress={handleRegister}
        loading={loading}
        style={styles.submitButton}
      />
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
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  inviteCard: {
    backgroundColor: COLORS.primaryLight,
    padding: 16,
    marginBottom: 16,
  },
  inviteLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  inviteCode: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  inviteDesc: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primaryDark,
  },
  linkSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginBottom: 12,
    lineHeight: 18,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default RegisterSeniorScreen;
