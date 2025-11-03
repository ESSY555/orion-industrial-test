import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';

type Person = {
  name: string;
  status: string;
  start: string;
  end: string;
  assets: string[];
  frequency: string;
  duration: string | number;
};

type SummaryCardProps = {
  person: Person;
};

export default function SummaryCard({ person }: SummaryCardProps) {
  return (

    <View>

      <View style={[tw`flex-1 justify-center items-center -mb-5`]}>
        <View
          style={[
            tw`w-28 h-28 rounded-full shadow-xl items-center justify-center`,
            { backgroundColor: '#EFEFEF', overflow: 'hidden' },
          ]}
        >
          <Text style={[tw`text-black text-2xl font-bold`, { fontWeight: '800' }]}>
            AI
          </Text>
        </View>
      </View>


      <View style={[tw`rounded-2xl p-5 opacity-80 mx-4 `, { backgroundColor: '#FFFFFF' }, shadow()]}>
        <View style={[tw`bg-white/50`]}>
          <View style={tw`flex-row items-center  justify-between mb-2`}>
            <Text style={[tw`text-black`, { fontWeight: '800' }]}>{person.name}</Text>
            <Text style={{ color: '#2ECC71', fontWeight: '800', fontSize: 12 }}>{person.status}</Text>
          </View>
          {[
            ['Cleaning Status', person.status],
            ['Start Time', person.start],
            ['End Time', person.end],
          ].map((row, i) => (
            <Row key={i} label={row[0]} value={row[1]} />
          ))}

          {/* Assets cleaned */}
          <View style={tw`flex-row items-center justify-between mt-2`}>
            <Text style={mutedLabel()}>Assets Cleaned</Text>
            <View style={tw`flex-row items-center`}>
                {person.assets.map((a, i) => (
                  <View key={i} style={tw`flex-row items-center ml-3`}>
                    <Ionicons name="cube-outline" size={13} color="#9CA3AF" />
                    <Text style={Object.assign({}, tw`text-gray-700 ml-1`, { fontSize: 12 })}>{a}</Text>
                  </View>
                ))}
            </View>
          </View>

          <Row label="Frequency" value={person.frequency} />
          <Row label="Duration" value={person.duration} />
        </View>
      </View>
    </View>

  );
}

type RowProps = { label: string; value: string | number };

const Row: React.FC<RowProps> = ({ label, value }) => (
  <View style={tw`flex-row items-center justify-between mb-2`}>
    <Text style={mutedLabel()}>{label}</Text>
    <Text style={{ color: '#111827', fontSize: 13, fontWeight: '600' }}>{String(value)}</Text>
  </View>
);

function mutedLabel() {
  return { color: '#6B7280', fontSize: 13 } as const;
}

function shadow() {
  return {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  } as const;
}
