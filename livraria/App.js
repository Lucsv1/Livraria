import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  TouchableHighlightComponent,
  TouchableOpacity,
} from "react-native";
import img from "./assets/floresta.png";
import { useState } from "react";
import axios from "axios";




export default function App() {
  const [id, setId] = useState(null);
  const [filtro, setFiltro] = useState("")
  const [tituloAutor, setTituloAutor] = useState("");
  const [nomeAutor, setNomeAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipoTerro, setTipoTerror] = useState([]);
  const [tipoAventira, setTipoAventura] = useState([]);
  const [modal, setModal] = useState(false);
  const [lista, setLista] = useState([])

  const api = axios.create({
    baseURL: "https://livraria-a5274-default-rtdb.firebaseio.com"
  })

  const salvar = () =>{
    api.post("/Livraria.json", {nomeAutor})
    .then((res)=>{
      alert("nome do autor cadastrado!", res.data)
    })
    .catch((err) =>{
      alert(err)
    })

  }

  const deletar = () =>{
    api.delete("/Livraria" + id)
    .then((res)=>{
      alert(res.data)
    })
    .catch((err)=>{
     alert(err)
    })
  }

  const alterar = () =>{
    api.put("/Livraria" + id + nomeAutor)
    .then((res)=>{
      alert(res)
    })
    .catch((err)=>{
      alert(err)
    })

  }

  const mostrar = () =>{
    fetch("https://loja-dos-soms-default-rtdb.firebaseio.com/", {
      method: "POST",
      body: JSON.stringify(nomeAutor)
    })
    .then((res)=>{
      alert(res)
    })
    .catch((err) => {
      alert(err)
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, opacity: 1 }}>
        <ImageBackground
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          source={img}
          resizeMode="cover"
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              backgroundColor: "#174817",
              padding: 10,
              borderRadius: 10,
            }}
          >
            Livraria Amazonas
          </Text>
        </ImageBackground>
      </View>
      <View style={{ flex: 7, backgroundColor: "#174817" }}>
        <View style={{ flex: 1, padding: 10 }}>
          <Text>dados do livro</Text>
          <TextInput
            value={tituloAutor}
            onChangeText={setTituloAutor}
            style={{ backgroundColor: "white", textAlign: "left", padding: 2 }}
            placeholder="titulo do livor"
          />
          <TextInput
            value={nomeAutor}
            onChangeText={setNomeAutor}
            style={{ backgroundColor: "white", textAlign: "left", padding: 2 }}
            placeholder="nome do autor"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              value={editora}
              onChangeText={setEditora}
              style={{
                backgroundColor: "white",
                textAlign: "left",
                padding: 2,
                width: "50%",
              }}
              placeholder="editora"
            />
            <TextInput
              value={preco}
              onChangeText={setPreco}
              style={{
                backgroundColor: "white",
                textAlign: "left",
                padding: 2,
                width: "49%",
              }}
              placeholder="preço"
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              value={tipo}
              onChangeText={setTipo}
              style={{
                backgroundColor: "white",
                textAlign: "left",
                padding: 2,
                width: "50%",
              }}
              placeholder="tipo"
            />
            <View style={{ backgroundColor: "brown", width: "49%" }}>
              <Text
                onPress={salvar}
                style={{ textAlign: "center" }}
              >
                Salvar
              </Text>
              <View style={{ backgroundColor: "brown", width: "49%" }}>
                <Text style={{textAlign: 'center'}}>ver livros</Text>
              </View>
              <View style={{ backgroundColor: "brown", width: "49%" }}>
                <Text style={{textAlign: 'center'}}>atualizar</Text>
              </View>
              
            </View>
          </View>
        </View>
        <View style={{ flex: 2, backgroundColor: "white" }}>
          <SectionList
            sections={[
              { title: "livro de terro", data: tipoTerro },
              { title: "livro de aventura", data: tipoAventira },
            ]}
            renderSectionHeader={({ section }) => (
              <View>
                <Text>{section.title}</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                }}
              >
                <View style={{ backgroundColor: "blue" }}>
                  <Text>{item.tituloAutor}</Text>
                  <Text>{item.nomeAutor}</Text>
                  <Text>{item.editora}</Text>
                  <Text>{item.preco}</Text>
                  <Text>{item.tipo}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={() => setModal(false)}
          >
            <View>
              <SectionList
                sections={[
                  { title: "livro de terro", data: tipoTerro },
                  { title: "livro de aventura", data: tipoAventira },
                ]}
                renderSectionHeader={({ section }) => (
                  <View>
                    <Text>{section.title}</Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModal(false);
                    }}
                  >
                    <View style={{ backgroundColor: "blue" }}>
                      <Text>{item.tituloAutor}</Text>
                      <Text>{item.nomeAutor}</Text>
                      <Text>{item.editora}</Text>
                      <Text>{item.preco}</Text>
                      <Text>{item.tipo}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
              />
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
