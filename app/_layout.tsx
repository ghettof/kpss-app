import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="cikmis-sorular" options={{ headerShown: false }} />
        <Stack.Screen name="deneme-sinavi" options={{ headerShown: false }} />
        <Stack.Screen name="konu-calis" options={{ headerShown: false }} />
        <Stack.Screen name="ai-soru" options={{ headerShown: false }} />
        <Stack.Screen name="istatistik" options={{ headerShown: false }} />
        <Stack.Screen name="rozetler" options={{ headerShown: false }} />
        <Stack.Screen name="spk" options={{ headerShown: false }} />
        <Stack.Screen name="spk-sinav" options={{ headerShown: false }} />
        <Stack.Screen name="flashcard" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}