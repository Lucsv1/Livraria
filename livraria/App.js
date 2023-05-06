import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import img from "./assets/floresta.png";
import { useState } from "react";

export default function App() {

  const [tituloAutor, setTituloAutor] = useState('')
  const [nomeAutor, setNomeAutor] = useState('')
  const [editora, setEditora] = useState('')
  const [preco,setPreco ] = useState('')
  const [tipo, setTipo] = useState('')
  const [tipoTerro, setTipoTerror] = useState([])
  const [tipoAventira, setTipoAventura] = useState([])

  

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
          <TextInput value={tituloAutor}
          onChangeText={setTituloAutor}
            style={{ backgroundColor: "white", textAlign: "left", padding: 2 }}
            placeholder="titulo do livor"
          />
          <TextInput value={nomeAutor}
          onChangeText={setNomeAutor}
            style={{ backgroundColor: "white", textAlign: "left", padding: 2 }}
            placeholder="nome do autor"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput value={editora}
            onChangeText={setEditora}
              style={{
                backgroundColor: "white",
                textAlign: "left",
                padding: 2,
                width: "50%",
              }}
              placeholder="editora"
            />
            <TextInput value={preco}
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
          <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
            <TextInput value={tipo}
            onChangeText={setTipo}
              style={{
                backgroundColor: "white",
                textAlign: "left",
                padding: 2,
                width: '50%'
              }}
              placeholder="tipo"
            />
            <View style={{ backgroundColor: "brown", width: '49%' }}>
              <Text onPress={()=>{
                const obj = {tituloAutor, nomeAutor, editora, preco, tipo}
                if(tipo ==  '1'){
                  setTipoTerror([...tipoTerro, obj])
                }else{
                  setTipoAventura([...tipoAventira, obj])
                }

              }}  style={{textAlign: 'center'}} >Salvar</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 2, backgroundColor: 'white' }}>
          <SectionList 
          sections={[
            {title: "livro de terro", data : tipoTerro},
            {title: 'livro de aventura', data : tipoAventira}
          ]}
          renderSectionFooter={({section})=>(
            <View>
              <Text>{section.title}</Text>
            </View>
            
          )}
          renderItem={({item})=>(
            <View>
              <Text>{item.tituloAutor}</Text>
              <Text>{item.nomeAutor}</Text>
              <Text>{item.editora}</Text>
              <Text>{item.preco}</Text>
              <Text>{item.tipo}</Text>
            </View>
          )} 
          keyExtractor={item => item.key}/>
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
