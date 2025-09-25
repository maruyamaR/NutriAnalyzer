// アプリケーション全体の型定義

export interface AppState {
  currentStep: 'landing' | 'testSelection' | 'dataInput' | 'personalAttributes' | 'analysis' | 'results' | 'supplements';
}

export type TestType = 'hair' | 'urine' | 'blood';

// 毛髪ミネラル検査
export interface HairMineralTest {
  essentialMinerals: {
    calcium: number;
    magnesium: number;
    sodium: number;
    potassium: number;
    copper: number;
    zinc: number;
    phosphorus: number;
    iron: number;
    manganese: number;
    chromium: number;
    selenium: number;
    cobalt: number;
  };
  toxicMetals: {
    aluminum: number;
    cadmium: number;
    mercury: number;
    lead: number;
    arsenic: number;
    beryllium: number;
  };
  ratios: {
    caToMg: number;
    naToK: number;
    znToCu: number;
    caToP: number;
  };
}

// 尿ビタミン検査
export interface UrineVitaminTest {
  waterSolubleVitamins: {
    vitaminB1: number;
    vitaminB2: number;
    vitaminB6: number;
    vitaminB12: number;
    niacin: number;
    pantothenicAcid: number;
    biotin: number;
    folicAcid: number;
    vitaminC: number;
  };
  organicAcids: {
    lacticAcid: number;
    pyruvicAcid: number;
    citricAcid: number;
    ketoAcids: number;
    oxalicAcid: number;
  };
  aminoAcids: {
    taurine: number;
    glycine: number;
    alanine: number;
  };
}

// 血液検査
export interface BloodTest {
  anemia: {
    hemoglobin: number;
    hematocrit: number;
    mcv: number;
    mch: number;
    mchc: number;
    ferritin: number;
    tibc: number;
  };
  vitamins: {
    vitaminB12: number;
    folicAcid: number;
    vitamin25D: number;
    vitaminE: number;
    vitaminA: number;
  };
  nutritionMarkers: {
    totalProtein: number;
    albumin: number;
    prealbumin: number;
    zinc: number;
    copper: number;
    selenium: number;
  };
  lipids: {
    totalCholesterol: number;
    ldlCholesterol: number;
    hdlCholesterol: number;
    triglycerides: number;
  };
  inflammation: {
    crp: number;
    esr: number;
  };
}

export interface TestData {
  hair?: HairMineralTest;
  urine?: UrineVitaminTest;
  blood?: BloodTest;
}

// 個人属性
export interface PersonalAttributesType {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  lifestyle: {
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'vigorous';
    stressLevel: 1 | 2 | 3 | 4 | 5;
    sleepHours: number;
    smokingStatus: 'never' | 'former' | 'current';
    alcoholIntake: 'none' | 'light' | 'moderate' | 'heavy';
  };
  healthConditions: {
    chronicDiseases: string[];
    medications: string[];
    allergies: string[];
    pregnancyStatus: boolean;
    breastfeedingStatus: boolean;
  };
  dietaryPreferences: {
    dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
    restrictions: string[];
    supplementsCurrently: string[];
  };
}

// サプリメント推奨
export interface SupplementRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  productName: string;
  brand: string;
  dosage: string;
  timing: string[];
  duration: string;
  price: number;
  purchaseUrl: string;
  reasoning: string;
  alternatives: string[];
  imageUrl?: string;
}

// 分析結果
export interface AnalysisResult {
  overallScore: number;
  categoryScores: {
    mineralBalance: number;
    vitaminStatus: number;
    metabolicFunction: number;
    detoxification: number;
  };
  keyFindings: string[];
  recommendations: string[];
  riskFactors?: string[];
}