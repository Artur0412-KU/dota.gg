import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, Modal, Pressable, ScrollView, Text, View } from 'react-native'
import { Hero } from 'types/types'
import { ModalProps } from 'types/types'

export default function HeroModal({modalVisible, selectedHero, handleModalClose}: ModalProps) {
  return (
    <Modal visible = {modalVisible} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center shadow-2xs bg-black/60 w-full">
           {selectedHero && (
              <View className="bg-slate-700 rounded-2xl w-[90%] max-h-[80%]">
              <Image source={{ uri: `https://cdn.cloudflare.steamstatic.com${selectedHero.img}` }} className="w-full h-[200px] " />
              <View className='p-6'>
                <Text className="text-white text-[24px] font-bold text-center">{selectedHero.localized_name}</Text>
              <ScrollView className="max-h-[400px]">
                <Text className="text-white text-[18px] font-semibold">Attack: </Text>
                <View className="flex-row gap-[16px] items-center">
                  <MaterialCommunityIcons name="sword" size={24} color="white" />
                  <Text className="text-white text-[16px]">{selectedHero.attack_type}</Text>
                </View>
    
                <Text className="text-white text-[18px] font-semibold mt-2">Primary Attribute: </Text>
                <View className="flex-row gap-[16px] items-center">
                  <FontAwesome5 name="running" size={24} color="white" />
                  <Text className="text-white text-[16px]">{selectedHero.primary_attr.toUpperCase()}</Text>
                </View>
    
                <Text className="text-white text-[18px] font-semibold mt-2">Speed: </Text>
                <View className="flex-row gap-[16px] items-center">
                  <MaterialIcons name="speed" size={24} color="white" />
                  <Text className="text-white text-[16px]">{selectedHero.move_speed}</Text>
                </View>
    
                <Text className="text-white text-[18px] font-semibold mt-2">Base Health:</Text>
                <View className="flex-row gap-[16px] items-center">
                  <MaterialIcons name="health-and-safety" size={24} color="white" />
                  <Text className="text-white text-[16px]">{selectedHero.base_health}</Text>
                </View>
    
                <Text className="text-white text-[18px] font-semibold mt-2">Base Mana:</Text>
                <View className="flex-row gap-[16px] items-center">
                  <MaterialIcons name="bolt" size={24} color="white" />
                  <Text className="text-white text-[16px]">{selectedHero.base_mana}</Text>
                </View>
    
                <Text className="text-white text-[18px] font-semibold mt-2">Base Attack:</Text>
                <View className="flex-row gap-[16px] items-center">
                  <MaterialCommunityIcons name="lightning-bolt" size={24} color="white" />
                  <Text className="text-white text-[16px]">Min: {selectedHero.base_attack_min} - Max: {selectedHero.base_attack_max}</Text>
                </View>
              </ScrollView>

              <Pressable className="bg-blue-600 active:bg-blue-700 px-6 py-3 rounded-full shadow-md shadow-black/30 w-full mt-[10px]" onPress={handleModalClose}>
                <Text className="text-white text-lg text-center">Close</Text>
              </Pressable>

              </View>
              
    
            </View>
            )}
          
          
        </View>
      </Modal>
  )
}
