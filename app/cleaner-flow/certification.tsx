import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import experimentOne from '../../assets/images/experiment-one.png';

export default function Certification() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Certification'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Certification'>>();
  const username = route.params?.username;
  const [recent, setRecent] = useState<{ title: string; date: string }[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const raw = (await AsyncStorage.getItem('sanitrack:certificates')) || '[]';
                const list = JSON.parse(raw) as { title: string; date: string }[];
                if (mounted) setRecent(list);
            } catch {
                if (mounted) setRecent([]);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

  return (
    <View style={[tw`flex-1 bg-[#F7F7F7]`]}> 
      {/* Header */}
      <View style={[tw`px-4 pt-14 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-9 h-9 rounded-full bg-white items-center justify-center`}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[18px]`]}>Certifications</Text>
        <TouchableOpacity style={tw`w-9 h-9 rounded-full bg-white items-center justify-center`}>
                  <Ionicons name="time-outline" size={18} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={[tw`px-4 mt-10`]}>
          <View style={tw`rounded-2xl bg-white`}>
            <View style={tw`rounded-2xl border-2 border-[#F5C88F] p-4 bg-white overflow-hidden`}>
              <View style={tw`absolute left-[-6px] top-[-6px] w-7 h-7 rounded-full bg-[#FF9800] border-4 border-white`} />
              <View style={[tw`items-center`]}>
                <View style={[tw`flex-row items-center`]}>
                  <Ionicons name="business-outline" size={16} color="#F59E0B" />
                  <Text style={[tw`text-[12px] ml-2`, { color: '#F59E0B', fontWeight: '700' }]}>Pandas Factory</Text>
                </View>
                <Text style={[tw`mt-2`, { color: '#2B2140', fontWeight: '900', fontSize: 26 }]}>Level 2 Certified</Text>
                <Text style={[tw`mt-1`, { color: '#6B7280', fontSize: 12 }]}>Basic Skills & Awareness</Text>
                              <Text style={[tw`mt-3`, { color: '#2B2140', fontWeight: '600', fontSize: 16 }]}>{username ? String(username) : 'Emmanuella'}</Text>
                <View style={tw`mt-1 w-4/5 h-0.5 bg-[#F5C88F]`} />
              </View>
              <View style={[tw`flex-row items-center justify-between mt-3`]}>
                <Text style={[tw`text-[12px]`, { color: '#111827' }]}>Issued: May 15, 2025</Text>
                <Text style={[tw`text-[12px]`, { color: '#111827' }]}>ID: PF-2025-L2-0847</Text>
              </View>
            </View>
          </View>


          <View style={tw`bg-white rounded-2xl p-4 mt-4`}>
            <View style={[tw`flex-row items-center justify-between mb-3`]}>
              <Text style={[tw`text-black font-bold`]}>Authorized Chemicals</Text>
              <TouchableOpacity style={[tw`flex-row items-center`]}>
                <Text style={[tw`text-[#6B7280] text-[12px] mr-1`]}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <View style={[tw`flex-row flex-wrap justify-between`]}>
              {['SK-250', 'SK-146', 'SK-148', 'SK-831', 'SK-833', 'SK-839'].map((code) => (
                <View key={code} style={tw`w-[30%] mb-4 items-center`}>
                  <View style={tw`w-11 h-11 rounded-full bg-[#F1EAFE] items-center justify-center`}>
                    <Ionicons name="flask-outline" size={16} color="#7C5CFF" />
                  </View>
                  <Text style={[tw`text-[#6B7280] mt-2 text-[12px]`]}>{code}</Text>
                </View>
              ))}
            </View>
          </View>


          <View style={tw`bg-white rounded-2xl p-4 mt-4`}>
            <View style={[tw`flex-row items-center justify-between mb-3`]}>
              <Text style={[tw`text-black font-bold`]}>Recent Certifications</Text>
              <TouchableOpacity style={[tw`flex-row items-center`]}>
                <Text style={[tw`text-[#6B7280] text-[12px] mr-1`]}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

                      {(recent.length ? recent : [
                          { title: 'Chemical Handling Sk-148', date: 'Completed: Jul 28, 2025' },
              { title: 'LOTO Procedures', date: 'Completed: Aug 5, 2025' },
                      ]).map((row, idx) => (
                        <View key={idx} style={tw.style('bg-white rounded-xl border border-[#EFEFEF] p-3 flex-row items-center justify-between', idx === 0 && 'mb-3')}> 
                              <View style={[tw`flex-row items-center flex-1`]}>
                            <View style={tw`w-[46px] h-8 rounded-lg bg-[#F6F6FA] items-center justify-center`}>
                              <Image source={experimentOne} style={tw`w-[52px] h-8`} resizeMode="contain" />
                  </View>
                                  <View style={[tw`ml-3`, { flexShrink: 1 }]}>
                                      <Text style={[tw`text-black font-semibold text-[14px]`]} numberOfLines={1} ellipsizeMode="tail">{row.title}</Text>
                                      <Text style={[tw`text-[#6B7280] text-[12px] mt-1`]}>{row.date}</Text>
                  </View>
                </View>
                              <View style={[tw`flex-row items-center`]}>
                                  <TouchableOpacity style={[tw`mr-3 flex-row items-center`]}>
                                      <Text style={[tw`text-[#7C5CFF] text-[12px] mr-1`]}>View</Text>
                                      <Ionicons name="eye-outline" size={16} color="#7C5CFF" />
                                  </TouchableOpacity>
                                  <TouchableOpacity accessibilityRole="button">
                                      <Ionicons name="download-outline" size={18} color="#6B7280" />
                                  </TouchableOpacity>
                              </View>
              </View>
            ))}
          </View>


          <TouchableOpacity style={tw`mt-3 bg-[#7C5CFF] rounded-2xl py-3.5 items-center justify-center flex-row`}>
            <Ionicons name="cloud-download-outline" size={16} color="#FFFFFF" />
            <Text style={[tw`text-white ml-2`]}>Download All Certificates</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


