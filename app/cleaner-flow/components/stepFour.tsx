import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

function DropdownSelect({
  label,
  options,
  value,
  onChange,
  showLabel = true,
}: {
  label: string;
  options: string[];
  value: string;
    onChange: (v: string) => void;
  showLabel?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={tw`rounded-2xl border border-[#EFEFF5] bg-[#FFFFFF] px-4 py-3 mb-3`}>
      {showLabel ? <Text style={tw`text-[#6C6F7A] mb-2`}>{label}</Text> : null}
      <View style={tw`relative`}>
        <Pressable
          onPress={() => setOpen((p) => !p)}
          style={tw`h-11 rounded-xl bg-white border border-[#E5E0EF] px-3 flex-row items-center justify-between`}
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

export default function StepFour() {
  const [area, setArea] = useState<string>('0');
  const [fogging, setFogging] = useState<string>('Foamed and Scrubbed Affected Area with SK-250. Applied Sterilex Solution. SFT treatment completed on all drains.');
  const [uploads, setUploads] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [roomTitle, setRoomTitle] = useState<string>('Fruit Room 1 - Drains, Floors');
  const [roomOpen, setRoomOpen] = useState<boolean>(false);
  const roomOptions = [
    'Fruit Room 1 - Drains, Floors',
    'Fruit Room 2 - Equipment',
    'Fresh Kitchen - Walls',
  ];

  const startFakeUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const durationMs = 4000;
    const startAt = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startAt;
      const pct = Math.min(1, elapsed / durationMs);
      setUploadProgress(pct);
      if (pct >= 1) {
        clearInterval(timer);
        setIsUploading(false);
      }
    }, 100);
  };

  const removeUploadAt = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const remaining = Math.max(0, 3 - uploads.length);
    if (remaining === 0) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: remaining,
    });
    if (!('canceled' in result) || result.canceled) return;
    if (Array.isArray(result.assets) && result.assets.length) {
      setUploads((prev) => {
        const added = result.assets.map((a: any) => a.uri).slice(0, remaining);
        return [...prev, ...added].slice(0, 3);
      });
      startFakeUpload();
    }
  };

  return (
     <View style={[{ flex: 1, paddingBottom: 100 }, tw`bg-[#F7F7F7] p-3`]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
           <View style={[tw`mb-3`, { position: 'relative' }]}>
               <Pressable
                 onPress={() => setRoomOpen((p) => !p)}
                 style={tw`bg-white mr-8 rounded-2xl border border-[#ECECF2] px-4 py-3`}
               >
                   <View style={tw`flex-row items-center justify-between`}>
                       <Text style={tw`text-[#2D1B3DE5] font-semibold`}>{roomTitle}</Text>
                       <Ionicons name={roomOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#2D1B3DE5" />
                   </View>
               </Pressable>
               {roomOpen ? (
                 <View style={tw`absolute left-0 right-0 top-14 rounded-2xl bg-white border border-[#ECECF2] overflow-hidden z-10`}>
                     {roomOptions.map((opt) => (
                         <Pressable
                           key={opt}
                           onPress={() => { setRoomTitle(opt); setRoomOpen(false); }}
                           style={tw`px-4 py-3`}
                         >
                             <Text style={tw`text-[#2B2B2E]`}>{opt}</Text>
                         </Pressable>
                     ))}
                 </View>
               ) : null}
           </View>

        <View style={tw`bg-white rounded-2xl border border-[#F0F1F5] p-4 mt-3`}>
          <Text style={tw`text-[#2B2B2E] font-extrabold mb-2 text-[16px]`}>Documentation Evidence</Text>

          <DropdownSelect
            label="Area Performed"
            options={[...Array(10)].map((_, i) => String(i))}
            value={area}
            onChange={setArea}
          />

          <View style={tw`mt-1`}>
            <Text style={tw`text-[#2D1B3DE5] mb-2 text-[12px]`}>Fogging Rooms</Text>
            <View style={tw`rounded-2xl border border-[#2D1B3D33] bg-white p-4`}>
              <Text style={tw`text-[#2B2B2E]`}>
                {fogging}
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`bg-white rounded-2xl border border-[#F0F1F5] p-4 mt-4`}>
          <Text style={tw`text-[#2B2B2E] font-extrabold mb-3 text-[16px]`}>Photo Evidence</Text>

          <Pressable onPress={uploads.length >= 3 ? undefined : pickImages} style={tw`rounded-2xl border-2 border-dashed border-[#C9A8FF] bg-[#F5EEFF] py-10 items-center justify-center mb-4`}>
            <View style={tw`h-12 w-12 rounded-full bg-white items-center justify-center mb-3`}>
              <Ionicons name="cloud-upload-outline" size={22} color="#7B61FF" />
            </View>
            <Text style={tw`text-[#2B2B2E] font-semibold`}>Add Photos/Videos/Audio</Text>
            <Text style={tw`text-[#6C6F7A] mt-1`}>Upload evidence. This is required for compliance</Text>
            <View style={tw`mt-2`}>
              <Text style={tw`text-[#6B5DEB] font-bold`}>Browse</Text>
            </View>
          </Pressable>

          <Text style={tw`text-[#2B2B2E] font-semibold mb-2`}>Uploaded media</Text>
          <View style={tw`flex-row items-center`}>
            {uploads.map((uri, idx) => (
              <View key={uri + idx} style={[tw`mr-3`, { position: 'relative' }]}> 
                <Image source={{ uri }} style={tw`h-16 w-16 rounded-xl`} />
                <Pressable
                  onPress={() => removeUploadAt(idx)}
                  style={[{ position: 'absolute', top: -6, right: -6 }, tw`h-5 w-5 rounded-full bg-white items-center justify-center border border-[#E5E0EF]`]}>
                  <Ionicons name="close" size={12} color="#2B2140" />
                </Pressable>
              </View>
            ))}
            {uploads.length < 3 ? (
              <Pressable onPress={pickImages} style={tw`h-16 w-16 rounded-xl border border-[#E6DAFF] bg-[#F5EEFF] items-center justify-center`}>
                <Ionicons name="add" size={18} color="#7B61FF" />
              </Pressable>
            ) : null}
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-[#6C6F7A] mb-1 text-[12px]`}>
              Upload time left: <Text style={tw`text-[#E565B8]`}>{Math.max(0, Math.ceil((1 - uploadProgress) * 4))}s</Text>
            </Text>
            <View style={tw`h-2 rounded-full bg-[#EFEFF5]`}>
              <View style={[tw`h-2 rounded-full bg-[#E565B8]`, { width: `${Math.round(uploadProgress * 100)}%` }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


