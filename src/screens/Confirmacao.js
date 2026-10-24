import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Avatar, ListItem, Button, Text } from '@rneui/themed';
import { storage } from '../storage/storage';

export default function Confirmacao({ onNovoCadastro }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dadosSalvos = storage.getString('usuario');
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  }, []);

  const handleSair = () => {
    storage.delete('usuario');
    onNovoCadastro();
  };

  if (!usuario) return <View style={styles.container}><Text>Carregando...</Text></View>;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Cadastro Realizado!</Card.Title>
        <Card.Divider />
        <View style={styles.avatarContainer}>
          <Avatar
            size="large"
            rounded
            title={usuario.nome.substring(0, 2).toUpperCase()}
            containerStyle={{ backgroundColor: '#2089dc' }}
          />
        </View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Nome</ListItem.Title>
            <ListItem.Subtitle>{usuario.nome}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>E-mail</ListItem.Title>
            <ListItem.Subtitle>{usuario.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Telefone</ListItem.Title>
            <ListItem.Subtitle>{usuario.telefone}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Button title="Novo Cadastro" onPress={handleSair} containerStyle={styles.botao} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  botao: { marginTop: 20 }
});