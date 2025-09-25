import React, { useState } from 'react';
import { ChevronLeft, User, Activity, Heart, Utensils, Shield } from 'lucide-react';
import { PersonalAttributesType } from '../types';

interface PersonalAttributesProps {
  onPersonalAttributes: (attributes: PersonalAttributesType) => void;
  onBack: () => void;
}

export const PersonalAttributes: React.FC<PersonalAttributesProps> = ({
  onPersonalAttributes,
  onBack
}) => {
  const [formData, setFormData] = useState<PersonalAttributesType>({
    age: 30,
    gender: 'female',
    weight: 60,
    height: 165,
    lifestyle: {
      activityLevel: 'moderate',
      stressLevel: 3,
      sleepHours: 7,
      smokingStatus: 'never',
      alcoholIntake: 'light'
    },
    healthConditions: {
      chronicDiseases: [],
      medications: [],
      allergies: [],
      pregnancyStatus: false,
      breastfeedingStatus: false
    },
    dietaryPreferences: {
      dietType: 'omnivore',
      restrictions: [],
      supplementsCurrently: []
    }
  });

  const handleBasicInfoChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLifestyleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [field]: value
      }
    }));
  };

  const handleHealthConditionChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      healthConditions: {
        ...prev.healthConditions,
        [field]: value
      }
    }));
  };

  const handleDietaryChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        [field]: value
      }
    }));
  };

  const handleArrayFieldChange = (category: string, field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = (prev as any)[category][field] as string[];
      const newArray = checked 
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value);
      
      return {
        ...prev,
        [category]: {
          ...(prev as any)[category],
          [field]: newArray
        }
      };
    });
  };

  const handleAnalyze = () => {
    onPersonalAttributes(formData);
  };

  const activityLevels = [
    { value: 'sedentary', label: '座位中心', description: 'デスクワーク中心、運動習慣なし' },
    { value: 'light', label: '軽度活動', description: '週1-2回の軽い運動' },
    { value: 'moderate', label: '中程度活動', description: '週3-4回の適度な運動' },
    { value: 'vigorous', label: '高強度活動', description: '週5回以上の激しい運動' }
  ];

  const commonDiseases = [
    '高血圧', '糖尿病', '脂質異常症', '甲状腺疾患', '貧血',
    '骨粗鬆症', '関節炎', 'アレルギー疾患', '消化器疾患', '心疾患'
  ];

  const commonMedications = [
    '血圧降下薬', '血糖降下薬', 'スタチン系薬剤', '甲状腺ホルモン薬',
    '鉄剤', 'ビタミンD', 'カルシウム製剤', '抗アレルギー薬', '胃薬'
  ];

  const commonSupplements = [
    'マルチビタミン', 'ビタミンD', 'ビタミンC', 'ビタミンB群',
    '鉄分', 'カルシウム', 'マグネシウム', '亜鉛', 'オメガ3',
    'プロバイオティクス', 'コエンザイムQ10', 'プロテイン'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            戻る
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
              ステップ 3/4
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              個人情報を入力してください
            </h1>
            <p className="text-lg text-gray-600">
              より精密な分析のため、あなたの基本情報とライフスタイルを教えてください
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <User className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">基本情報</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">年齢</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleBasicInfoChange('age', parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">性別</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => handleBasicInfoChange('gender', e.target.value)}
                      className="mr-2"
                    />
                    女性
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => handleBasicInfoChange('gender', e.target.value)}
                      className="mr-2"
                    />
                    男性
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">体重 (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleBasicInfoChange('weight', parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="20"
                  max="200"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">身長 (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleBasicInfoChange('height', parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="100"
                  max="250"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Activity className="w-5 h-5 text-green-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">ライフスタイル</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">活動レベル</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activityLevels.map((level) => (
                    <label key={level.value} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                      <input
                        type="radio"
                        value={level.value}
                        checked={formData.lifestyle.activityLevel === level.value}
                        onChange={(e) => handleLifestyleChange('activityLevel', e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ストレスレベル (1-5)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.lifestyle.stressLevel}
                    onChange={(e) => handleLifestyleChange('stressLevel', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>低い</span>
                    <span className="font-medium">現在: {formData.lifestyle.stressLevel}</span>
                    <span>高い</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    平均睡眠時間 (時間)
                  </label>
                  <input
                    type="number"
                    value={formData.lifestyle.sleepHours}
                    onChange={(e) => handleLifestyleChange('sleepHours', parseFloat(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="3"
                    max="12"
                    step="0.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Health Conditions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">健康状態</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">慢性疾患</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonDiseases.map((disease) => (
                    <label key={disease} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.healthConditions.chronicDiseases.includes(disease)}
                        onChange={(e) => handleArrayFieldChange('healthConditions', 'chronicDiseases', disease, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">{disease}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">服用中の薬</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonMedications.map((medication) => (
                    <label key={medication} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.healthConditions.medications.includes(medication)}
                        onChange={(e) => handleArrayFieldChange('healthConditions', 'medications', medication, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">{medication}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.gender === 'female' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.pregnancyStatus}
                      onChange={(e) => handleHealthConditionChange('pregnancyStatus', e.target.checked)}
                      className="rounded"
                    />
                    <span>妊娠中</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.breastfeedingStatus}
                      onChange={(e) => handleHealthConditionChange('breastfeedingStatus', e.target.checked)}
                      className="rounded"
                    />
                    <span>授乳中</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Diet & Supplements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Utensils className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">食事・サプリメント</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">食事タイプ</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'omnivore', label: '通常食' },
                    { value: 'vegetarian', label: 'ベジタリアン' },
                    { value: 'vegan', label: 'ビーガン' },
                    { value: 'pescatarian', label: 'ペスカタリアン' }
                  ].map((diet) => (
                    <label key={diet.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer">
                      <input
                        type="radio"
                        value={diet.value}
                        checked={formData.dietaryPreferences.dietType === diet.value}
                        onChange={(e) => handleDietaryChange('dietType', e.target.value)}
                      />
                      <span>{diet.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">現在服用中のサプリメント</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonSupplements.map((supplement) => (
                    <label key={supplement} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.dietaryPreferences.supplementsCurrently.includes(supplement)}
                        onChange={(e) => handleArrayFieldChange('dietaryPreferences', 'supplementsCurrently', supplement, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">{supplement}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Start Button */}
        <div className="text-center mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-blue-900 mb-6">
            <h3 className="text-xl font-bold mb-2">AI統合分析の準備完了</h3>
            <p className="text-blue-700">
              あなたの検査結果と個人情報を基に、最新のAI技術で包括的な栄養分析を行います
            </p>
          </div>
          
          <button
            onClick={handleAnalyze}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <Shield className="w-5 h-5 mr-2" />
            AI分析を開始する
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            分析には1-3分程度かかります。入力データは暗号化保護され、30日後に自動削除されます。
          </p>
        </div>
      </div>
    </div>
  );
};