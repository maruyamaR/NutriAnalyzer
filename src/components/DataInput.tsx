import React, { useState } from 'react';
import { ChevronLeft, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { TestType, TestData, HairMineralTest, UrineVitaminTest, BloodTest } from '../types';

interface DataInputProps {
  selectedTests: TestType[];
  testData: TestData;
  onDataInput: (data: TestData) => void;
  onBack: () => void;
}

export const DataInput: React.FC<DataInputProps> = ({
  selectedTests,
  testData,
  onDataInput,
  onBack
}) => {
  const [currentTab, setCurrentTab] = useState<TestType>(selectedTests[0]);
  const [formData, setFormData] = useState<TestData>(testData);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // 重要な必須項目の定義
  const requiredFields = {
    hair: {
      essentialMinerals: ['calcium', 'magnesium', 'zinc', 'iron'],
      toxicMetals: ['mercury', 'lead'],
      ratios: ['caToMg']
    },
    urine: {
      waterSolubleVitamins: ['vitaminB1', 'vitaminB2', 'vitaminB12', 'vitaminC']
    },
    blood: {
      anemia: ['hemoglobin', 'ferritin'],
      vitamins: ['vitaminB12', 'vitamin25D']
    }
  };

  const hairMineralFields = {
    essentialMinerals: {
      title: '必須ミネラル',
      fields: [
        { key: 'calcium', label: 'カルシウム', unit: 'mg/100g', range: '200-1500' },
        { key: 'magnesium', label: 'マグネシウム', unit: 'mg/100g', range: '15-100' },
        { key: 'sodium', label: 'ナトリウム', unit: 'mg/100g', range: '10-100' },
        { key: 'potassium', label: 'カリウム', unit: 'mg/100g', range: '5-50' },
        { key: 'copper', label: '銅', unit: 'mg/100g', range: '1-5' },
        { key: 'zinc', label: '亜鉛', unit: 'mg/100g', range: '8-25' },
        { key: 'phosphorus', label: 'リン', unit: 'mg/100g', range: '12-20' },
        { key: 'iron', label: '鉄', unit: 'mg/100g', range: '1-3' },
        { key: 'manganese', label: 'マンガン', unit: 'mg/100g', range: '0.1-1.0' },
        { key: 'chromium', label: 'クロム', unit: 'mg/100g', range: '0.1-2.0' },
        { key: 'selenium', label: 'セレン', unit: 'mg/100g', range: '0.8-2.0' },
        { key: 'cobalt', label: 'コバルト', unit: 'mg/100g', range: '0.001-0.05' }
      ]
    },
    toxicMetals: {
      title: '有害金属',
      fields: [
        { key: 'aluminum', label: 'アルミニウム', unit: 'mg/100g', range: '< 10' },
        { key: 'cadmium', label: 'カドミウム', unit: 'mg/100g', range: '< 0.1' },
        { key: 'mercury', label: '水銀', unit: 'mg/100g', range: '< 1.0' },
        { key: 'lead', label: '鉛', unit: 'mg/100g', range: '< 2.0' },
        { key: 'arsenic', label: 'ヒ素', unit: 'mg/100g', range: '< 0.1' },
        { key: 'beryllium', label: 'ベリリウム', unit: 'mg/100g', range: '< 0.01' }
      ]
    },
    ratios: {
      title: 'バランス比率',
      fields: [
        { key: 'caToMg', label: 'Ca/Mg比', unit: '', range: '4-10' },
        { key: 'naToK', label: 'Na/K比', unit: '', range: '0.5-3.0' },
        { key: 'znToCu', label: 'Zn/Cu比', unit: '', range: '4-20' },
        { key: 'caToP', label: 'Ca/P比', unit: '', range: '1-3' }
      ]
    }
  };

  const urineVitaminFields = {
    waterSolubleVitamins: {
      title: '水溶性ビタミン',
      fields: [
        { key: 'vitaminB1', label: 'ビタミンB1', unit: 'μg/g Cre', range: '50-200' },
        { key: 'vitaminB2', label: 'ビタミンB2', unit: 'μg/g Cre', range: '30-150' },
        { key: 'vitaminB6', label: 'ビタミンB6', unit: 'μg/g Cre', range: '20-80' },
        { key: 'vitaminB12', label: 'ビタミンB12', unit: 'ng/g Cre', range: '100-500' },
        { key: 'niacin', label: 'ナイアシン', unit: 'mg/g Cre', range: '2-10' },
        { key: 'pantothenicAcid', label: 'パントテン酸', unit: 'mg/g Cre', range: '1-5' },
        { key: 'biotin', label: 'ビオチン', unit: 'μg/g Cre', range: '10-50' },
        { key: 'folicAcid', label: '葉酸', unit: 'μg/g Cre', range: '50-200' },
        { key: 'vitaminC', label: 'ビタミンC', unit: 'mg/g Cre', range: '10-50' }
      ]
    }
  };

  const bloodFields = {
    anemia: {
      title: '貧血関連',
      fields: [
        { key: 'hemoglobin', label: 'ヘモグロビン', unit: 'g/dL', range: '12.0-16.0' },
        { key: 'hematocrit', label: 'ヘマトクリット', unit: '%', range: '36-48' },
        { key: 'mcv', label: 'MCV', unit: 'fL', range: '80-100' },
        { key: 'mch', label: 'MCH', unit: 'pg', range: '27-33' },
        { key: 'mchc', label: 'MCHC', unit: '%', range: '32-36' },
        { key: 'ferritin', label: 'フェリチン', unit: 'ng/mL', range: '12-200' },
        { key: 'tibc', label: 'TIBC', unit: 'μg/dL', range: '250-400' }
      ]
    },
    vitamins: {
      title: 'ビタミン',
      fields: [
        { key: 'vitaminB12', label: 'ビタミンB12', unit: 'pg/mL', range: '200-900' },
        { key: 'folicAcid', label: '葉酸', unit: 'ng/mL', range: '3-15' },
        { key: 'vitamin25D', label: '25-OHビタミンD', unit: 'ng/mL', range: '20-50' },
        { key: 'vitaminE', label: 'ビタミンE', unit: 'mg/dL', range: '0.8-1.2' },
        { key: 'vitaminA', label: 'ビタミンA', unit: 'IU/dL', range: '1000-3000' }
      ]
    }
  };

  const handleInputChange = (testType: TestType, section: string, field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    
    setFormData(prev => ({
      ...prev,
      [testType]: {
        ...prev[testType],
        [section]: {
          ...(prev[testType] as any)?.[section],
          [field]: numValue
        }
      }
    }));

    // Validation
    if (value && (numValue < 0 || numValue > 10000)) {
      setValidationErrors(prev => ({
        ...prev,
        [`${testType}.${section}.${field}`]: '値が範囲外です'
      }));
    } else {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${testType}.${section}.${field}`];
        return newErrors;
      });
    }
  };

  const validateRequiredFields = (): boolean => {
    let isValid = true;
    const newErrors: {[key: string]: string} = {};

    selectedTests.forEach(testType => {
      const testRequiredFields = requiredFields[testType as keyof typeof requiredFields];
      
      if (testRequiredFields) {
        Object.entries(testRequiredFields).forEach(([sectionKey, fieldKeys]) => {
          fieldKeys.forEach((fieldKey: string) => {
            const value = (formData[testType] as any)?.[sectionKey]?.[fieldKey];
            if (!value || value === 0) {
              newErrors[`${testType}.${sectionKey}.${fieldKey}`] = '必須項目です';
              isValid = false;
            }
          });
        });
      }
    });

    // 少なくとも1つの検査で何かしらのデータが入力されているかチェック
    const hasAnyData = selectedTests.some(testType => {
      const testData = formData[testType];
      if (!testData) return false;
      
      return Object.values(testData).some(section => {
        return Object.values(section as any).some(value => value && value !== 0);
      });
    });

    if (!hasAnyData) {
      newErrors['general'] = '少なくとも1つの検査項目に数値を入力してください';
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateRequiredFields()) {
      onDataInput(formData);
    }
  };

  const renderInputSection = (testType: TestType, sectionKey: string, section: any) => (
    <div key={sectionKey} className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {section.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.fields.map((field: any) => {
          const fieldKey = `${testType}.${sectionKey}.${field.key}`;
          const value = (formData[testType] as any)?.[sectionKey]?.[field.key] || '';
          const hasError = validationErrors[fieldKey];
          const isRequired = requiredFields[testType as keyof typeof requiredFields]?.[sectionKey as keyof any]?.includes(field.key);
          
          return (
            <div key={field.key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
                {field.unit && <span className="text-gray-500 ml-1">({field.unit})</span>}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={value}
                  onChange={(e) => handleInputChange(testType, sectionKey, field.key, e.target.value)}
                  className={`block w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    hasError ? 'border-red-300' : isRequired ? 'border-orange-300' : 'border-gray-300'
                  }`}
                  placeholder="値を入力"
                />
                {hasError ? (
                  <AlertCircle className="absolute right-3 top-2.5 w-5 h-5 text-red-500" />
                ) : value > 0 ? (
                  <CheckCircle className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />
                ) : null}
              </div>
              <div className="text-xs text-gray-500">
                基準値: {field.range}
                {isRequired && <span className="text-orange-600 ml-2">（必須項目）</span>}
              </div>
              {hasError && (
                <div className="text-xs text-red-600">{hasError}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const getActiveTabClasses = (testType: TestType): string => {
    const colors = {
      hair: 'bg-blue-500 text-white border-blue-500',
      urine: 'bg-purple-500 text-white border-purple-500',
      blood: 'bg-red-500 text-white border-red-500'
    };
    return colors[testType];
  };

  const getInactiveTabClasses = (testType: TestType): string => {
    const colors = {
      hair: 'bg-transparent text-blue-700 border-transparent hover:bg-blue-100 hover:text-blue-800',
      urine: 'bg-transparent text-purple-700 border-transparent hover:bg-purple-100 hover:text-purple-800',
      blood: 'bg-transparent text-red-700 border-transparent hover:bg-red-100 hover:text-red-800'
    };
    return colors[testType];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              ステップ 2/4
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              検査結果を入力してください
            </h1>
            <p className="text-lg text-gray-600">
              お手持ちの検査結果報告書から数値を入力してください
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Header */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex space-x-1 px-6 pt-4">
              {selectedTests.map((testType) => {
                const testNames = {
                  hair: '毛髪検査',
                  urine: '尿検査',
                  blood: '血液検査'
                };
                
                return (
                  <button
                    key={testType}
                    onClick={() => setCurrentTab(testType)}
                    className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-200 border-b-2 ${
                      currentTab === testType
                        ? getActiveTabClasses(testType)
                        : getInactiveTabClasses(testType)
                    }`}
                  >
                    {testNames[testType]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Utility Bar */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center text-sm text-blue-800">
                <Info className="w-4 h-4 mr-2" />
                <span>
                  <span className="text-red-500">*</span>印は必須項目（必須入力）、その他は任意入力です
                </span>
              </div>
            </div>

            {/* Input Forms */}
            <div>
              {currentTab === 'hair' && (
                <div>
                  {Object.entries(hairMineralFields).map(([sectionKey, section]) => 
                    renderInputSection('hair', sectionKey, section)
                  )}
                </div>
              )}
              
              {currentTab === 'urine' && (
                <div>
                  {Object.entries(urineVitaminFields).map(([sectionKey, section]) => 
                    renderInputSection('urine', sectionKey, section)
                  )}
                </div>
              )}
              
              {currentTab === 'blood' && (
                <div>
                  {Object.entries(bloodFields).map(([sectionKey, section]) => 
                    renderInputSection('blood', sectionKey, section)
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="text-center mt-8">
          {validationErrors['general'] && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-md mx-auto">
              {validationErrors['general']}
            </div>
          )}
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            次へ進む（個人情報入力）
          </button>
          
          <p className="mt-2 text-sm text-gray-500">
            <span className="text-red-500">*</span>印の必須項目のみ必須入力です。その他は検査した項目のみ入力してください。
          </p>
        </div>
      </div>
    </div>
  );
};