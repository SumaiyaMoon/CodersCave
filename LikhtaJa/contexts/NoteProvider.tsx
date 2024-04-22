import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';


const NoteContext = createContext<any>(null); 

const NoteProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<Array<any>>([]);

  const findNotes = async()=>{
    const result: any = await AsyncStorage.getItem('notes');
    // console.log(result); 
    if (result !== null) {
      setNotes(JSON.parse(result)); 
      //we can only store string values in async storage so we parsed it.
    }
  }
  useEffect(() => {
    // AsyncStorage.clear();
    findNotes();

  }, []);


    return (
        <NoteContext.Provider value={{notes, setNotes, findNotes}}>
            {children}
        </NoteContext.Provider>
    );
};


export const useNotes = () =>
    useContext(NoteContext)

export default NoteProvider;
