import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('로그인 실패', error.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>SeniorCare</Text>
        <Text style={styles.subtitle}>시니어 약 복용 관리 및 돌봄 매칭</Text>

        <View style={styles.form}>
          <Input
            label="이메일"
            value={email}
            onChangeText={setEmail}
            placeholder="이메일을 입력하세요"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="비밀번호"
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry
          />

          <Button title="로그인" onPress={handleLogin} loading={loading} style={styles.loginButton} />
          <Button
            title="회원가입"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 12,
  },
});

export default LoginScreen;
