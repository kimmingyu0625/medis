import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Share } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const RegisterChildScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    role: 'CHILD',
    linkedPhone: '',   // 어르신 전화번호 (선택)
  });
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [inviteResult, setInviteResult] = useState(null);

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

    setLoading(true);
    try {
      const response = await register(form);
      setRegistered(true);

      if (form.linkedPhone) {
        Alert.alert(
          '가입 완료',
          '어르신에게 초대 링크가 생성되었습니다.\n아래에서 링크를 공유하세요!'
        );
      } else {
        Alert.alert('완료', '회원가입이 완료되었습니다!', [
          { text: '확인', onPress: () => navigation.navigate('Login') },
        ]);
      }
    } catch (error) {
      Alert.alert('오류', error.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareLink = async () => {
    try {
      await Share.share({
        message: `SeniorCare 앱에서 약 복용 관리를 함께해요!\n\n아래 링크를 눌러 가입해주세요:\nseniorcare://invite/${inviteResult?.inviteCode || 'CODE'}\n\n앱 다운로드: https://seniorcare.app`,
        title: 'SeniorCare 초대',
      });
    } catch (error) {
      Alert.alert('오류', '공유에 실패했습니다.');
    }
  };

  if (registered && form.linkedPhone) {
    return (
      <View style={styles.container}>
        <View style={styles.successContent}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>가입 완료!</Text>
          <Text style={styles.successDesc}>
            어르신({form.linkedPhone})에게{'\n'}초대 링크를 보내보세요
          </Text>

          <Button
            title="초대 링크 공유하기"
            onPress={handleShareLink}
            style={styles.shareButton}
          />

          <Button
            title="로그인하기"
            variant="outline"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>자녀 회원가입</Text>
      <Text style={styles.subtitle}>어르신의 약 복용을 함께 관리하세요</Text>

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
        label="내 전화번호 *"
        value={form.phone}
        onChangeText={(v) => updateField('phone', v)}
        placeholder="010-0000-0000"
        keyboardType="phone-pad"
      />

      <View style={styles.linkSection}>
        <Text style={styles.sectionTitle}>어르신 초대 (선택)</Text>
        <Text style={styles.sectionDesc}>
          어르신의 전화번호를 입력하면 가입 후 초대 링크를{'\n'}
          카카오톡, 문자 등으로 보낼 수 있어요.
        </Text>
        <Input
          label="어르신 전화번호"
          value={form.linkedPhone}
          onChangeText={(v) => updateField('linkedPhone', v)}
          placeholder="010-0000-0000"
          keyboardType="phone-pad"
        />
      </View>

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
  // 가입 완료 화면
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  successDesc: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  shareButton: {
    width: '100%',
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
  },
});

export default RegisterChildScreen;
