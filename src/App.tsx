import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { TestSelection } from './components/TestSelection';
import { DataInput } from './components/DataInput';
import { PersonalAttributes } from './components/PersonalAttributes';
import { AnalysisResult } from './components/AnalysisResult';
import SupplementRecommendation from './components/SupplementRecommendation';
import { AppState, TestType, PersonalAttributesType, TestData } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<AppState['currentStep']>('landing');
  const [selectedTests, setSelectedTests] = useState<TestType[]>([]);
  const [testData, setTestData] = useState<TestData>({});
  const [personalAttributes, setPersonalAttributes] = useState<PersonalAttributesType | null>(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleGetStarted = () => {
    setCurrentStep('testSelection');
  };

  const handleTestSelection = (tests: TestType[]) => {
    setSelectedTests(tests);
    setCurrentStep('dataInput');
  };

  const handleDataInput = (data: TestData) => {
    setTestData(data);
    setCurrentStep('personalAttributes');
  };

  const handlePersonalAttributes = (attributes: PersonalAttributesType) => {
    setPersonalAttributes(attributes);
    setCurrentStep('analysis');
    
    // AI分析のシミュレーション
    setTimeout(() => {
      const mockAnalysis = {
        overallScore: 72,
        categoryScores: {
          mineralBalance: 68,
          vitaminStatus: 75,
          metabolicFunction: 70,
          detoxification: 76
        },
        keyFindings: [
          'マグネシウム不足による筋肉の緊張と疲労感',
          'ビタミンD不足により骨代謝に影響',
          '亜鉛レベルが低く、免疫機能の低下が懸念',
          '鉄分不足により軽度の貧血傾向'
        ],
        recommendations: [
          '有酸素運動を週3回、30分程度行う',
          '十分な睡眠（7-8時間）を心がける',
          'ストレス管理のためのリラクゼーション',
          '定期的な血液検査でフォローアップ'
        ]
      };
      setAnalysisResult(mockAnalysis);
      setCurrentStep('results');
    }, 3000);
  };

  const handleViewSupplements = () => {
    setCurrentStep('supplements');
  };

  const handleBack = () => {
    const stepOrder: AppState['currentStep'][] = [
      'landing', 'testSelection', 'dataInput', 'personalAttributes', 'analysis', 'results', 'supplements'
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      
      case 'testSelection':
        return (
          <TestSelection
            selectedTests={selectedTests}
            onTestSelection={handleTestSelection}
            onBack={handleBack}
          />
        );
      
      case 'dataInput':
        return (
          <DataInput
            selectedTests={selectedTests}
            testData={testData}
            onDataInput={handleDataInput}
            onBack={handleBack}
          />
        );
      
      case 'personalAttributes':
        return (
          <PersonalAttributes
            onPersonalAttributes={handlePersonalAttributes}
            onBack={handleBack}
          />
        );
      
      case 'analysis':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors font-medium"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                戻る
              </button>
              
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md w-full">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">AI分析中...</h2>
                  <p className="text-lg text-gray-600 mb-6">あなたの検査結果を統合分析しています</p>
                  <div className="text-sm text-gray-500">
                    <p>• 複数検査の相関関係を解析中</p>
                    <p>• 個人属性との統合評価中</p>
                    <p>• 最適なサプリメントを選定中</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'results':
        return (
          <AnalysisResult
            analysisResult={analysisResult}
            onViewSupplements={handleViewSupplements}
            onBack={handleBack}
          />
        );
      
      case 'supplements':
        return (
          <SupplementRecommendation
            personalAttributes={personalAttributes!}
            onBack={handleBack}
          />
        );
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  );
}

export default App;