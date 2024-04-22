import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({visible, onClose, onSubmit, isEdit, note}: any) => {
const [title, setTitle] = useState<string>('');
const [desc, setDesc] = useState<string>('');

  const handleModalClose = () => {
    Keyboard.dismiss();
    
  };

  const handleOnChangeText = (text: any, valueFor: any)=>{
if(valueFor === 'title')setTitle(text); 
if(valueFor === 'desc') setDesc(text);
  }
  // console.log(title,desc);

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim())  return onClose();
    
if(isEdit){
onSubmit(title, desc, Date.now());
}else{

  onSubmit(title, desc);
  setTitle('');
  setDesc('');
}


    onClose();
  };
  
  const closeModal = ()=>{
    if(!isEdit){
      setTitle('');
      setDesc('');
    }
    onClose();
  }

  useEffect(()=>{
    if(isEdit){
      setTitle(note.title);
      setDesc(note.desc);
    }
  },[isEdit])

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
          value={title}
          onChangeText={(text: string)=>handleOnChangeText (text, 'title')} placeholder="Title" style={[styles.input, styles.title]} />
          <TextInput
            placeholder="Description"
            style={[styles.input, styles.desc]}
            multiline
            value={desc}
            onChangeText={(text: string)=>handleOnChangeText (text, 'desc')}
          />
          <View style={styles.btnContainer}>
{
title.trim() || desc.trim() ?
          <RoundIconBtn name="check" color={colors.LIGHT}
          onPress={
            handleSubmit
          } />: null
}
          <RoundIconBtn name="close" color={colors.LIGHT} onPress={closeModal} />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBg, StyleSheet.absoluteFillObject]}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 60,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBg: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 20,
  },
});
