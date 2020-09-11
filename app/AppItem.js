import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

export default function AppItem(props) {
  async function deleteItem(id) {
    const response = await axios
      .delete(
        `http://professornilson.com/testeservico/clientes/${id}`
      )
      .then(function (response) {
        showMessage({
          message: "Sucesso",
          description: "O registro Excluído!",
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

  function handleDeletePress() {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja excluir este item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            deleteItem(props.id).then((response) =>
              props.navigation.navigate("AppList", { id: props.id })
            );
          },
        },
      ],
      { cancelable: false }
    );
  }

  async function handleEditPress() {
    const item = await axios({
      method: "get",
      url: `http://professornilson.com/testeservico/clientes/${props.id}`,
    });
    props.navigation.navigate("AppForm", item);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>{props.nome}</Text>
      <Text style={styles.textItem}>{props.cpf}</Text>
      <Text style={styles.textItem}>{props.telefone}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePress}
        >
          <Icon name="trash" color="white" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Icon name="edit" color="white" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingBottom: 10,
    marginTop: 10,
  },
  editButton: {
    marginLeft: 10,
    height: 40,
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: "#ccc",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 10,
    height: 40,
    width: 40,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: "#ccc",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textItem: {
    fontSize: 20,
  },
});
