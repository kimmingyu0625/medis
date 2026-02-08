import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.subtitle}>어떤 분이신가요?</Text>

      <TouchableOpacity
        style={styles.roleCard}
        onPress={() => navigation.navigate('RegisterSenior')}
      >
        <Text style={styles.roleEmoji}>👴👵</Text>
        <View style={styles.roleInfo}>
          <Text style={styles.roleName}>어르신</Text>
          <Text style={styles.roleDesc}>
            약 복용 관리를 받고,{'\n'}자녀와 연동할 수 있어요
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleCard}
        onPress={() => navigation.navigate('RegisterChild')}
      >
        <Text style={styles.roleEmoji}>👨‍👩‍👧</Text>
        <View style={styles.roleInfo}>
          <Text style={styles.roleName}>자녀</Text>
          <Text style={styles.roleDesc}>
            어르신의 약 복용 현황을 확인하고,{'\n'}초대 링크를 보낼 수 있어요
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  roleEmoji: {
    fontSize: 40,
    marginRight: 20,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default RegisterScreen;
