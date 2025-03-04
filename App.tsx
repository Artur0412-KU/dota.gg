import { StatusBar } from 'expo-status-bar';
import './global.css';
import {  SafeAreaView, Text, } from 'react-native';
import List from 'components/List/List';

export default function App() {
  return (
    <SafeAreaView className='flex-1 h-full bg-slate-600 pt-[40px]'>
      <List/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}