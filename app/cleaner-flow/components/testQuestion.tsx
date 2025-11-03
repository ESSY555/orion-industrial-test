import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, BackHandler } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useKeepAwake } from 'expo-keep-awake';
import useLMS from '@/db/useLMS';
import { mockCourses } from '@/db/mock-db';

export default function TestQuestion() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TestQuestion'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'TestQuestion'>>();
  const username = route.params?.username;
  const routeCourseId = (route.params as any)?.courseId as string | undefined;
  const { course, getCourseById, submitAssessment } = useLMS();
  useKeepAwake();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedByIndex, setSelectedByIndex] = useState<Record<number, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  // Load course via LMS (fallback to mock if absent)
  useEffect(() => {
    const fallbackId = mockCourses[0]?._id;
    const targetId = (routeCourseId as string) || fallbackId;
    if (targetId) getCourseById(targetId);
  }, [routeCourseId]);

  const selectedCourse = (course as any) || mockCourses[0];
  const QUESTIONS = selectedCourse?.questionsAndOptions || [];
  const RIGHT_ANSWERS = selectedCourse?.answers || [];
  const courseId = selectedCourse?._id as string;
  const maxAttempts = selectedCourse?.courseAssignment?.maxAttempts as number | undefined; // undefined => unlimited
  const ATTEMPTS_KEY = `sanitrack:attempts:${courseId}`;
  const [attempts, setAttempts] = useState<number>(0);
  const [blocked, setBlocked] = useState<boolean>(false);

  const totalDurationSec = ((selectedCourse?.assessmentDuration as number) || 0) * 60;
  const [remainingSec, setRemainingSec] = useState<number>(totalDurationSec);

  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false, gestureEnabled: false });
  }, [navigation]);

  useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', (e: any) => {
      if (submitted || blocked) return; 
      e.preventDefault();
      Alert.alert('Finish test', 'You must submit the test before leaving this screen.');
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (submitted || blocked) return false; // allow
      Alert.alert('Finish test', 'You must submit the test before leaving this screen.');
      return true; // block
    });
    return () => {
      beforeRemove();
      backHandler.remove();
    };
  }, [navigation, submitted, blocked]);


  React.useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(ATTEMPTS_KEY);
        const num = raw ? parseInt(raw, 10) || 0 : 0;
        setAttempts(num);
        if (typeof maxAttempts === 'number' && maxAttempts > 0 && num >= maxAttempts) {
          setBlocked(true);
          setRemainingSec(0);
          Alert.alert('Attempts exhausted', 'You have reached the maximum attempts for this assessment.');
        }
      } catch { }
    })();
  }, [ATTEMPTS_KEY, maxAttempts]);

  const total = QUESTIONS.length;
  const q = (total > 0 && currentIndex >= 0 && currentIndex < total) ? QUESTIONS[currentIndex] : null;
  const selected = selectedByIndex[currentIndex] ?? null;
  const setSelected = (opt: string) => setSelectedByIndex((prev) => ({ ...prev, [currentIndex]: opt }));
  const progressPct = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const isLast = currentIndex === total - 1;

    const CERTS_KEY = 'sanitrack:certificates';
    const addCertificate = async (title: string) => {
        try {
            const now = new Date();
            const date = `Completed: ${now.toLocaleString(undefined, { month: 'short' })} ${now.getDate()}, ${now.getFullYear()}`;
            const raw = (await AsyncStorage.getItem(CERTS_KEY)) || '[]';
            const parsed: { title: string; date: string }[] = JSON.parse(raw);
            const exists = parsed.some((c) => c.title === title);
            const next = exists ? parsed : [{ title, date }, ...parsed].slice(0, 10);
            await AsyncStorage.setItem(CERTS_KEY, JSON.stringify(next));
        } catch { }
    };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const total = QUESTIONS.length;
    const chosen = Array.from({ length: total }, (_, idx) => selectedByIndex[idx] ?? null);

    const hasClientAnswers = Array.isArray(RIGHT_ANSWERS) && RIGHT_ANSWERS.length > 0;
    if (!hasClientAnswers) {
      (async () => {
        try {
          const payload = {
            answers: chosen.map((ans) => (ans ? [ans] : [])),
            courseId,
            isForLevelAssessment: false,
          };
          await submitAssessment(payload);
          await addCertificate(selectedCourse.title);
          navigation.navigate('Certification', { username: username ? String(username) : undefined });
        } catch (e) {
          try {
            const next = attempts + 1;
            setAttempts(next);
            await AsyncStorage.setItem(ATTEMPTS_KEY, String(next));
            if (typeof maxAttempts === 'number' && maxAttempts > 0 && next >= maxAttempts) {
              setBlocked(true);
              setRemainingSec(0);
              Alert.alert('Attempts exhausted', 'You have reached the maximum attempts for this assessment.');
            }
          } catch { }
        }
      })();
      return;
    }

    const correct = chosen.reduce((acc, ans, idx) => (
      RIGHT_ANSWERS[idx]?.includes(ans ?? '') ? acc + 1 : acc
    ), 0);
    const pct = (correct / total) * 100;
    Alert.alert('Result', `Score: ${Math.round(pct)}%`, [
      {
        text: 'OK',
        onPress: () => {
          setSelectedByIndex({});
          setCurrentIndex(0);
          const passMark = (selectedCourse?.minimumPassScore as number) ?? 70;
          if (pct >= passMark) {
            (async () => {
              await addCertificate(selectedCourse?.title as string);
              navigation.navigate('Certification', { username: username ? String(username) : undefined });
            })();
          } else {
            (async () => {
              try {
                const next = attempts + 1;
                setAttempts(next);
                await AsyncStorage.setItem(ATTEMPTS_KEY, String(next));
                if (typeof maxAttempts === 'number' && maxAttempts > 0 && next >= maxAttempts) {
                  setBlocked(true);
                  setRemainingSec(0);
                  Alert.alert('Attempts exhausted', 'You have reached the maximum attempts for this assessment.');
                }
              } catch { }
            })();
          }
        },
      },
    ]);
  };


  React.useEffect(() => {
    if (submitted) return;
    if (blocked) return;
    if (remainingSec <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => {
      setRemainingSec((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [remainingSec, submitted, blocked]);

  React.useEffect(() => {
    if (blocked) {
      setRemainingSec(0);
    }
  }, [blocked]);

  return (
    <View style={[tw`flex-1 bg-[#F7F7F7]`]}>
      <View style={[tw`px-4 pt-14 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-9 h-9 rounded-full bg-white items-center justify-center`}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[18px]`]}>Question {total > 0 ? currentIndex + 1 : 0} of {total}</Text>
        <View style={tw`w-9 h-9 rounded-full bg-white items-center justify-center flex-row`}>
          <Ionicons name="time-outline" size={16} color="#111827" />
          <Text style={[tw`ml-1 text-black`, { fontSize: 12 }]}>{formatTime(remainingSec)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={[tw`px-4 pt-12`]}>
          <View style={tw`h-2 bg-[#E5E7EB] rounded-lg overflow-hidden`}>
            <View style={[tw`h-2 bg-[#7C5CFF] rounded-lg` as any, { width: `${progressPct}%` }]} />
          </View>

          {total === 0 ? (
            <Text style={[tw`text-black mt-4 text-center`, { fontSize: 15, lineHeight: 22 }]}>No questions available.</Text>
          ) : (
            <Text style={[tw`text-black mt-4`, { fontSize: 15, lineHeight: 22 }]}>{q?.question}</Text>
          )}

          <View style={[tw`mt-4`]}>
            {(q?.options ?? []).map((opt: string) => {
              const isSelected = selected === opt;
              return (
                <TouchableOpacity key={opt} onPress={() => setSelected(opt)} style={tw.style('rounded-2xl py-4 px-4 mt-3 flex-row items-center justify-between', isSelected ? 'bg-[#E8DDFE] border-2 border-[#7C5CFF]' : 'bg-white border border-[#E5E7EB]')}>
                  <Text style={[tw`text-black`, { fontSize: 14 }]}>{opt}</Text>
                  <View style={tw.style('w-7 h-7 rounded-full items-center justify-center', isSelected ? 'bg-[#7C5CFF]' : 'bg-[#F1F0F5]')}>
                    {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[tw`mt-6 flex-row items-center justify-between`]}>
            <TouchableOpacity
              style={tw`bg-[#EEEEEE] border border-[#E5E7EB] rounded-2xl px-3.5 py-2.5 flex-row items-center`}
              onPress={() => setCurrentIndex((i) => (i > 0 ? i - 1 : 0))}
              disabled={currentIndex === 0 || total === 0}
            >
              <Ionicons name="chevron-back" size={16} color="#2D1B3D" />
              <Text style={[tw`ml-2`, { color: '#2D1B3D', fontWeight: '600', fontSize: 12 }]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style('bg-[#7C5CFF] rounded-2xl px-4 py-3 flex-row items-center', (!selected || total === 0) && 'opacity-50')}
              disabled={!selected || total === 0}
              onPress={() => {
                if (!isLast) {
                  setCurrentIndex((i) => (total > 0 && i < total - 1 ? i + 1 : i));
                  return;
                }
                handleSubmit();
              }}
            >
              <Text style={[tw`mr-2`, { color: '#FFFFFF', fontWeight: '700', fontSize: 12 }]}>{isLast ? 'Submit' : 'Next Question'}</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

     
      <Modal transparent animationType="fade" visible={blocked} onRequestClose={() => { }}>
        <View style={[tw`flex-1 items-center justify-center`, { backgroundColor: 'rgba(0,0,0,0.25)' }]}>
          <View style={tw`bg-white rounded-2xl px-5 py-6 w-11/12`}>
            <Text style={[tw`text-black font-bold text-[18px]`, { textAlign: 'center', marginBottom: 12 }]}>No more attempts</Text>
            <Text style={[tw`text-gray-700`, { textAlign: 'center' }]}>You have reached the maximum attempts for this assessment.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mt-5 bg-[#7C5CFF] rounded-2xl px-5 py-3`}>
              <Text style={tw`text-white font-bold text-center`}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

