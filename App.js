import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { storage } from './src/storage/storage';
import Cadastro from './src/screens/Cadastro';
import Confirmacao from './src/screens/Confirmacao';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('cadastro');

  useEffect(() => {
    const dadosSalvos = storage.getString('usuario');
    if (dadosSalvos) {
      setTelaAtual('confirmacao');
    }
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {telaAtual === 'cadastro' ? (
          <Cadastro onCadastrado={() => setTelaAtual('confirmacao')} />
        ) : (
          <Confirmacao onNovoCadastro={() => setTelaAtual('cadastro')} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}