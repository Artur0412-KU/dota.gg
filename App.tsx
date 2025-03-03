import { StatusBar } from 'expo-status-bar';
import './global.css';
import {  SafeAreaView, Text, } from 'react-native';
import List from 'components/List/List';
import Filter from 'components/Filter/Filter';

export default function App() {
  return (
    <SafeAreaView className='flex-1 h-full bg-slate-600'>
      <Filter/>
      <List/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}