import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AppItem from "./AppItem";
import axios from "axios";

export default function AppList({ route, navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://professornilson.com/testeservico/clientes`
      )
      .then((res) => {
        const result = res.data;
        result.map((res) => {});
        setItems(result);
      });
  }, [route]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Lista de Alunos</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}
      >
        {items.map((item) => {
          return (
            <AppItem
              key={item.id}
              id={item.id}
              nome={item.nome}
              cpf={item.cpf}
              telefone={item.telefone}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007fd9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  scrollContainer: {
  flex: 1,
    width: "90%",
  },
  itemsContainer: {

    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
});
