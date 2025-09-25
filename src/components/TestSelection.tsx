import React, { useState } from 'react';
import { ChevronLeft, FlaskConical, Brain, Heart, Check, Users, Info, Sparkles } from 'lucide-react';
import { TestType } from '../types';

interface TestSelectionProps {
  selectedTests: TestType[];
  onTestSelection: (tests: TestType[]) => void;
  onBack: () => void;
}

export const TestSelection: React.FC<TestSelectionProps> = ({
  selectedTests,
  onTestSelection,
  onBack
}) => {
  const [selected, setSelected] = useState<TestType[]>(selectedTests);

  const testOptions = [
    {
      type: 'hair' as TestType,
      name: '毛髪検査',
      icon: FlaskConical,
      itemCount: 22,
      description: '長期的な栄養蓄積状態を評価',
      details: [
        '必須ミネラル 12項目',
        '有害金属 6項目',
        'バランス比率 4項目',
        '3-4ヶ月の栄養状態を反映'
      ],
      estimatedCost: '15,000円〜',
      color: 'blue'
    },
    {
      type: 'urine' as TestType,
      name: '尿検査',
      icon: Brain,
      itemCount: 17,
      description: '代謝機能と栄養利用効率を解析',
      details: [
        '水溶性ビタミン 9項目',
        '有機酸 5項目',
        'アミノ酸 3項目',
        '現在の代謝状態を反映'
      ],
      estimatedCost: '12,000円〜',
      color: 'purple'
    },
    {
      type: 'blood' as TestType,
      name: '血液検査',
      icon: Heart,
      itemCount: 24,
      description: '現在の生理的状態を精密分析',
      details: [
        '貧血関連 7項目',
        'ビタミン 5項目',
        '栄養マーカー 6項目',
        '脂質・炎症マーカー 6項目'
      ],
      estimatedCost: '8,000円〜',
      color: 'red'
    }
  ];

  const toggleTest = (testType: TestType) => {
    const newSelected = selected.includes(testType)
      ? selected.filter(t => t !== testType)
      : [...selected, testType];
    setSelected(newSelected);
  };

  const handleNext = () => {
    if (selected.length > 0) {
      onTestSelection(selected);
    }
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: {
        icon: 'bg-blue-500',
        border: isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300',
        badge: 'bg-blue-100 text-blue-800'
      },
      purple: {
        icon: 'bg-purple-500',
        border: isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300',
        badge: 'bg-purple-100 text-purple-800'
      },
      red: {
        icon: 'bg-red-500',
        border: isSelected ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300',
        badge: 'bg-red-100 text-red-800'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            戻る
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              ステップ 1/4
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              分析したい検査を選択してください
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              より精密な分析のため、2つ以上の検査を組み合わせることを推奨します
            </p>
          </div>
        </div>

        {/* Test Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testOptions.map((option) => {
            const isSelected = selected.includes(option.type);
            const Icon = option.icon;
            const colorClasses = getColorClasses(option.color, isSelected);
            
            return (
              <div
                key={option.type}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isSelected ? 'transform scale-105 shadow-2xl' : 'hover:transform hover:scale-102 hover:shadow-xl'
                }`}
                onClick={() => toggleTest(option.type)}
              >
                <div className={`border-2 rounded-3xl h-full transition-all duration-300 bg-gradient-to-br from-white to-gray-50 shadow-lg ${colorClasses.border}`}>
                  {/* Selection Check */}
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-2 shadow-xl z-10">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  {/* Header with Icon */}
                  <div className="p-8 pb-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-3xl ${colorClasses.icon} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${colorClasses.badge}`}>
                        {option.itemCount}項目
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="px-8 pb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {option.name}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-6">
                      <ul className="space-y-2">
                        {option.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-3 ${
                              option.color === 'blue' ? 'bg-blue-400' :
                              option.color === 'purple' ? 'bg-purple-400' : 'bg-red-400'
                            }`}></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <div className="text-lg font-bold text-gray-900">
                        推定費用: {option.estimatedCost}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Summary */}
        {selected.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-8 mb-12">
            <h3 className="text-xl font-bold text-emerald-900 mb-6">選択された検査</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {selected.map((testType) => {
                const option = testOptions.find(opt => opt.type === testType);
                return (
                  <div key={testType} className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm">
                    <div className="font-bold text-gray-900">{option?.name}</div>
                    <div className="text-emerald-600 font-medium">{option?.itemCount}項目</div>
                  </div>
                );
              })}
            </div>
            <div className="text-emerald-800 font-semibold">
              分析項目総数: {selected.reduce((sum, testType) => {
                const option = testOptions.find(opt => opt.type === testType);
                return sum + (option?.itemCount || 0);
              }, 0)}項目
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="text-center">
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              selected.length > 0
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selected.length === 0 ? '検査を選択してください' : `${selected.length}つの検査で次へ進む`}
          </button>
          
          {selected.length === 1 && (
            <div className="mt-6 flex items-center justify-center text-amber-700 bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-lg mx-auto">
              <Info className="w-4 h-4 mr-2" />
              <span className="font-medium">より精密な分析のため、追加の検査選択を推奨します</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};