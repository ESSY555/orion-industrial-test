import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions, PixelRatio, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import StepTwo from './components/stepTwo';
import StepThree from './components/stepThree';
import StepFour from './components/stepFour';
import StepFive from './components/stepFive';
import element3 from '../../assets/images/element-3.png';

type Area = {
  id: string;
  name: string;
  subtitle?: string;
  status?: 'normal' | 'overdue' | 'scheduled' | 'priority';
  checked?: boolean;
};

function Stepper({ steps, current, onPress }: { steps: number; current: number; onPress?: (step: number) => void }) {
  const circleSize = 26;
  const lineHeight = 4;
  const activeColor = '#7B61FF';
  const baseColor = '#EEF0F3';
  const textDark = '#292933';

  const activeWidthPercent = ((Math.max(1, Math.min(current, steps)) - 1) / (steps - 1)) * 100;

  return (
    <View style={tw`mt-3 mb-1.5`}>
      <View style={tw.style('', { height: circleSize, justifyContent: 'center' })}>

        <View style={tw.style('absolute rounded-full', { left: circleSize / 2, right: circleSize / 2, height: lineHeight, backgroundColor: baseColor, top: (circleSize - lineHeight) / 2 })} />

        <View style={tw.style('absolute rounded-full', { left: circleSize / 2, width: `${activeWidthPercent}%`, height: lineHeight, backgroundColor: activeColor, top: (circleSize - lineHeight) / 2 })} />


        <View style={tw`flex-row justify-between`}>
          {Array.from({ length: steps }).map((_, idx) => {
            const step = idx + 1;
            const isActive = step <= current;
            return (
              <Pressable
                key={step}
                style={tw.style('items-center justify-center', { width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: isActive ? activeColor : '#F6F7F9', borderWidth: isActive ? 0 : 1, borderColor: baseColor })}
                onPress={() => onPress?.(step)}
              >
                <Text style={tw.style('font-bold', { fontSize: 12, color: isActive ? '#FFFFFF' : '#9FA4B2' })}>
                  {step}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function Checkbox({ checked }: { checked?: boolean }) {
  return (
    <View style={
      tw.style('items-center justify-center', {
        height: 28,
        width: 28,
        borderRadius: 8,
        borderWidth: checked ? 0 : 2,
        borderColor: '#CFCFD6',
        backgroundColor: checked ? '#7B61FF' : '#FFFFFF',
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      })
    }>
      {checked ? <Ionicons name="checkmark" size={16} color="#FFFFFF" /> : null}
    </View>
  );
}

function AreaCard({ area, toggle }: { area: Area; toggle: (id: string) => void }) {
  const isSelected = Boolean(area.checked);
  const bg = isSelected ? '#E9E1FF' : '#FFFFFF';
  const border = isSelected ? '#7B61FF' : '#E5E6EC';
  const subtitleColor = isSelected ? '#6C6F7A' : '#9A9AA3';

  const statusText = useMemo(() => {
    if (area.status === 'overdue') return 'Overdue for cleaning';
    if (area.status === 'scheduled') return area.subtitle ?? 'Scheduled';
    if (area.status === 'priority') return 'Priority Area';
    return area.subtitle ?? '';
  }, [area]);

  const statusColor =
    area.status === 'overdue' ? '#E93B3B' : area.status === 'priority' ? '#E2A400' : subtitleColor;

  return (
    <Pressable
      onPress={() => toggle(area.id)}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 22,
        backgroundColor: bg,
        borderWidth: isSelected ? 2 : 1,
        borderColor: border,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
    >
      <View style={{ marginTop: 2 }}>
        <Checkbox checked={isSelected} />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#292933' }}>{area.name}</Text>
        {!!statusText && (
          <Text style={{ marginTop: 6, color: statusColor, fontSize: 13 }}>{statusText}</Text>
        )}
      </View>
    </Pressable>
  );
}

export default function CleanerFlowScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false, title: '' });
  }, [navigation]);

  const { width } = useWindowDimensions();
  const isSmall = width < 380;
  const isTablet = width >= 768;
  const [step, setStep] = useState<number>(1);

  const scale = (size: number) => {
    const guidelineBaseWidth = 375; 
    const scaled = (width / guidelineBaseWidth) * size;
    return Math.round(PixelRatio.roundToNearestPixel(Math.min(size * 1.25, Math.max(size * 0.85, scaled))));
  };
  const [areas, setAreas] = useState<Area[]>([
    { id: '1', name: 'Fruit Room 1', subtitle: 'Last cleaned: 6 hours ago', checked: true },
    { id: '2', name: 'Fresh Kitchen 2', subtitle: 'Last cleaned: 8 hours ago' },
    { id: '3', name: 'Room 3', status: 'overdue' },
    { id: '4', name: 'Tote Wash Room', status: 'scheduled', subtitle: 'Scheduled: 11:30 PM' },
    { id: '5', name: 'Cook Room 5', status: 'priority' },
  ]);

  const toggle = (id: string) =>
    setAreas((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, checked: !a.checked };
        }
        return { ...a, checked: false };
      })
    );

  const selectedFromStep1 = areas.filter((a) => a.checked).map((a) => ({ id: a.id, name: a.name }));
  const [combinedSelections, setCombinedSelections] = useState<Array<{ id: string; name: string }>>([]);
  const selectedCount = (step === 1 ? selectedFromStep1 : combinedSelections).length;

  const headerTitle = step === 1
    ? 'Areas to Audit'
    : step === 2
      ? 'Time Tracking'
      : step === 3
        ? 'Chemical Usage'
        : step === 4
          ? 'Intensive Cleaning'
          : 'Review & Submit';

  const nextButtonLabel = step === 1
    ? 'Go to Time Logs'
    : step === 2
      ? 'Chemical Usage'
      : step === 3
        ? 'Intensive Cleaning'
        : step === 4
          ? 'Review'
          : 'Submit Audit Report';

  React.useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('cleanerFlowDraftV1');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed?.areas) setAreas(parsed.areas);
        if (parsed?.combinedSelections) setCombinedSelections(parsed.combinedSelections);
        if (parsed?.step) setStep(parsed.step);
      } catch (e) { }
    })();
  }, []);

  return (
    <>
    <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <SafeAreaView style={tw`flex-1 bg-white pb-28`}>
        <View style={tw`flex-1 bg-white items-center`}>
          <View style={tw.style('flex-1 w-full', { maxWidth: 840, paddingHorizontal: isTablet ? 24 : 16 })}>
            <View style={tw`flex-row items-center mt-2`}>
          <Pressable
            onPress={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else if ((navigation as any).canGoBack?.()) {
                    (navigation as any).goBack?.();
                  } else {
                  }
            }}
                style={tw`h-11 w-11 rounded-full bg-white border border-[#EEEFF3] items-center justify-center mr-2`}
          >
            <Ionicons name="arrow-back-outline" size={20} color="#2B2140" />
          </Pressable>
              <View style={tw`flex-1`}>
                <Text style={tw.style('text-center font-extrabold text-[#2B2B2E]', { fontSize: scale(22) })}>
              {headerTitle}
            </Text>
          </View>
              <View style={tw`h-11 w-11 rounded-full bg-white border border-[#EEEFF3] items-center justify-center ml-2`}>
                <Image source={element3} style={tw`h-5 w-5`} />
          </View>
        </View>

          <View style={{ marginTop: 10 }}>
              <Stepper steps={5} current={step} onPress={(s) => setStep(s)} />
          <View style={tw.style(isSmall ? 'flex-col' : 'flex-row', 'justify-between', 'items-center', 'mt-[6px]')}>
                <Text style={[{ color: '#6B5DEB', fontWeight: '700' }, tw.style('flex-1', isSmall ? 'mb-[6px]' : '')]}>Step {step} of 5</Text>
            <Text style={[{ color: '#9A9AA3' }, tw.style('text-[12px]', 'flex-1', 'text-right')]}>Pandas Factory CH2 · Aug 8, 2025</Text>
          </View>
        </View>

        {step === 1 ? (
              <>
                <ScrollView style={tw`mt-3 bg-white`} contentInsetAdjustmentBehavior="always" contentContainerStyle={tw`pb-30`}>
              {areas.map((area) => (
                <AreaCard key={area.id} area={area} toggle={toggle} />
              ))}
            </ScrollView>
              </>
            ) : step === 2 ? (
                <StepTwo areaName={selectedFromStep1[0]?.name} />
              ) : step === 3 ? (
                <StepThree />
                ) : step === 4 ? (
                  <StepFour />
                ) : (
                  <StepFive />
        )}

            <View style={tw.style('absolute left-0 right-0 bottom-0 bg-white border-t border-[#EFEFF5] z-10', { padding: isSmall ? 12 : 16 })}>
          <View style={tw`flex-row justify-between`}>
            <Pressable
                  onPress={async () => {
                    try {
                      const draft = {
                        step,
                        areas,
                        combinedSelections,
                        savedAt: Date.now(),
                      };
                      await AsyncStorage.setItem('cleanerFlowDraftV1', JSON.stringify(draft));
                      Alert.alert('Saved', 'Draft saved successfully.');
                    } catch (e) { }
              }}
              style={tw.style('border border-[#CFCFD6] rounded-[14px]', isSmall ? 'py-4 px-3' : 'py-[14px] px-[22px]')}
            >
                  <Text style={tw`text-[#6B5DEB] font-bold`}>Save as Draft</Text>
            </Pressable>

            <Pressable
                  onPress={() => setStep((prev) => Math.min(5, prev + 1))}
              style={tw.style('bg-[#6B5DEB] rounded-[14px] items-center', isSmall ? 'py-4 px-3' : 'py-[14px] px-[22px]')}
            >
                  <View style={tw`flex-row items-center`}>
                    <Text style={tw.style('text-white font-extrabold', { fontSize: scale(12) })}>{nextButtonLabel}</Text>
                    <Ionicons name="arrow-forward-outline" size={18} color="#FFFFFF" style={tw`ml-2`} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      </View>
    </SafeAreaView>
    </>
  );
}


