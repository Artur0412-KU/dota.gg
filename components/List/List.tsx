import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, Text, View, ScrollView, Button, Pressable } from 'react-native'

type Hero = {
    id: number,
    localized_name: string,
    attack_type: string,
    img: string,
    icon: string,
}

export default function List() {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
           const response = await axios.get('https://api.opendota.com/api/heroStats')
           setHeroes(response.data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        
    }
    fetchData();
  }, [])
  
  return (
    <ScrollView className='p-[32px]'>
        {heroes.map((item) => (
            <View key={item.id} className='bg-slate-600 mb-6 p-4 rounded-2xl shadow-lg shadow-black/30 flex-col items-start gap-[16px] space-x-4'>
                {/* <Image source={{uri: item.icon}} style={{width: 50, height: 50}} /> */}
                <Text key={item.id} className='text-white text-[24px] font-bold'>{item.localized_name}</Text>
                <Text className='text-white text-[18px]'>Short characteristics:</Text>
                <Text key={item.id} className='text-white text-[14px]'>Attack: {item.attack_type}</Text>
                {/* <Image source={{uri: item.img}} style={{width: 400, height: 400}} /> */}
                <Pressable className="bg-blue-600 active:bg-blue-700 px-6 py-3 rounded-full shadow-md shadow-black/30 w-full">
                  <Text className="text-white font-semibold text-lg text-center">Full characteristics</Text>
                </Pressable>


            </View>
        ))}
    </ScrollView>
  )
}
