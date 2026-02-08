import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONT_SIZES } from '../../constants/colors';

const Button = ({ title, onPress, variant = 'primary', loading = false, disabled = false, style }) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.outlineButton,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.primaryText : styles.outlineText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});

export default Button;
