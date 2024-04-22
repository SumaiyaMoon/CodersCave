import {FlatList, Keyboard, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../misc/colors';
import SearchBar from '../components/searchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/noteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/notFound';

const reverseData = (data: any) =>{
  return data.sort((a: any , b: any)=>{
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if(aInt< bInt) return 1;
    if(aInt === bInt) return 0;
    if (aInt > bInt) return -1;
  })
}

const NoteScreen = ({user, navigation}: any) => {
  const [greet, setGreet] = useState('Evening');
  const[modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resultNotFound, setResultNotFound] = useState<boolean>(false);


  const {notes, setNotes, findNotes}: any = useNotes();




  //finding date and time to greet accordingly
  const findGreet = () => {
    const hrs = new Date().getHours();
    // console.log(hrs);
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 12 || hrs < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };

  
  const openNote = (note: any)=>{
    navigation.navigate('NoteDetail', {note});
    // console.log('navigation')
  }
  
  const handleOnSubmit = async (title: string, desc: string) => {
    // console.log(title, desc);
    // console.log('Submit button pressed's);
    
    // const time = new Date().getTime();
    const note = {id: Date.now(), title, desc, time: Date.now() }
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    // console.log(note);
  }


  const handleOnSearchInput = async (text: string)=>{
setSearchQuery(text);
if(!text.trim()){
setSearchQuery('');
setResultNotFound(false);
return await findNotes();
}
const filteredNotes = notes.filter((note: any) =>{
  if(note.title.toLowerCase().includes(text.toLowerCase()) 
    || note.desc.toLowerCase().includes(text.toLowerCase())
  ){
    return note;
  }
})
if(filteredNotes.length){
  setNotes([...filteredNotes]);
}else{
  setResultNotFound(true);
}
  }


  const handleOnClear = async ()=>{
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  }
 
  useEffect(() => {
    // AsyncStorage.clear();
    findGreet();

  }, []);

  const reverseNotes = reverseData(notes);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.container}>
        <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
        {notes.length?
        <SearchBar
        value={searchQuery}
        onChangeText={handleOnSearchInput}
        onClear={handleOnClear}
         containerStyle={{marginVertical: 15}} />: null
        }


{resultNotFound? (<NotFound/> ):

      (  <FlatList 
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={reverseNotes} 
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}: any)=><Note onPress={
          
            // console.log("Simple Message")
        ()=>{openNote(item);}    

          
        } item={item} />} 
      />)
}




        {!notes.length ? 
         <View
         style={[styles.emptyHeaderContainer, StyleSheet.absoluteFillObject]}>
         <Text style={styles.emptyHeader}>Add Notes</Text>
       </View> : null
        }
       
      </View>
      </TouchableWithoutFeedback>
          <RoundIconBtn
            onPress={() => {
              // console.log('Opening Model');
              setModalVisible(true);
            }}
            style={styles.addBtn}
            name="add"
            color={colors.LIGHT}
          />
      <NoteInputModal visible={modalVisible} onClose={()=>setModalVisible(false)} onSubmit={handleOnSubmit} />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
    color: colors.DARK,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
    
   
  },
});
