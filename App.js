import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {

   getWord = (word) =>{
   var searchKeyword = word.tolowerCase();
   var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
   return fetch(url) 
   .then((data)=>{
     if(data.status===200){
       return data.json()
     }
     else
     {
       return null
     }
   })
   .then ((response)=> {
     var responseObject = response

     if (responseObject) {
       var wordData = responseObject.definitions[0]
       var definition = wordData.description
       var lexicalCategory = wordData.wordtype
        
       this.setState({
         "word":this.state.text,
         "definition":definition,
         "lexicalCategory":lexicalCategory
       })
     }
     else{
       this.setState({
         "word":this.state.text,
         "definition":"Not Found",
       })
     }
   })
     }


  constructor() {
    super();
    this.state = {
      text: '',
     
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'online dictionary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
           Word:{""}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.lexicalCategory}
          </Text>
        </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>
      Type : {""}
        </Text>
        <Text style={{fontSize:18}}>
         {this.state.lexicalCategory}
        </Text>
      </View>

      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        <Text style={styles.detailsTitle}>
          Definition : {""}
        </Text>
        <Text style={{fontSize:18}}>
         {this.state.definition}
        </Text>
      </View>


        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text,
            isSearchPressed:false,
            word:"Loading...",
            lexicalCategory:'',
            examples: [],
            definition: ""
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
           this.setState({isSearchPressed:true});
           this.getWord(this.state.text)
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  }
});
