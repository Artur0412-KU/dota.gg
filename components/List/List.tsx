import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, Text, View, ScrollView, Button, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import Filter from 'components/Filter/Filter';
import { Hero } from 'types/types';

export default function List() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([])
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedPrimaryAttr, setSelectedPrimaryAttr] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false)


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

  useEffect(() => {
    let filtered = [...heroes];
    if (selectedRole) {
      filtered = filtered.filter(hero => 
        hero.roles.some(role => role.toLowerCase() === selectedRole.toLowerCase())
      );
    }
    if (selectedPrimaryAttr) {
      filtered = filtered.filter(hero => 
        hero.primary_attr.toLowerCase() === selectedPrimaryAttr.toLowerCase()
      );
    }
    setFilteredHeroes(filtered);

    if (isChecked) {
      filtered = filtered.sort((a, b) => a.localized_name.localeCompare(b.localized_name))
    }
  }, [selectedRole, selectedPrimaryAttr, heroes, isChecked]);
  
  return (
    <View>
      <Filter 
        isChecked = {isChecked}
        setIsChecked = {setIsChecked}
        selectedRole={selectedRole}
        selectedPrimaryAttr={selectedPrimaryAttr}
        onRoleChange={setSelectedRole}
        onAttrChange={setSelectedPrimaryAttr}
      />
      <ScrollView className='p-[32px] h-[85%]'>
        {filteredHeroes.map((item) => (
            <View key={item.id} className='bg-slate-600 mb-6 p-4 rounded-2xl shadow-lg shadow-black/30 flex-col items-start gap-[16px] space-x-4'>
              <Image 
                source={{uri: `https://cdn.cloudflare.steamstatic.com${item.img}`}} 
                className='w-[300px] h-[200px]'
                style={{borderRadius: 10}}/>
                <View className='flex-1 flex-row items-center gap-[16px]'>
                  <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com${item.icon}` }} style={{width: 32, height: 32}} /> 
                  <Text className='text-white text-[24px] font-bold'>{item.localized_name}</Text>
                </View>
                
                <Text className='text-white text-[16px] font-bold'>Short characteristics:</Text>
                <Text key={item.id} className='text-white font-semibold text-[16px]'>Attack:</Text>
                <View className='flex-1 flex-row gap-[16px] items-center'>
                  <MaterialCommunityIcons name="sword" size={24} color="white" />
                  <Text className='text-white text-[16px]'>{item.attack_type}</Text>
                </View>

                <Text className='text-white font-semibold text-[16px]'>Primary Attribute:</Text>
                <View className='flex-1 flex-row gap-[16px] items-center'>
                   <FontAwesome5 name="running" size={24} color="white" />
                  <Text className='text-white text-[16px]'>{item.primary_attr.toUpperCase()}</Text>
                </View>

                <Text className='text-white font-semibold text-[16px]'>Speed: </Text>

                <View className='flex-1 flex-row gap-[16px] items-center'>
                  <MaterialIcons name="speed" size={24} color="white" />
                  <Text className='text-white text-[16px]'>{item.move_speed}</Text>
                </View>
                <Pressable 
                   className="bg-blue-600 active:bg-blue-700 px-6 py-3 rounded-full shadow-md shadow-black/30 w-full"
                   onPress={() => Haptics.selectionAsync()}
                >
                  <Text className="text-white font-semibold text-lg text-center">Full characteristics</Text>
                </Pressable>
                
            </View>
        ))}
    </ScrollView>
    </View>
    
  )
}
