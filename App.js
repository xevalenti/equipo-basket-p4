import React, { useEffect } from 'react';
import { Image, Text, View, StyleSheet, Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

import Home from './components/Home';
import Inicio from './components/Inicio';
import PlayerDetail from './components/PlayerDetail';
import MediaPlayer from './components/MediaPlayer';
import Equipos from './components/Equipos';
import Videos from './components/Videos';
import FormPlayer from './components/FormPlayer';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
    });

    return () => subscription.remove();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permiso de notificaciones denegado');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('EXPO PUSH TOKEN:', token);

    try {
      await messaging().subscribeToTopic('general');
      console.log('Suscrito al topic general');
    } catch (err) {
      console.warn('Error suscribiéndose al topic:', err);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#e52b2b' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 55,
    height: 50,
    marginRight: 8
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
