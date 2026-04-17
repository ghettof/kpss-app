import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export async function sonCalismaGuncelle() {
  await AsyncStorage.setItem('kpss_last_study', new Date().toISOString());
}

export function useNotification() {
  useEffect(() => {
    if (Platform.OS === 'web') return;

    const setup = async () => {
      try {
        const Notifications = await import('expo-notifications');

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          }),
        });

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') return;

        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '📚 KPSS Hazırlık',
            body: 'Bugün henüz çalışmadın! Birkaç soru çözmeye ne dersin?',
            sound: true,
          },
          trigger: {
            hour: 20,
            minute: 0,
            repeats: true,
          } as any,
        });
      } catch (e) {
        console.log('Bildirim kurulamadı:', e);
      }
    };

    setup();
  }, []);
}