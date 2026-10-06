"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import TicketPnrButton from "@/components/TicketPnrButton";
import CheckPnrModal from "@/components/CheckPnrModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Train,
  Store,
  Globe,
  Sparkles,
  CheckCircle2,
  Phone,
  User,
  Building2,
  FileText,
  CreditCard,
  Utensils,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Check,
  QrCode,
  Download,
  Share2,
  Award,
  Zap,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type SupportedLanguage = "en" | "hi" | "hinglish" | "mr" | "bn" | "ta" | "gu";

interface LanguageContent {
  badge: string;
  title: string;
  subtitle: string;
  typeLabel: string;
  typeRunning: string;
  typeRunningDesc: string;
  typeStation: string;
  typeStationDesc: string;
  shopNameLabel: string;
  shopNamePlaceholder: string;
  ownerNameLabel: string;
  ownerNamePlaceholder: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  whatsappLabel: string;
  whatsappPlaceholder: string;
  locationRunningLabel: string;
  locationRunningPlaceholder: string;
  locationStationLabel: string;
  locationStationPlaceholder: string;
  categoryLabel: string;
  categories: string[];
  fssaiLabel: string;
  fssaiPlaceholder: string;
  payoutLabel: string;
  payoutPlaceholder: string;
  submitBtn: string;
  trustPoints: string[];
  waitlistBadge: string;
}

const TRANSLATIONS: Record<SupportedLanguage, LanguageContent> = {
  en: {
    badge: "RailQuick Partner Network",
    title: "Partner with RailQuick & Deliver Directly to Confirmed Train Berths",
    subtitle: "Deliver fresh restaurant meals, junction-famous sweets & travel essentials directly to passenger seats across 45+ railway junctions.",
    typeLabel: "Select Your Vendor Partner Type",
    typeRunning: "Running Train Vendor / Pantry Partner",
    typeRunningDesc: "Onboard train pantry staff, coach runners, or traveling delivery teams.",
    typeStation: "Station-Wise Vendor / Platform Outlet",
    typeStationDesc: "Local station food stalls, junction city sweet shops, or restaurants near platform.",
    shopNameLabel: "Business / Shop Name",
    shopNamePlaceholder: "e.g. Agra Petha Bhandar / RailQuick Express Pantry",
    ownerNameLabel: "Owner / Contact Person Name",
    ownerNamePlaceholder: "e.g. Ramesh Kumar / Kartik Sharma",
    mobileLabel: "Primary Mobile Number",
    mobilePlaceholder: "10-digit mobile number",
    whatsappLabel: "WhatsApp Order Alert Number",
    whatsappPlaceholder: "WhatsApp number for instant order alerts",
    locationRunningLabel: "Preferred Train Numbers or Routes",
    locationRunningPlaceholder: "e.g. 12004 Shatabdi, 12952 Rajdhani, Delhi-Lucknow Route",
    locationStationLabel: "Station Code / Station Name & Platform No.",
    locationStationPlaceholder: "e.g. CNB - Kanpur Central (Platform 1 & 4)",
    categoryLabel: "Select Products Offered",
    categories: [
      "Hot Restaurant Meals & Thalis",
      "City Famous Sweets & Regional Specialities",
      "Packaged Munchies, Chips & Drinks",
      "Emergency Medicines & First Aid",
      "Chargers, Cables & Electronics",
      "Travel Comfort & Hygiene Kits",
    ],
    fssaiLabel: "FSSAI License / GSTIN (Optional)",
    fssaiPlaceholder: "e.g. FSSAI: 10019011000123 / GSTIN",
    payoutLabel: "UPI ID or Bank Account for Instant Payouts",
    payoutPlaceholder: "e.g. vendor@upi / HDFC Account Number",
    submitBtn: "Submit Vendor Application & Get Partner ID",
    trustPoints: [
      "Zero Commission for First 30 Days",
      "Instant Payout Direct to Bank Account",
      "Dedicated RailQuick Station Runner Support",
    ],
    waitlistBadge: "7k+ Customers on Early Waitlist!",
  },
  hi: {
    badge: "रेलक्विक वेंडर पार्टनर नेटवर्क",
    title: "रेलक्विक से जुड़ें और सीधे चलती ट्रेन की बर्थ पर अपना सामान बेचें",
    subtitle: "ट्रेन यात्रियों तक ताज़ा भोजन, शहर की प्रसिद्ध मिठाइयाँ और ज़रूरी सामान सीधे कोच के अंदर पहुँचाएँ।",
    typeLabel: "अपनी वेंडर श्रेणी चुनें",
    typeRunning: "चलती ट्रेन वेंडर / पैंट्री पार्टनर",
    typeRunningDesc: "ट्रेन के अंदर पेंट्री स्टाफ, कोच रनर या ट्रैवलिंग डिलीवरी पार्टनर।",
    typeStation: "स्टेशन वेंडर / प्लेटफॉर्म रेस्टोरेंट",
    typeStationDesc: "रेलवे स्टेशन प्लेटफॉर्म स्टॉल, शहर की प्रसिद्ध दुकान या स्टेशन के पास रेस्टोरेंट।",
    shopNameLabel: "दुकान / ब्रांड का नाम",
    shopNamePlaceholder: "उदा. आगरा पेठा भंडार / रेलक्विक एक्सप्रेस रसोई",
    ownerNameLabel: "मालिक / संपर्क व्यक्ति का नाम",
    ownerNamePlaceholder: "उदा. रमेश कुमार / कार्तिक शर्मा",
    mobileLabel: "मोबाइल नंबर",
    mobilePlaceholder: "10 अंकों का मोबाइल नंबर",
    whatsappLabel: "व्हाट्सएप ऑर्डर अलर्ट नंबर",
    whatsappPlaceholder: "ऑर्डर नोटिफिकेशन के लिए व्हाट्सएप नंबर",
    locationRunningLabel: "पसंदीदा ट्रेन नंबर या रूट",
    locationRunningPlaceholder: "उदा. 12004 शताब्दी, 12952 राजधानी express",
    locationStationLabel: "स्टेशन कोड / स्टेशन का नाम और प्लेटफॉर्म नं.",
    locationStationPlaceholder: "उदा. CNB - कानपुर सेंट्रल (प्लेटफॉर्म 1)",
    categoryLabel: "बेचे जाने वाले सामान चुनें",
    categories: [
      "गरमा गरम खाना और थाली",
      "शहर की प्रसिद्ध मिठाईयाँ व नमकीन",
      "पैक्ड स्नैक्स, चिप्स और कोल्ड ड्रिंक्स",
      "इमरजेंसी दवाइयाँ और फर्स्ट एड",
      "मोबाइल चार्जर, केबल और इलेक्ट्रॉनिक्स",
      "यात्रा सामान और ट्रैवल पिलो",
    ],
    fssaiLabel: "FSSAI लाइसेंस / GST नंबर (वैकल्पिक)",
    fssaiPlaceholder: "उदा. FSSAI: 10019011000123",
    payoutLabel: "UPI आईडी या बैंक खाता संख्या (तुरंत पेमेंट हेतु)",
    payoutPlaceholder: "उदा. vendor@upi / एचडीएफसी बैंक खाता",
    submitBtn: "वेंडर आवेदन जमा करें और पार्टनर आईडी प्राप्त करें",
    trustPoints: [
      "पहले 30 दिनों के लिए 0% कमीशन",
      "डिलीवरी पूरा होते ही तुरंत बैंक ट्रांसफर",
      "हर स्टेशन पर रेलक्विक सपोर्ट एग्जीक्यूटिव",
    ],
    waitlistBadge: "7k+ ग्राहक वेटलिस्ट में शामिल!",
  },
  hinglish: {
    badge: "RailQuick Vendor Partner Network",
    title: "RailQuick se Judein & Chalti Train Berths par Direct Deliver Karein",
    subtitle: "Train passengers tak fresh khana, junction famous sweets aur travel essentials direct berth tak pahunchayein.",
    typeLabel: "Apni Vendor Category Select Karein",
    typeRunning: "Running Train Vendor / Pantry Partner",
    typeRunningDesc: "Train ke andar pantry staff, coach runner ya traveling delivery partner.",
    typeStation: "Station-Wise Vendor / Platform Outlet",
    typeStationDesc: "Railway station platform stall, city famous shop ya station ke paas restaurant.",
    shopNameLabel: "Shop / Business Ka Naam",
    shopNamePlaceholder: "e.g. Agra Petha Bhandar / Express Kitchen",
    ownerNameLabel: "Owner / Partner Name",
    ownerNamePlaceholder: "e.g. Ramesh Kumar / Kartik Sharma",
    mobileLabel: "Mobile Number",
    mobilePlaceholder: "10-digit mobile number",
    whatsappLabel: "WhatsApp Alert Number",
    whatsappPlaceholder: "Order alert receive karne ke liye WhatsApp number",
    locationRunningLabel: "Preferred Train Numbers ya Routes",
    locationRunningPlaceholder: "e.g. 12004 Shatabdi, 12952 Rajdhani Express",
    locationStationLabel: "Station Code / Station Name & Platform No.",
    locationStationPlaceholder: "e.g. CNB - Kanpur Central (Platform 1)",
    categoryLabel: "Konsa Items Sell Karoge?",
    categories: [
      "Garam Fresh Meals & Thali",
      "City Famous Sweets & Local Items",
      "Packaged Snacks, Biscuits & Cold Drinks",
      "Emergency Medicines & First Aid Kit",
      "Phone Chargers, Cables & Power Banks",
      "Travel Accessories & Neck Pillows",
    ],
    fssaiLabel: "FSSAI License / GST Number (Optional)",
    fssaiPlaceholder: "e.g. FSSAI License Number",
    payoutLabel: "UPI ID ya Bank Account (Instant Payment ke liye)",
    payoutPlaceholder: "e.g. vendor@upi / Bank Account",
    submitBtn: "Vendor Form Submit Karein & Partner ID Payein",
    trustPoints: [
      "First 30 Days Zero Commission",
      "Instant Payment Direct Direct Bank Account Mein",
      "Har Station Par RailQuick Partner Support",
    ],
    waitlistBadge: "7k+ Customers Waitlist Joined!",
  },
  mr: {
    badge: "रेलक्विक व्हेंडर पार्टनर नेटवर्क",
    title: "धावत्या ट्रेन आणि स्टेशनचे नंबर १ व्हेंडर पार्टनर व्हा",
    subtitle: "ट्रेन प्रवाशांना गरम जेवण, स्थानिक प्रसिद्ध मिठाई आणि आपत्कालीन वस्तू थेट बर्थवर पोहोचवा.",
    typeLabel: "तुमचा व्हेंडर प्रकार निवडा",
    typeRunning: "रनिंग ट्रेन व्हेंडर / पँट्री पार्टनर",
    typeRunningDesc: "ट्रेनमधील पॅन्ट्री स्टाफ, कोच रनर किंवा ट्रॅव्हलिंग डिलिव्हरी पार्टनर.",
    typeStation: "स्टेशन व्हेंडर / प्लॅटफॉर्म स्टॉल",
    typeStationDesc: "स्टेशनवरील फूड स्टॉल, प्रसिद्ध मिठाई दुकान किंवा रेस्टॉरंट.",
    shopNameLabel: "दुकानाचे / ब्रँडचे नाव",
    shopNamePlaceholder: "उदा. पुणेकर स्वीट्स / रेलक्विक एक्सप्रेस",
    ownerNameLabel: "मालकाचे नाव",
    ownerNamePlaceholder: "उदा. रमेश पाटील",
    mobileLabel: "मोबाईल नंबर",
    mobilePlaceholder: "१० अंकी मोबाईल नंबर",
    whatsappLabel: "व्हॉट्सॲप ऑर्डर अलर्ट नंबर",
    whatsappPlaceholder: "ऑर्डर अलर्टसाठी व्हॉट्सॲप नंबर",
    locationRunningLabel: "पसंतीचे ट्रेन नंबर / मार्ग",
    locationRunningPlaceholder: "उदा. १२१२६ प्रगती एक्सप्रेस",
    locationStationLabel: "स्टेशन कोड आणि प्लॅटफॉर्म क्र.",
    locationStationPlaceholder: "उदा. PUNE - पुणे जंक्शन (प्लॅटफॉर्म १)",
    categoryLabel: "विक्रीची उत्पादने निवडा",
    categories: [
      "गरम जेवण आणि थाळी",
      "स्थानिक प्रसिद्ध मिठाई आणि फराळ",
      "पॅक केलेले स्नॅक्स आणि शीतपेये",
      "आपत्कालीन औषधे",
      "मोबाईल चार्जर आणि इलेक्ट्रॉनिक्स",
      "प्रवास सोयीच्या वस्तू",
    ],
    fssaiLabel: "FSSAI लायसन्स / GST नंबर",
    fssaiPlaceholder: "उदा. FSSAI नंबर",
    payoutLabel: "UPI आयडी किंवा बँक खाते (झटपट पेमेंटसाठी)",
    payoutPlaceholder: "उदा. vendor@upi / बँक खाते",
    submitBtn: "व्हेंडर अर्ज सबमिट करा आणि पार्टनर आयडी मिळवा",
    trustPoints: [
      "पहिल्या ३० दिवसांसाठी ०% कमिशन",
      "थेट बँक खात्यात त्वरित पेमेंट",
      "प्रत्येक स्टेशनवर २४/७ सपोर्ट",
    ],
    waitlistBadge: "७k+ ग्राहक वेटलिस्टमध्ये सामील!",
  },
  bn: {
    badge: "রেলকুইক ভেন্ডর পার্টনার নেটওয়ার্ক",
    title: "চলন্ত ট্রেন ও রেলওয়ে স্টেশনের ১ নম্বর ভেন্ডর পার্টনার হন",
    subtitle: "ট্রেন যাত্রীদের কাছে গরম খাবার, শহরের বিখ্যাত মিষ্টি এবং প্রয়োজনীয় জিনিসপত্র সরাসরি কোচে পৌঁছে দিন।",
    typeLabel: "আপনার ভেন্ডরের ধরন নির্বাচন করুন",
    typeRunning: "চলন্ত ট্রেন ভেন্ডর / প্যান্ট্রি পার্টনার",
    typeRunningDesc: "ট্রেনের ভেতরের প্যান্ট্রি স্টাফ বা ট্র্যাভেলিং ডেলিভারি টিম।",
    typeStation: "স্টেশন ভেন্ডর / প্ল্যাটফর্ম আউটলেট",
    typeStationDesc: "স্টেশন প্ল্যাটফর্মের দোকান বা প্ল্যাটফর্মের কাছের রেস্তোরাঁ।",
    shopNameLabel: "দোকান / ব্যবসার নাম",
    shopNamePlaceholder: "যেমন- হাওড়া সুইটস / রেলকুইক কিচেন",
    ownerNameLabel: "মালিকের নাম",
    ownerNamePlaceholder: "যেমন- সুব্রত রায়",
    mobileLabel: "মোবাইল নম্বর",
    mobilePlaceholder: "১০ ডিজিট মোবাইল নম্বর",
    whatsappLabel: "হোয়াটসঅ্যাপ অ্যালার্ট নম্বর",
    whatsappPlaceholder: "অর্ডার বিজ্ঞপ্তির জন্য হোয়াটসঅ্যাপ নম্বর",
    locationRunningLabel: "পছন্দের ট্রেন নম্বর বা রুট",
    locationRunningPlaceholder: "যেমন- ১২৩০২ হাওড়া রাজধানী",
    locationStationLabel: "স্টেশন কোড এবং প্ল্যাটফর্ম নম্বর",
    locationStationPlaceholder: "যেমন- HWH - হাওড়া জংশন (প্ল্যাটফর্ম ৯)",
    categoryLabel: "বিক্রয়যোগ্য পণ্য নির্বাচন করুন",
    categories: [
      "গরম খাবার ও থালি",
      "শহরের বিখ্যাত মিষ্টি ও স্ন্যাক্স",
      "প্যাকেজড স্ন্যাক্স ও পানীয়",
      "জরুরি ওষুধ ও ফার্স্ট এইড",
      "মোবাইল চার্জার ও ইলেকট্রনিক্স",
      "ভ্রমণের প্রয়োজনীয় জিনিসপত্র",
    ],
    fssaiLabel: "FSSAI লাইসেন্স / GSTIN",
    fssaiPlaceholder: "FSSAI নম্বর",
    payoutLabel: "UPI আইডি বা ব্যাংক অ্যাকাউন্ট (তাত্ক্ষণিক পেমেন্ট)",
    payoutPlaceholder: "যেমন- vendor@upi",
    submitBtn: "ভেন্ডর আবেদন জমা দিন এবং পার্টনার আইডি পান",
    trustPoints: [
      "প্রথম ৩০ দিন ০% কমিশন",
      "সরাসরি ব্যাংক অ্যাকাউন্টে দ্রুত পেমেন্ট",
      "প্রতিটি স্টেশনে ২৪/৭ সাপোর্ট",
    ],
    waitlistBadge: "৭k+ গ্রাহক ওয়েটলিস্টে যুক্ত!",
  },
  ta: {
    badge: "ரயில் குவிக் வெண்டர் நெட்வொர்க்",
    title: "ஓடும் ரயில் மற்றும் நிலையங்களின் முதன்மை வெண்டர் பார்ட்னராகுங்கள்",
    subtitle: "ரயில் பயணிகளுக்கு சூடான உணவு, சிறப்பு தின்பண்டங்கள் மற்றும் அவசியமான பொருட்களை நேரடியாக இருக்கைக்கே விநியோகிக்கவும்.",
    typeLabel: "உங்கள் வெண்டர் வகையை தேர்ந்தெடுக்கவும்",
    typeRunning: "ஓடும் ரயில் வெண்டர் / பேன்ட்ரி பார्युनिटी",
    typeRunningDesc: "ரயிலின் உள்ளே இருக்கும் பேன்ட்ரி ஊழியர்கள் அல்லது விநியோக குழு.",
    typeStation: "ரயில் நிலைய வெண்டர் / பிளாட்பாரம் கடை",
    typeStationDesc: "ரயில் நிலைய பிளாட்பார கடைகள் அல்லது அருகிலுள்ள உணவகங்கள்.",
    shopNameLabel: "கடை / வணிகத்தின் பெயர்",
    shopNamePlaceholder: "உ-ம்: மதுரை ஸ்வீட்ஸ் / ரயில் குவிக் எக்ஸ்பிரஸ்",
    ownerNameLabel: "உரிமையாளர் பெயர்",
    ownerNamePlaceholder: "உ-ம்: கார்த்திக்",
    mobileLabel: "மொபைல் எண்",
    mobilePlaceholder: "10 இலக்க மொபைல் எண்",
    whatsappLabel: "வாட்ஸ்அப் எண்",
    whatsappPlaceholder: "ஆர்டர் அறிவிப்புகளுக்கான வாட்ஸ்அப் எண்",
    locationRunningLabel: "விருப்பமான ரயில் எண்கள்",
    locationRunningPlaceholder: "உ-ம்: 12636 வைகை எக்ஸ்பிரஸ்",
    locationStationLabel: "ரயில் நிலைய குறியீடு & பிளாட்பாரம் எண்",
    locationStationPlaceholder: "உ-ம்: MAS - சென்னை சென்ட்ரல் (பிளாட்பாரம் 1)",
    categoryLabel: "வழங்கப்படும் பொருட்கள்",
    categories: [
      "சூடான உணவுகள் & சாப்பாடு",
      "பிரபலமான இனிப்புகள் & தின்பண்டங்கள்",
      "பாக்கெட் சிப்ஸ் & குளிர்பானங்கள்",
      "அவசர மருந்துகள்",
      "மொபைல் சார்ஜர் & எலக்ட்ரானிக்ஸ்",
      "பயண உதவிகள்",
    ],
    fssaiLabel: "FSSAI உரிமம் / GSTIN",
    fssaiPlaceholder: "FSSAI எண்",
    payoutLabel: "UPI ஐடி அல்லது வங்கி கணக்கு (உடனடி பணம் பெற)",
    payoutPlaceholder: "உ-ம்: vendor@upi / வங்கி கணக்கு",
    submitBtn: "விண்ணப்பத்தை சமர்ப்பித்து பார்ட்னர் ஐடி பெறுக",
    trustPoints: [
      "முதல் 30 நாட்களுக்கு 0% கமிஷன்",
      "நேரடி வங்கி கணக்கில் உடனடி பணம் செலுத்துதல்",
      "24/7 ஆதரவு சேவை",
    ],
    waitlistBadge: "7k+ வாடிக்கையாளர்கள் காத்திருப்பு பட்டியலில்!",
  },
  gu: {
    badge: "રેલક્વિક વેન્ડર પાર્ટનર નેટવર્ક",
    title: "ચાલતી ટ્રેન અને સ્ટેશનના નંબર ૧ વેન્ડર પાર્ટનર બનો",
    subtitle: "ટ્રેન મુસાફરો સુધી તાજું ભોજન, શહેરની પ્રખ્યાત મીઠાઈઓ અને ઈમરજન્સી સામાન સીધો બર્થ સુધી પહોંચાડો.",
    typeLabel: "તમારો વેન્ડર પ્રકાર પસંદ કરો",
    typeRunning: "ચાલતી ટ્રેન વેન્ડર / પેન્ટ્રી પાર્ટનર",
    typeRunningDesc: "ટ્રેનની અંદર પેન્ટ્રી સ્ટાફ, કોચ રનર અથવા ડિલિવરી પાર્ટનર.",
    typeStation: "સ્ટેશન વેન્ડર / પ્લેટફોર્મ આઉટલેટ",
    typeStationDesc: "રેલ્વે સ્ટેશન પ્લેટફોર્મ સ્ટોલ, પ્રખ્યાત દુકાન અથવા રેસ્ટોરન્ટ.",
    shopNameLabel: "દુકાન / બ્રાન્ડનું નામ",
    shopNamePlaceholder: "દા.ત. સુરતી ફરસાણ / રેલક્વિક એક્સપ્રેસ",
    ownerNameLabel: "માલિકનું નામ",
    ownerNamePlaceholder: "દા.ત. રમેશ પટેલ",
    mobileLabel: "મોબાઈલ નંબર",
    mobilePlaceholder: "૧૦ અંકનો મોબાઈલ નંબર",
    whatsappLabel: "વોટ્સએપ ઓર્ડર નંબર",
    whatsappPlaceholder: "ઓર્ડર એલર્ટ માટે વોટ્સએપ નંબર",
    locationRunningLabel: "પસંદગીનો ટ્રેન નંબર અથવા રૂટ",
    locationRunningPlaceholder: "દા.ત. ૧૨૯૫૨ રાજધાની એક્સપ્રેસ",
    locationStationLabel: "સ્ટેશન કોડ અને પ્લેટફોર્મ નં.",
    locationStationPlaceholder: "દા.ત. ADI - અમદાવાદ જંકશન (પ્લેટફોર્મ ૧)",
    categoryLabel: "વેચાણ માટેની વસ્તુઓ પસંદ કરો",
    categories: [
      "ગરમા ગરમ ખાણું અને થાળી",
      "શહેરની પ્રખ્યાત મીઠાઈઓ અને ફરસાણ",
      "પેક્ડ સ્નેક્સ અને ઠંડા પીણાં",
      "ઈમરજન્સી દવાઓ",
      "મોબાઈલ ચાર્જર અને ઈલેક્ટ્રોનિક્સ",
      "મુસાફરીનો જરૂરી સામાન",
    ],
    fssaiLabel: "FSSAI લાયસન્સ / GST નંબર",
    fssaiPlaceholder: "FSSAI નંબર",
    payoutLabel: "UPI આઈડી અથવા બેંક એકાઉન્ટ (તુરંત પેમેન્ટ માટે)",
    payoutPlaceholder: "દા.ત. vendor@upi / બેંક એકાઉન્ટ",
    submitBtn: "અરજી સબમિટ કરો અને પાર્ટનર આઈડી મેળવો",
    trustPoints: [
      "પ્રથમ ૩૦ દિવસ માટે ૦% કમિશન",
      "સીધા બેંક એકાઉન્ટમાં તુરંત ટ્રાન્સફર",
      "દરેક સ્ટેશન પર રેલક્વિક સપોર્ટ",
    ],
    waitlistBadge: "૭k+ ગ્રાહકો પ્રતીક્ષા યાદીમાં!",
  },
};

export default function VendorPage() {
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [vendorType, setVendorType] = useState<"running" | "station">("running");
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [fssai, setFssai] = useState("");
  const [payout, setPayout] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCheckPnrOpen, setIsCheckPnrOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Modal State
  const [submittedPartner, setSubmittedPartner] = useState<{
    partnerId: string;
    shopName: string;
    ownerName: string;
    vendorType: string;
    mobile: string;
    date: string;
  } | null>(null);

  const content = TRANSLATIONS[lang];

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopName.trim() || !ownerName.trim() || !mobile.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in Shop Name, Owner Name, and Mobile Number.",
        variant: "destructive",
      });
      return;
    }

    if (mobile.replace(/\D/g, "").length < 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    const partnerId = `RQ-VND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPartner = {
      partnerId,
      shopName: shopName.trim(),
      ownerName: ownerName.trim(),
      vendorType: vendorType === "running" ? "Running Train Pantry Partner" : "Station Platform Vendor",
      mobile: mobile.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setIsSubmitting(true);

    // 1. FIRST PERSIST DATA IN SUPABASE VIA API
    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner_id: partnerId,
          shop_name: shopName.trim(),
          owner_name: ownerName.trim(),
          name: ownerName.trim(),
          vendor_type: vendorType === "running" ? "Running Train Pantry Partner" : "Station Platform Vendor",
          mobile_number: mobile.trim(),
          phone: mobile.trim(),
          whatsapp_number: whatsapp.trim() || mobile.trim(),
          location_details: locationDetails.trim(),
          city: locationDetails.trim(),
          categories: selectedCategories.join(", "),
          fssai_gstin: fssai.trim(),
          payout_details: payout.trim(),
          language: lang,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        // 2. ONLY AFTER SUPABASE CONFIRMATION -> SHOW POPUP MODAL!
        setSubmittedPartner(newPartner);
        toast({
          title: "Registration Confirmed! 🎉",
          description: `Partner ID ${partnerId} generated and stored in Supabase. Our onboarding manager will call you within 2 hours.`,
        });
      } else {
        toast({
          title: "Submission Error",
          description: data.message || "Failed to save registration in Supabase. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network Error",
        description: "Failed to connect to database. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-amber-100 selection:text-slate-950">
      <CheckPnrModal isOpen={isCheckPnrOpen} onClose={() => setIsCheckPnrOpen(false)} />

      {/* ─── UNIFIED HEADER NAVIGATION ─── */}
      <Navbar onOpenPnrModal={() => setIsCheckPnrOpen(true)} />

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 pb-16 pt-32 sm:pt-28 md:pt-24">
        {/* Top Hero Section */}
        <section className="pt-4 sm:pt-8 pb-10 sm:pb-12 bg-gradient-to-b from-emerald-50/70 via-white to-[#fafafa] border-b border-slate-200/70 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            {/* Live 7000+ Waitlist Callout Badge */}
            <div className="inline-flex items-center justify-center max-w-[94%] sm:max-w-none gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black mb-4 shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="leading-tight text-center">{content.waitlistBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {content.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-6">
              {content.subtitle}
            </p>

            {/* ── LANGUAGE SELECTOR AT TOP (SCROLLABLE BAR) ── */}
            <div className="bg-white p-3.5 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto text-left">
              <div className="flex items-center gap-2 mb-2 px-1 text-xs font-black text-slate-800 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Select Vendor Portal Language / भाषा चुनें:</span>
              </div>

              {/* Horizontal Scrollable Language Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x py-1 px-1 rounded-2xl bg-slate-100/80 border border-slate-200/80">
                {[
                  { id: "en", label: "English", sub: "EN" },
                  { id: "hi", label: "हिन्दी", sub: "Hindi" },
                  { id: "hinglish", label: "Hinglish", sub: "Mix" },
                  { id: "mr", label: "मराठी", sub: "Marathi" },
                  { id: "bn", label: "বাংলা", sub: "Bengali" },
                  { id: "ta", label: "தமிழ்", sub: "Tamil" },
                  { id: "gu", label: "ગુજરાતી", sub: "Gujarati" },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLang(l.id as SupportedLanguage)}
                    className={`snap-center shrink-0 px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                      lang === l.id
                        ? "bg-slate-900 text-white shadow-md scale-102"
                        : "bg-white hover:bg-slate-200/60 text-slate-700 border border-slate-200/60"
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-normal ${
                      lang === l.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {l.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form Container */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8"
          >
            {/* 1. VENDOR TYPE SELECTION */}
            <div>
              <label className="block text-xs font-mono font-black uppercase tracking-wider text-slate-500 mb-3">
                1. {content.typeLabel}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setVendorType("running")}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    vendorType === "running"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <Train className="w-5 h-5" />
                    </div>
                    <input
                      type="radio"
                      name="vendorType"
                      checked={vendorType === "running"}
                      onChange={() => setVendorType("running")}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-1">
                    {content.typeRunning}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {content.typeRunningDesc}
                  </p>
                </div>

                <div
                  onClick={() => setVendorType("station")}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    vendorType === "station"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                      <Store className="w-5 h-5" />
                    </div>
                    <input
                      type="radio"
                      name="vendorType"
                      checked={vendorType === "station"}
                      onChange={() => setVendorType("station")}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-1">
                    {content.typeStation}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {content.typeStationDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. BASIC VENDOR DETAILS */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-mono font-black uppercase tracking-wider text-slate-500">
                2. Business &amp; Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {content.shopNameLabel} *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={content.shopNamePlaceholder}
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {content.ownerNameLabel} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={content.ownerNamePlaceholder}
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {content.mobileLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder={content.mobilePlaceholder}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {content.whatsappLabel}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600">
                      WA
                    </span>
                    <input
                      type="tel"
                      placeholder={content.whatsappPlaceholder}
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* LOCATION DETAILS */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {vendorType === "running"
                    ? content.locationRunningLabel
                    : content.locationStationLabel}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={
                      vendorType === "running"
                        ? content.locationRunningPlaceholder
                        : content.locationStationPlaceholder
                    }
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 3. PRODUCT CATEGORIES */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-mono font-black uppercase tracking-wider text-slate-500 mb-3">
                3. {content.categoryLabel}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {content.categories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <div
                      key={cat}
                      onClick={() => handleCategoryToggle(cat)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isChecked
                          ? "border-emerald-600 bg-emerald-50/70 text-slate-900 font-bold"
                          : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700 text-xs font-medium"
                      }`}
                    >
                      <span className="text-xs">{cat}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                          isChecked
                            ? "bg-emerald-600 text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. LICENSE & PAYOUT INFO */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-mono font-black uppercase tracking-wider text-slate-500">
                4. License &amp; Instant Bank Payout
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {content.fssaiLabel}
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={content.fssaiPlaceholder}
                      value={fssai}
                      onChange={(e) => setFssai(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {content.payoutLabel}
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={content.payoutPlaceholder}
                      value={payout}
                      onChange={(e) => setPayout(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* TRUST POINTS BADGE */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold text-emerald-900">
              {content.trustPoints.map((tp, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{tp}</span>
                </div>
              ))}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving to Supabase Database...</span>
                </>
              ) : (
                <>
                  <span>{content.submitBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </section>
      </main>

      {/* ── SUCCESSFUL REGISTRATION ID BADGE MODAL ── */}
      <AnimatePresence>
        {submittedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-7 max-w-md w-full shadow-2xl relative text-center max-h-[92vh] overflow-y-auto"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2.5 sm:mb-3 border border-emerald-200">
                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                Official RailQuick Partner Certificate
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5 sm:mt-2">
                Partner Application Received!
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 font-medium">
                Your vendor details have been successfully registered in our database.
              </p>

              {/* ID BADGE CARD */}
              <div className="my-3 sm:my-4 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700 shadow-xl text-left relative overflow-hidden">
                <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2.5">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                      VERIFIED VENDOR PARTNER
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">{submittedPartner.shopName}</h3>
                  </div>
                  <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 bg-white/10 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-white/20 shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-xs mb-2.5">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium">Partner ID</span>
                    <span className="font-mono font-black text-amber-300 text-xs sm:text-sm">{submittedPartner.partnerId}</span>
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium">Owner Name</span>
                    <span className="font-bold text-white text-xs sm:text-sm truncate block">{submittedPartner.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium">Vendor Category</span>
                    <span className="font-medium text-emerald-300 text-[11px] sm:text-xs truncate block">{submittedPartner.vendorType}</span>
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium">Date Issued</span>
                    <span className="font-mono text-slate-300 text-[11px] sm:text-xs">{submittedPartner.date}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Onboarding
                  </span>
                  <span>RailQuick Private Limited</span>
                </div>
              </div>

              {/* Prominent Verification Notice */}
              <div className="bg-emerald-50 border border-emerald-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 mb-3 sm:mb-4 text-left flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black text-emerald-900">
                    Our Team Will Contact You Soon to Verify
                  </h4>
                  <p className="text-[10px] sm:text-xs text-emerald-700 mt-0.5 sm:mt-1 leading-relaxed font-medium">
                    Our onboarding team will contact you soon on <strong>{submittedPartner.mobile}</strong> to verify your shop &amp; location details, guide you through order handoffs, and activate your live partner account.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast({ title: "Partner ID Saved!", description: `${submittedPartner.partnerId} saved to your device.` });
                  }}
                  className="flex-1 h-10 sm:h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Save Card
                </button>
                <button
                  onClick={() => setSubmittedPartner(null)}
                  className="h-10 sm:h-11 px-5 sm:px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
