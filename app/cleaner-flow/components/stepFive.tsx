import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import areasCleaned from '../../../assets/images/areas-cleaned.png';
import newPot from '../../../assets/images/new-pot.png';


function Dropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-[#6C6F7A] mb-2`}>{label}</Text>
      <View style={tw`relative`}>
        <Pressable onPress={() => setOpen((p) => !p)} style={tw`h-11 rounded-xl bg-white border border-[#E5E0EF] px-3 flex-row items-center justify-between`}>
          <Text style={tw`text-[#2B2B2E] font-semibold`}>{value}</Text>
          <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#6C6F7A" />
        </Pressable>
        {open ? (
          <View style={tw`absolute left-0 right-0 top-12 rounded-xl bg-white border border-[#E5E0EF] overflow-hidden z-10`}>
            <ScrollView style={tw`max-h-48`} keyboardShouldPersistTaps="handled">
              {options.map((opt) => (
                <Pressable key={opt} onPress={() => { onChange(opt); setOpen(false); }} style={tw`px-3 py-3`}>
                  <Text style={tw`text-[#2B2B2E]`}>{opt}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function SummaryCard({ label, value, tint }: { label: string; value: string; tint: 'left' | 'right' }) {
  const bgClass = tint === 'left' ? 'bg-[#F4F1FF]' : 'bg-[#EFE8FF]';
  const iconBgClass = tint === 'left' ? 'bg-[#2B2140]' : 'bg-black';
  const iconSrc = tint === 'left' ? areasCleaned : newPot;
  return (
    <View style={tw`flex-1`}> 
      <View style={tw.style('rounded-2xl p-4', bgClass)}> 
        <View style={tw`flex-row items-center mb-2`}>
          <View style={tw.style('h-8 w-8 rounded-full items-center justify-center mr-2', iconBgClass)}>
            <Image source={iconSrc} resizeMode="contain" style={tw`w-4 h-4`} />
          </View>
          <Text style={tw`text-[#2B2B2E] font-semibold`}>{label}</Text>
        </View>
        <Text style={tw`text-[32px] font-extrabold text-[#2B2B2E]`}>{value}</Text>
      </View>
    </View>
  );
}

export default function StepFive() {
  const [wipUnit, setWipUnit] = useState('0');
  const [prodNotes1, setProdNotes1] = useState('');
  const [prodNotes2, setProdNotes2] = useState('');
  const [safetyNotes, setSafetyNotes] = useState('Maintenance was working in tote wash machine from 6:00 am to 7:00am');
  const [confirm, setConfirm] = useState(false);

  return (
    <View style={tw`flex-1 pb-3 bg-[#F7F7F7]`}>
      <ScrollView style={tw`px-3`} contentContainerStyle={tw`pb-24`}>
        <Text style={tw`text-[18px] font-extrabold text-[#2B2B2E] mt-2 mb-3`}>Final Step</Text>

        <View style={tw`flex-row mb-3`}>
        
          <View style={tw`flex-1 mr-2`}>
            <SummaryCard label="Areas Completed" value="5" tint="left" />
          </View>

          <View style={tw`flex-1 ml-2`}>
            <SummaryCard label="Jugs Used" value="81" tint="right" />
          </View>
        </View>
        

        <View style={tw`bg-white rounded-2xl border border-[#F0F1F5] p-4`}>
          <Text style={tw`text-[#2B2B2E] font-extrabold mb-3`}>Nightly Notes</Text>

          <Dropdown label="WIP Units Room 1" value={wipUnit} options={[...Array(10)].map((_, i) => String(i))} onChange={setWipUnit} />

          <Text style={tw`text-[#6C6F7A] mb-2`}>Production Notes</Text>
          <TextInput
            placeholder="Any production notes ...."
            placeholderTextColor="#9AA1AF"
            value={prodNotes1}
            onChangeText={setProdNotes1}
            multiline
            style={tw`bg-white rounded-2xl border border-[#EEF0F3] px-4 py-3 mb-4 h-24`}
          />

          <Text style={tw`text-[#6C6F7A] mb-2`}>Production Notes</Text>
          <TextInput
            placeholder="Any production notes ...."
            placeholderTextColor="#9AA1AF"
            value={prodNotes2}
            onChangeText={setProdNotes2}
            multiline
            style={tw`bg-white rounded-2xl border border-[#EEF0F3] px-4 py-3 mb-4 h-24`}
          />

          <Text style={tw`text-[#6C6F7A] mb-2`}>Safety Notes</Text>
          <TextInput
            value={safetyNotes}
            onChangeText={setSafetyNotes}
            multiline
            style={tw`bg-white rounded-2xl border border-[#EEF0F3] px-4 py-3`}
          />
        </View>

        <View style={tw.style('mt-4 rounded-2xl px-4 py-4 flex-row items-center', confirm ? 'bg-[#EDE4FF] border border-[#E3DAFF]' : 'bg-white border border-[#E3DAFF]')}>
          <Pressable
            onPress={() => setConfirm((p) => !p)}
            style={tw.style('h-6 w-6 rounded-md shadow-lg items-center justify-center mr-3', confirm ? 'bg-[#7B61FF]' : 'bg-white')}
          >
            {confirm ? <Ionicons name="checkmark" size={16} color="#FFFFFF" /> : null}
          </Pressable>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[#2B2B2E] text-[12px]`}> 
              By submitting, I confirm all information is accurate and complete.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


