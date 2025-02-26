import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaView, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView className='h-full bg-slate-600'>
      <Text className='text-white text-center font-semibold text-[24px] mt-[24px]'>Dota.gg</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}