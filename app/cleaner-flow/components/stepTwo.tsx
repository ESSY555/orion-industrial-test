import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

type TimeRow = {
  id: string;
  label: string;
  optional?: boolean;
};

const rows: TimeRow[] = [
  { id: 'r1', label: 'Release to Sanitation' },
  { id: 'r2', label: 'Ready to QA' },
  { id: 'r3', label: 'QA Start Pre-op' },
  { id: 'r4', label: 'QA Finish Pre-op' },
  { id: 'r5', label: 'Time USDA', optional: true },
  { id: 'r6', label: 'Released to Production' },
];

function CurrentTimeButton({ onNow }: { onNow: () => void }) {
  return (
    <Pressable onPress={onNow} style={tw`border border-[#7B61FF] bg-white py-2.5 px-3.5 rounded-xl`}>
      <Text style={tw`text-[#7B61FF] font-bold`}>Current Time</Text>
    </Pressable>
  );
}

export default function StepTwo({ areaName }: { areaName?: string }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const parseTimeToSeconds = (timeStr: string): number | null => {
    if (!timeStr) return null;
    const safe = (timeStr ?? '').trim();
    const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i.exec(safe);
    if (!m) return null;
    let hours = parseInt(m[1], 10);
    const minutes = parseInt(m[2], 10);
    const seconds = m[3] ? parseInt(m[3], 10) : 0;
    const ampm = m[4].toUpperCase();
    if (hours === 12) hours = 0;
    if (ampm === 'PM') hours += 12;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const totalDurationLabel = (() => {
    const secs: number[] = Object.values(values)
      .map(parseTimeToSeconds)
      .filter((n): n is number => typeof n === 'number');
    if (secs.length < 2) return '--';
    const minVal = Math.min(...secs);
    const maxVal = Math.max(...secs);
    const diff = Math.max(0, maxVal - minVal);
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    const hLabel = `${h} hr${h === 1 ? '' : 's'} `; 
    const mLabel = `${m} min${m === 1 ? '' : 's'} `;
    const sLabel = `${s} sec${s === 1 ? '' : 's'}`;
    return `${hLabel}${mLabel}${sLabel}`;
  })();

  const setNow = (id: string) => {
    const d = new Date();
    const t = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    setValues((p) => ({ ...p, [id]: t }));
  };

  return (
    <View style={tw`flex-1 pb-24 bg-white`}>
      <Text style={tw`mt-3 text-[18px] font-extrabold text-[#2B2B2E]`}>{areaName ?? 'Fresh Kitchen'}</Text>

      <View style={tw`mt-2 bg-white rounded-2xl p-3`}>
        <ScrollView contentContainerStyle={tw`pb-30`}>
          {rows.map((row) => (
            <View key={row.id} style={tw`mb-3.5`}>
              <Text style={tw`text-[#6C6F7A] mb-2`}>
                {row.label}
                {row.optional ? ' (Optional)' : ''}
              </Text>
              <View style={tw`flex-row items-center`}>
                <View style={tw`flex-1 border border-[#E5E6EC] bg-white px-3 py-2.5 rounded-xl flex-row items-center mr-3`}>
                  <Ionicons name="time-outline" size={16} color="#111827" />
                  <TextInput
                    placeholder="00:00"
                    value={values[row.id] ?? ''}
                    editable={false}
                    selectTextOnFocus={false}
                    caretHidden
                    style={tw`ml-2 font-bold text-black py-0`}
                  />
                </View>
                <CurrentTimeButton onNow={() => setNow(row.id)} />
              </View>
            </View>
          ))}


          <View style={tw`mt-3 bg-white rounded-2xl p-4 border border-[#F0F1F5] shadow-sm flex-row items-start justify-between`}>
            <View style={tw`flex-shrink`}>
              <Text style={tw`text-[#6C6F7A]`}>Total Duration</Text>
              <Text style={tw`text-[18px] font-extrabold text-black`}>{totalDurationLabel}</Text>
            </View>
            <View style={tw`bg-[#9393934F] rounded-xl py-2 px-4 self-start mt-2`}>
              <Text style={tw`text-black font-semibold`}>Complete</Text>
            </View>
          </View>
        </ScrollView>
      </View>


    </View>
  );
}


