import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

export default function AppForm({ route, navigation }) {
  let editItem;

  if (route.params) {
    editItem = route.params.data[0];
  }

  const id = editItem ? editItem["id"] : undefined;
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");

  async function saveItem(listItem, id) {
    if (id) {
      await axios
        .put(
          `http://professornilson.com/testeservico/clientes/${id}`,
          { nome: nome, cpf: cpf, telefone: telefone }
        )
        .then(function (response) {
          showMessage({
            message: "Sucesso",
            description: "O registro foi salvo!",
            type: "default",
            backgroundColor: "green",
            color: "#FFFFFF",
          });
        })
        .catch(function (error) {
          showMessage({
            message: "Erro",
            description: "Houve algum erro!",
            type: "default",
            backgroundColor: "red",
            color: "#FFFFFF",
          });
        });
    } else {
      await axios
        .post(
          `http://professornilson.com/testeservico/clientes`,
          { nome: nome, cpf: cpf, telefone: telefone }
        )
        .then(function (response) {
          showMessage({
            message: "Sucesso",
            description: "O registro foi salvo!",
            type: "default",
            backgroundColor: "green",
            color: "#FFFFFF",
          });
        })
        .catch(function (error) {
          showMessage({
            message: "Erro",
            description: "Houve algum erro!",
            type: "default",
            backgroundColor: "red",
            color: "#FFFFFF",
          });
        });
    }
  }

  useEffect(() => {
    if (!editItem) {
      return;
    }
    setNome(editItem["nome"]);
    setCPF(editItem["cpf"]);
    setTelefone(editItem["telefone"]);
  }, [route]);

  function handleNameChange(nome) {
    setNome(nome);
  }
  function handleCPFChange(cpf) {
    setCPF(cpf);
  }

  function handleTelefoneChange(telefone) {
    setTelefone(telefone);
  }

  async function handleButtonPress() {
    const listItem = { nome, cpf, telefone };
    saveItem(listItem, id).then((response) =>
      navigation.navigate("AppList", listItem)
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Aluno</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleNameChange}
          placeholder="Nome"
          clearButtonMode="always"
          value={nome}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleCPFChange}
          placeholder="CPF"
          clearButtonMode="always"
          value={cpf}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleTelefoneChange}
          placeholder="Telefone"
          clearButtonMode="always"
          value={telefone}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <View style={styles.buttonContainer}>
            <Icon name="save" size={22} color="white" />
            <Text style={styles.buttonText}>Salvar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007fd9",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: "90%",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "stretch",
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
