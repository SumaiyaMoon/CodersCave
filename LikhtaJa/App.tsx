import {useEffect, useState} from 'react';
import Intro from './screens/intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './screens/noteScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from './components/noteDetail';
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './contexts/NoteProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState<boolean>(false);

  const findUser = async () => {
    const result: any = await AsyncStorage.getItem('user');

if(result === null) return setIsAppFirstTimeOpen(true);
    
setUser(JSON.parse(result));
setIsAppFirstTimeOpen(false);
    
  };

const RenderNoteScreen = (props: any)=> <NoteScreen {...props} user={user} />; 

  useEffect(() => {
    findUser();
    // AsyncStorage.clear();
  }, []);

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  // return <RoundIconBtn />;

  return(

 <NavigationContainer>
  <NoteProvider>
  <Stack.Navigator
   screenOptions={{ headerTitle: '', headerTransparent: true }}
   >
    {/* <Stack.Screen name="Intro" component={Intro} /> */}
    <Stack.Screen name="NoteScreen" component={RenderNoteScreen} />
    <Stack.Screen name="NoteDetail" component={NoteDetail} />
  </Stack.Navigator>
  </NoteProvider>
 </NavigationContainer>
    //  <NoteScreen user={user} />
  )
}
