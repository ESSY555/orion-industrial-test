import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Image } from 'react-native';
import bulb from '../../../assets/images/bulb.png';
import confask from '../../../assets/images/confask.png';
type Chemical = {
  id: string;
    name: string;
    icon?: keyof typeof Ionicons.glyphMap;
};

const chemicals: Chemical[] = [
    { id: 'c1', name: 'SK-250', icon: 'flask-outline' },
    { id: 'c2', name: 'SK-140', icon: 'flask-outline' },
    { id: 'c3', name: 'SK-241', icon: 'flask-outline' },
    { id: 'c4', name: 'SK-148', icon: 'flask-outline' },
    { id: 'c5', name: 'SK-150', icon: 'flask-outline' },
    { id: 'c6', name: 'SK-148', icon: 'flask-outline' },
    { id: 'c7', name: 'Sterilex Ultra Activator', icon: 'flask-outline' },
];

function CounterRow({ label, value, onInc, onDec }: { label: string; value: number; onInc: () => void; onDec: () => void }) {
  return (
        <View style={tw`bg-[#F6F6F6] rounded-2xl border border-[#EEF0F3] px-4 py-3 mb-3 flex-row items-center`}>
            <View style={tw`h-10 w-10 rounded-full bg-[#FFFFFF] items-center justify-center mr-3`}>
              <Image source={confask} style={tw`h-5 w-5`} />
            </View>
            <Text style={tw`flex-1 text-[12px] text-[#2B2B2E] font-semibold`}>{label}</Text>
            <Pressable onPress={onDec} style={tw`h-8 w-8 rounded-lg border-[1.4px] bg-white border-[#8B4CE8] items-center justify-center mr-3`}>
                <Ionicons name="remove-outline" size={18} color="#7B61FF" />
            </Pressable>
            <View style={tw`h-8 w-8 rounded-lg bg-white items-center justify-center`}>
                <Text style={tw`text-[#2B2B2E] font-bold`}>{value}</Text>
            </View>
            <Pressable onPress={onInc} style={tw`h-8 w-8 rounded-lg bg-[#7B61FF] items-center justify-center ml-3`}>
                <Ionicons name="add-outline" size={18} color="#FFFFFF" />
            </Pressable>
        </View>
    );
}

function DropdownSelect({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: string[];
    value: string;
        onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <View style={tw`rounded-xl mb-3`}>
            <Text style={tw`text-[#6C6F7A] mb-2`}>{label}</Text>
            <View style={tw`relative`}> 
                <Pressable
                    onPress={() => setOpen((p) => !p)}
                    style={tw`h-11 rounded-xl border border-[#2D1B3D66] px-3 flex-row items-center justify-between`}
                >
                    <Text style={tw`text-[#2B2B2E] font-semibold`}>{value}</Text>
                    <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#6C6F7A" />
                </Pressable>
                {open ? (
                    <View style={tw`absolute left-0 right-0 top-12 rounded-xl bg-white border border-[#E5E0EF] overflow-hidden z-10`}>
                        <ScrollView style={tw`max-h-48`} keyboardShouldPersistTaps="handled">
                            {options.map((opt) => (
                                <Pressable
                                    key={opt}
                                    onPress={() => {
                                        onChange(opt);
                                        setOpen(false);
                                    }}
                                    style={tw`px-3 py-3 bg-white`}
                                >
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

export default function StepThree() {
    const [counts, setCounts] = useState<Record<string, number>>(() =>
        chemicals.reduce((acc, c) => ({ ...acc, [c.id]: 1 }), {})
    );

    const increment = (id: string) => setCounts((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
    const decrement = (id: string) =>
        setCounts((p) => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) - 1) }));

    const [totes, setTotes] = useState<string>('0');
    const [fogging, setFogging] = useState<string>('None');
    const totalChemicals = useMemo(() => Object.values(counts).reduce((acc, curr) => acc + curr, 0), [counts]);

  return (
      <View style={tw`flex-1 pb-6 bg-[#FFFFFF]`}>
          <View style={tw`mt-3 bg-white rounded-2xl border border-[#F0F1F5] p-3`}>
              <Text style={tw`text-[#6C6F7A] mb-2`}>Chemicals Used (Jugs Filled)</Text>
              <ScrollView contentContainerStyle={tw`pb-32`}>
                  {chemicals.map((c) => (
                      <CounterRow
                          key={c.id}
                          label={c.name}
                          value={counts[c.id] ?? 0}
                          onInc={() => increment(c.id)}
                          onDec={() => decrement(c.id)}
                      />
                  ))}

                  <View style={tw`mt-2 bg-white rounded-2xl p-4 flex-row items-center justify-between border border-[#F0F1F5] shadow-sm`}>
                      <View style={tw`flex-row items-center`}>
                          <View style={tw`h-8 w-8 rounded-full bg-[#F1ECFF] items-center justify-center mr-3`}>
                              <Ionicons name="flask-outline" size={16} color="#7B61FF" />
                          </View>
                          <View style={tw`flex-row items-center`}>
                              <Text style={tw`text-[#6C6F7A]`}>Total Chemicals Used=</Text>
                              <Text style={tw`text-[18px] font-extrabold text-[#2B2B2E]`}> {totalChemicals}</Text>
                          </View>
                      </View>
                  </View>
                  <View style={tw`mt-4 bg-[#EFE7FF] rounded-2xl border border-[#E3DBFF] p-4`}>
                      <View style={tw`flex-row items-center mb-3`}>
                          <Image source={bulb} style={tw`h-5 w-5`} />
                          <Text style={tw`ml-2 text-[14px] text-[#2B2B2E] font-semibold`}>Special Activities</Text>
                      </View>
                      <DropdownSelect
                          label="Number of Green Totes Cleaned"
                          options={[...Array(10)].map((_, i) => String(i))}
                          value={totes}
                          onChange={setTotes}
                      />
                      <DropdownSelect
                          label="Fogging Rooms"
                          options={["None", "Room 1", "Room 2", "Room 3"]}
                          value={fogging}
                          onChange={setFogging} 
                      />
                  </View>
              </ScrollView>
          </View>
    </View>
  );
}


