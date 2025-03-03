import { useState, useEffect } from "react";
import { Button, Pressable, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

export default function Filter() {
  const [typesOpen, setTypesOpen] = useState(false);
  const [attributesOpen, setAttributesOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueAttribute, setValueAttributes] = useState(null);
  const [types, setTypes] = useState<{ label: string; value: string }[]>([]);
  const [attributes, setAttributes] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.opendota.com/api/heroStats");
  
        const rolesSet = new Set<string>();
        const attributesSet = new Set<string>();  
  
        response.data.forEach((hero: any) => {
          hero.roles.forEach((role: string) => rolesSet.add(role));
          if (hero.primary_attr) {
            attributesSet.add(hero.primary_attr); 
          }
        });
  
        const formattedRoles = Array.from(rolesSet)
          .map((role) => ({
            label: role,
            value: role.toLowerCase(),
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
  
        const formattedAttributes = Array.from(attributesSet)
          .map((attribute) => ({
            label: attribute.toUpperCase(),  
            value: attribute.toLowerCase(),
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
  
        setTypes(formattedRoles);
        setAttributes(formattedAttributes);  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []); 

  return (
    <View className="p-4 flex">
        <View className="flex-row gap-4">
          <View className="flex-1 z-10">
            <DropDownPicker
                open={typesOpen}
                value={value}
                items={types} 
                setOpen={setTypesOpen}
                setValue={setValue} 
                placeholder="Select a role"
                style={{ backgroundColor: "#475569", borderColor: "white", borderWidth: 3}}
                dropDownContainerStyle={{ backgroundColor: "#475569", borderColor: "white" }}
                textStyle={{ color: "white", fontSize: 16 }}
            />
         </View>
     
        <View className="flex-1 z-10">
            <DropDownPicker
              open={attributesOpen}
              value={valueAttribute}
              items={attributes} 
              setOpen={setAttributesOpen}
              setValue={setValueAttributes} 
              placeholder="Select an attribute"
              style={{ backgroundColor: "#475569", borderColor: "white", borderWidth: 3 }}
              dropDownContainerStyle={{ backgroundColor: "#475569", borderColor: "white" }}
              textStyle={{ color: "white", fontSize: 16 }}
            />
        </View>  
       
        </View>
        <Pressable className = 'bg-blue-600 active:bg-blue-700 px-6 py-3 rounded-3xl shadow-md shadow-black/30 w-full mt-[10px]'>
            <Text className="text-white font-semibold text-lg text-center">Save</Text>
        </Pressable>
      
    </View>
  );
}

