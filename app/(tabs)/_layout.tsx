import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#8899AA',
        tabBarStyle: {
          backgroundColor: '#0F1923',
          borderTopColor: '#1E2A36',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="konu-calis"
        options={{
          title: 'Konular',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="istatistik"
        options={{
          title: 'Ýstatistik',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="cografya-notlar" options={{ href: null }} />
      <Tabs.Screen name="tarih-notlar" options={{ href: null }} />
      <Tabs.Screen name="turkce-notlar" options={{ href: null }} />
      <Tabs.Screen name="vatandaslik-notlar" options={{ href: null }} />
    </Tabs>
  );
}
