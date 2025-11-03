import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import lamp from '../../assets/images/lamp.png';
import scientistsLookOrangeChemicalsGlassLaboratory from '../../assets/images/scientists-look-orange-chemicals-glass-laboratory 1.png';
import conflask from '../../assets/images/conflask.png';

export default function ModulsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Moduls'>>();
  const params = useRoute<RouteProp<RootStackParamList, 'Moduls'>>().params ?? ({} as any);
  const moduleNum = params.module ? Number(params.module) : 1;
  const total = params.total ? Number(params.total) : 6;
  const title = params.title || 'Chemical Handling SK-250';
  const [selected, setSelected] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  return (
    <View style={tw`flex-1 bg-[#F7F7F7]`}>

      <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-8 h-8 rounded-full bg-white items-center justify-center`}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[18px]`]}>Module {moduleNum} of {total}</Text>
        <TouchableOpacity style={tw`w-8 h-8 rounded-full bg-white items-center justify-center`}>
          <Ionicons name="time-outline" size={18} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={[tw`px-4`]}>

          <View style={tw`bg-white p-2 rounded-xl`}>
            <Image source={scientistsLookOrangeChemicalsGlassLaboratory} style={tw`w-full h-40 rounded-xl`} resizeMode="cover" />
            <View style={tw`absolute inset-0 items-center justify-center`}>
              <Ionicons name="play" size={28} color="#FFFFFF" />
            </View>
          </View>


          <View style={[tw`mt-3 flex-row justify-between`]}>
            <View>
              <Text style={[tw`text-black font-bold text[12px]`]}> {title} </Text>
              <Text style={[tw`text-[#E565B8] text-[11px] mt-1`]}>Due in 3 days</Text>
            </View>
            <TouchableOpacity style={tw`bg-[#7C5CFF] px-3 py-2 rounded-xl flex-row items-center`}>
              <Ionicons name="download-outline" size={14} color="#FFFFFF" />
              <Text style={[tw`text-white ml-2 text-[10px]`]}>Download All</Text>
            </TouchableOpacity>
          </View>


          <View style={tw`mt-3 bg-white rounded-xl p-3`}>
            <View style={[tw`flex-row items-center`]}>
              <Ionicons name="information-circle-outline" size={16} color="#7C5CFF" />
              <Text style={[tw`text-[#7C5CFF] ml-2 font-bold`]}>
                Proper Dilation Ratios
              </Text>
            </View>
            <Text style={[tw`text-[#6B7280] mt-2`]}>
              SK-250 is a concentrated cleaner that must be properly diluted before use. The standard dilution ratio is:
            </Text>
            <View style={tw`bg-[#F6F6F6] rounded-xl p-3 mt-2`}>
              {['1:128 - General cleaning', '1:128 - General cleaning', '1:128 - General cleaning'].map((t, i) => (
                <View key={i} style={[tw`flex-row items-center mt-2`]}>
                  <Image source={conflask} style={tw`w-[25px] h-[25px]`} resizeMode="contain" />
                  <Text style={[tw`ml-2 text-[#6B7280] text-[12px]`]}>{t}</Text>
                </View>
              ))}
            </View>
            <Text style={[tw`text-[#6B7280] mt-2`]}>
              Always wear appropriate PPE when handling concentrated chemicals.
            </Text>
          </View>


          <View style={tw`mt-3 bg-[#8B4CE81A] rounded-xl p-3`}>
            <View style={[tw`flex-row items-center`]}>
              <Image source={lamp} style={tw`w-[25px] h-[25px]`} resizeMode="contain" />
              <Text style={[tw`ml-2 text-[#7C5CFF] font-bold`]}>Quick Knowledge Check</Text>
            </View>
            <Text style={[tw`text-[#6B7280] mt-2 `]}>
              What is the dilution ratio for general cleaning with SK-250?
            </Text>
            {['1.16', '1.14', '1.2', '1.79'].map((opt, i) => {
              const isSelected = selected === opt;
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.9}
                  style={tw.style('mt-3 border-2 px-4 py-4 rounded-2xl flex-row items-center justify-between', isSelected ? 'border-[#7C5CFF] bg-[#DCCBFF]' : 'border-[#CBC2EE] bg-[#F3F0FF]')}
                  onPress={() => setSelected(opt)}
                >
                  <Text style={[tw`text-black`, { fontWeight: '700' }]}>{opt}</Text>
                  <View style={tw.style('w-[30px] h-[30px] rounded-full items-center justify-center', isSelected ? 'bg-[#7C5CFF]' : 'bg-[#E8DDFE]')}>
                    {isSelected && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>


          <View style={[tw`mt-3 flex-row items-center justify-between`]}>
            <TouchableOpacity style={tw`bg-white border border-[#EFEFEF] rounded-2xl px-3.5 py-5 flex-row items-center`} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={16} color="#111827" />
              <Text style={[tw`ml-2 text-black`]}>Previous Module</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-[#7C5CFF] rounded-2xl px-3.5 py-5 flex-row items-center`}
              onPress={() => navigation.navigate('FinalTest')}
            >
              <Text style={[tw`text-white mr-2`]}>Next Module</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


