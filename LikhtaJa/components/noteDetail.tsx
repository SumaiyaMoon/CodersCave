import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../misc/colors';
// import { useHeaderHeight } from '@react-navigation/stack';
import { useHeaderHeight } from '@react-navigation/elements';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './noteInputModal';



export default function NoteDetail(props: any){
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [note, setNote] = useState(props.route.params.note)
  const headerHeight = useHeaderHeight();

  const{setNotes} : any = useNotes();

  // console.log(note);
  // console.log(props.route);




    const formatDate = (ms: number) => {
const date = new Date(ms)
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }

    const deleteNote = async () => {
     const result = await AsyncStorage.getItem('notes');
     let notes = [];

     if(result !== null) {
       notes = JSON.parse(result);
     const newNotes =  notes.filter((n: any) => n.id !== note.id);
     setNotes(newNotes);
     await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
 
    }
  }

    const displayDeleteAlert = () => {
      Alert.alert('Are You Sure?', 'This action will delete the note permanently', [
        {
          text: 'Delete',
          onPress: deleteNote
        },{
          text: 'No Thanks',
          onPress: ()=>{console.log('No Thanks');}
        }
      ],{
        cancelable: true,
      })
    }
    

const handleUpdate = async (title: string, desc: string, time: number) => {
  const result = await AsyncStorage.getItem('notes') ;
  let notes = [];
  if(result !== null) notes = JSON.parse(result);
 const newNotes = notes.filter((n: any)=>{
    if(n.id == note.id){
n.title = title;
n.desc = desc;
n.isUpdated = true;
n.time = time;

setNote(n);
    }
    return n;
  })
setNotes(newNotes);
  await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
}
const handleOnClose = () => setShowModal(false);
const openEditModal = () => {
  setIsEdit(true);
  setShowModal(true);
}

    return (
       <>
       <ScrollView contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
        <Text style={styles.time}> {note.isUpdated? `Updated At ${formatDate(note.time)}` : `Created At ${formatDate(note.time)}`} </Text>
       <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
       </ScrollView>
      <View style={styles.btnContainer}>
<RoundIconBtn
onPress={displayDeleteAlert}
name='delete' style={{backgroundColor: colors.ERROR, marginBottom: 15}} />
<RoundIconBtn
onPress={openEditModal}
name='edit'   />
      <NoteInputModal isEdit={isEdit} note={note} visible={showModal} onClose={handleOnClose} onSubmit={handleUpdate} />

      </View>
       </>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        gap: 30,
        paddingHorizontal: 15,
      },
      title: {
        fontSize: 30,
        color: colors.PRIMARY,
        fontWeight: 'bold',
        // marginTop: 10,
      },
      desc: {
        fontSize: 20,
        opacity: 0.6,
      },
      time:{
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5,
      },
      btnContainer:{
position: 'absolute',
right: 15,
bottom: 50,

      }
});