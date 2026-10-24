import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Input, Button, Icon, Text } from '@rneui/themed';
import { storage } from '../storage/storage';

export default function Cadastro({ onCadastrado }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const validar = () => {
    let novosErros = {};
    if (!nome) novosErros.nome = 'Nome é obrigatório';
    if (!email.includes('@')) novosErros.email = 'E-mail inválido';
    if (telefone.length < 10) novosErros.telefone = 'Telefone inválido';
    if (senha.length < 6) novosErros.senha = 'A senha deve ter no mínimo 6 caracteres';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastro = () => {
    if (validar()) {
      const usuario = { nome, email, telefone };
      storage.set('usuario', JSON.stringify(usuario));
      onCadastrado();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h3 style={styles.titulo}>Novo Cadastro</Text>
      <Input
        placeholder="Nome completo"
        leftIcon={<Icon name="person" type="material" />}
        value={nome}
        onChangeText={setNome}
        errorMessage={erros.nome}
      />
      <Input
        placeholder="E-mail"
        leftIcon={<Icon name="email" type="material" />}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        errorMessage={erros.email}
      />
      <Input
        placeholder="Telefone"
        leftIcon={<Icon name="phone" type="material" />}
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
        errorMessage={erros.telefone}
      />
      <Input
        placeholder="Senha"
        leftIcon={<Icon name="lock" type="material" />}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        errorMessage={erros.senha}
      />
      <Button title="Cadastrar" onPress={handleCadastro} containerStyle={styles.botao} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  titulo: { textAlign: 'center', marginBottom: 20 },
  botao: { marginTop: 20 }
});