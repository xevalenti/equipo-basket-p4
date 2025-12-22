import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react'; 
import messaging from '@react-native-firebase/messaging';
import "./firebase/config";


import Home from './components/Home';
import Inicio from './components/Inicio';
import PlayerDetail from './components/PlayerDetail';
import MediaPlayer from './components/MediaPlayer';
import Equipos from './components/Equipos';
import Videos from './components/Videos';
import FormPlayer from './components/FormPlayer';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => { 
    const initNotifications = async () => { 
      // 1. Pedir permisos 
      const authStatus = await messaging().requestPermission();
       const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
       authStatus === messaging.AuthorizationStatus.PROVISIONAL; 
       
       if (enabled) { console.log('Permisos concedidos'); 

        // 2. Obtener token FCM 
        const token = await messaging().getToken(); 
        console.log('FCM Token:', token); 
        // 3. Suscribirse al topic 
        await messaging().subscribeToTopic('allUsers');
         console.log('Suscrito al topic allUsers'); } 
         
         // 4. Listener en foreground 
         const unsubscribe = messaging().onMessage(async remoteMessage => { 
          Alert.alert( 
            remoteMessage.notification?.title || 'Notificación', 
            remoteMessage.notification?.body || 'Tienes un nuevo mensaje'
           ); 
          });
             return unsubscribe;
             }; 
             initNotifications(); 
             // 5. Listener cuando la app está en background 
              messaging().setBackgroundMessageHandler(async remoteMessage => {
                 console.log('Mensaje recibido en background:', remoteMessage);
                 }); 
                 // 6. Listener cuando la app está cerrada y se abre por una notificación 
                 messaging() 
                 .getInitialNotification() 
                 .then(remoteMessage => { 
                  if (remoteMessage) { 
                    console.log('App abierta desde notificación:', 
                      remoteMessage); 
                    } 
                  }); 
                  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle:{ backgroundColor:'#e52b2b' },
          headerTintColor:'white',
          headerTitleStyle:{ fontWeight:'bold' }
        }}
      >

        <Stack.Screen 
          name="Home"
          component={Home}
          options={{ headerShown:false }}
        />

        <Stack.Screen 
          name="Inicio"
          component={Inicio}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <Image 
                  source={require('./assets/logo1.png')}
                  style={styles.logo}
                />
                <Text style={styles.headerTitle}>Jugadores</Text>
              </View>
            ),
          }}
        />
        
        <Stack.Screen name="Equipos" component={Equipos} />

        <Stack.Screen name="Videos" component={Videos} />

        <Stack.Screen name="Detalle" component={PlayerDetail} />
        <Stack.Screen name="Media" component={MediaPlayer} />
        <Stack.Screen name="FormPlayer" component={FormPlayer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  headerContainer:{
    flexDirection:'row',
    alignItems:'center',
  },

  logo:{
    width:55,
    height:50,
    marginRight:8
  },

  headerTitle:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }

});
