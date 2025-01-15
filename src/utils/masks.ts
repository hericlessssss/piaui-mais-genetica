import React from 'react';

export const maskPhone = (value: string) => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara
  let maskedValue = numbers;
  if (numbers.length <= 11) {
    maskedValue = numbers
      .replace(/^(\d{2})/, '($1) ')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  
  return maskedValue;
};

export const maskCPF = (value: string) => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const useInputMask = (mask: (value: string) => string) => {
  return React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.target.value = mask(value);
  }, [mask]);
};