import React, { useCallback, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FilterProps } from 'types/types';

const Filter: React.FC<FilterProps> = ({ selectedRole, selectedPrimaryAttr, onRoleChange, onAttrChange, isChecked,  setIsChecked}) => {
  const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);
  const [attributes, setAttributes] = useState<{ label: string; value: string }[]>([]);
  const [openRole, setOpenRole] = useState(false);
  const [openAttr, setOpenAttr] = useState(false);

  const fetchData = useCallback(async () => {
      try {
        const response = await axios.get('https://api.opendota.com/api/heroStats');

        const rolesSet = new Set<string>();
        response.data.forEach((hero: any) => {
          hero.roles.forEach((role: string) => rolesSet.add(role));
        });

        const formattedRoles = Array.from(rolesSet).map((role) => ({
          label: role,
          value: role.toLowerCase(),
        })).sort((a, b) => a.label.localeCompare(b.label));

        const attributesSet = new Set<string>();
        response.data.forEach((hero: any) => {
          attributesSet.add(hero.primary_attr);
        });

        const formattedAttributes = Array.from(attributesSet).map((attribute) => ({
          label: attribute,
          value: attribute.toLowerCase(),
        })).sort((a, b) => a.label.localeCompare(b.label));

        setRoles(formattedRoles);
        setAttributes(formattedAttributes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View className="p-4 flex-col gap-[16px]">
      <View className='flex-row gap-4'>
        <View className="flex-1 z-10">
        <DropDownPicker
          open={openRole}
          setOpen={setOpenRole}
          value={selectedRole}
          items={roles}
          setValue={onRoleChange}
          placeholder="Select a role"
          style={{ backgroundColor: "#475569", borderColor: "#fff", width: '100%' }}
          dropDownContainerStyle={{ backgroundColor: "#475569", borderColor: "white" }}
          textStyle={{ color: "white", fontSize: 16 }}
        />
      </View>

      <View className="flex-1 z-10">
        <DropDownPicker
          open={openAttr}
          setOpen={setOpenAttr}
          value={selectedPrimaryAttr}
          items={attributes}
          setValue={onAttrChange}
          placeholder="Select an attribute"
          style={{ backgroundColor: "#475569", borderColor: "#fff", width: '100%' }}
          dropDownContainerStyle={{ backgroundColor: "#475569", borderColor: "white" }}
          textStyle={{ color: "white", fontSize: 16 }}
        />
      </View>
      </View>
      

      <View className='flex-row items-center gap-[16px]'>
        <Checkbox
        value = {isChecked}
        onValueChange={setIsChecked}/>
        <Text className='text-white font-medium text-[16px]'>Sort by A-Z</Text>
      </View>
    </View>
  );
};

export default Filter;
