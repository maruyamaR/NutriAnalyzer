import React, { useState } from 'react';
import { ChevronLeft, Star, Clock, DollarSign, ExternalLink, Info, ShoppingCart, Calendar, AlertCircle } from 'lucide-react';
import { PersonalAttributesType, SupplementRecommendation } from '../types';

interface SupplementRecommendationProps {
  personalAttributes: PersonalAttributesType;
  onBack: () => void;
}

export default function SupplementRecommendationComponent({
  personalAttributes,
  onBack
}: SupplementRecommendationProps) {
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // モックサプリメントデータ（実際にはAI分析結果から生成）
  const mockSupplements: SupplementRecommendation[] = [
    {
      priority: 'high',
      category: 'マグネシウム',
      productName: 'キレート化マグネシウム',
      brand: 'Now Foods',
      dosage: '400mg',
      timing: ['就寝前'],
      duration: '3ヶ月継続',
      price: 2800,
      purchaseUrl: 'https://iherb.co/example1',
      reasoning: '毛髪ミネラル検査でマグネシウム不足が顕著。筋肉の緊張、疲労感、睡眠の質低下に直接関連。キレート化により吸収率が高く、胃腸への刺激も少ない。',
      alternatives: ['マグネシウムグリシネート（Source Naturals）', '酸化マグネシウム（DHC）'],
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop'
    },
    {
      priority: 'high', 
      category: 'ビタミンD3',
      productName: 'ビタミンD3 5000IU',
      brand: 'Healthy Origins',
      dosage: '5000IU',
      timing: ['朝食後'],
      duration: '6ヶ月継続',
      price: 1900,
      purchaseUrl: 'https://iherb.co/example2',
      reasoning: '血液検査で25-OHビタミンDが20ng/mL以下の不足状態。骨代謝、免疫機能に重要。日本人の80%以上が不足しており、特に冬期は積極的な補給が必要。',
      alternatives: ['ビタミンD3 2000IU（ネイチャーメイド）', 'ビタミンD3+K2（Life Extension）'],
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop'
    },
    {
      priority: 'high',
      category: '鉄分',
      productName: 'フェロケル鉄 28mg',
      brand: 'Solgar',
      dosage: '28mg',
      timing: ['朝食前', '空腹時'],
      duration: '4ヶ月継続',
      price: 3200,
      purchaseUrl: 'https://iherb.co/example3',
      reasoning: '血液検査でフェリチンが12ng/mL以下の鉄欠乏状態。ヘモグロビンも基準値下限。キレート化鉄により胃腸障害を最小限に抑えながら効率的な吸収が期待できる。',
      alternatives: ['ヘム鉄（DHC）', '鉄分+ビタミンC（ファンケル）'],
      imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop'
    },
    {
      priority: 'medium',
      category: '亜鉛',
      productName: '亜鉛グリシネート 30mg',
      brand: 'Thorne',
      dosage: '30mg',
      timing: ['夕食後'],
      duration: '3ヶ月継続',
      price: 2400,
      purchaseUrl: 'https://iherb.co/example4',
      reasoning: '毛髪検査で亜鉛レベルが8mg/100g以下と低値。免疫機能、創傷治癒、味覚機能に重要。グリシネート形は吸収率が高く、銅との相互作用も考慮した適量。',
      alternatives: ['亜鉛 15mg（ネイチャーメイド）', '亜鉛+銅（Now Foods）'],
      imageUrl: 'https://images.unsplash.com/photo-1550572017-1cf6ac4cbb00?w=200&h=200&fit=crop'
    },
    {
      priority: 'medium',
      category: 'ビタミンB群',
      productName: 'B-コンプレックス 100',
      brand: 'Nature Made',
      dosage: '1錠',
      timing: ['朝食後'],
      duration: '3ヶ月継続',
      price: 1600,
      purchaseUrl: 'https://iherb.co/example5',
      reasoning: '尿中ビタミンB1、B2が基準値下限。エネルギー代謝、神経機能に必須。B群は相互作用があるため、バランス良く摂取することが重要。',
      alternatives: ['B-50コンプレックス（Now Foods）', 'ビタミンB群（DHC）'],
      imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e51f?w=200&h=200&fit=crop'
    },
    {
      priority: 'low',
      category: 'オメガ3',
      productName: 'DHA・EPA 1200mg',
      brand: 'Nordic Naturals',
      dosage: '2粒',
      timing: ['夕食後'],
      duration: '継続的',
      price: 4200,
      purchaseUrl: 'https://iherb.co/example6',
      reasoning: '血液検査で中性脂肪がやや高値、HDLコレステロールがやや低値。心血管疾患予防、炎症抑制効果が期待できる。高品質な分子蒸留製法で水銀等の不純物除去済み。',
      alternatives: ['フィッシュオイル（ネイチャーメイド）', 'クリルオイル（Now Foods）'],
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop'
    }
  ];

  const filteredSupplements = selectedPriority === 'all' 
    ? mockSupplements 
    : mockSupplements.filter(s => s.priority === selectedPriority);

  const totalMonthlyCost = mockSupplements
    .filter(s => s.priority === 'high' || s.priority === 'medium')
    .reduce((sum, s) => sum + s.price, 0);

  const highPriorityCount = mockSupplements.filter(s => s.priority === 'high').length;
  const mediumPriorityCount = mockSupplements.filter(s => s.priority === 'medium').length;
  const lowPriorityCount = mockSupplements.filter(s => s.priority === 'low').length;

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: string): string => {
    switch (priority) {
      case 'high': return '最重要';
      case 'medium': return '推奨';
      case 'low': return '予防的';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            分析結果に戻る
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              あなた専用サプリメント提案
            </h1>
            <p className="text-lg text-gray-600">
              AI分析に基づいた、科学的根拠のある個別最適化サプリメント
            </p>
          </div>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">{highPriorityCount}</div>
            <div className="text-sm font-medium text-gray-600">最重要サプリ</div>
            <div className="text-xs text-gray-500 mt-1">即座に開始推奨</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">{mediumPriorityCount}</div>
            <div className="text-sm font-medium text-gray-600">推奨サプリ</div>
            <div className="text-xs text-gray-500 mt-1">効果的な改善</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{lowPriorityCount}</div>
            <div className="text-sm font-medium text-gray-600">予防的サプリ</div>
            <div className="text-xs text-gray-500 mt-1">長期的な健康維持</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">¥{totalMonthlyCost.toLocaleString()}</div>
            <div className="text-sm font-medium text-gray-600">推奨月額コスト</div>
            <div className="text-xs text-gray-500 mt-1">最重要+推奨の合計</div>
          </div>
        </div>

        {/* フィルタータブ */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap justify-center space-x-2">
            {[
              { key: 'all', label: 'すべて', count: mockSupplements.length },
              { key: 'high', label: '最重要', count: highPriorityCount },
              { key: 'medium', label: '推奨', count: mediumPriorityCount },
              { key: 'low', label: '予防的', count: lowPriorityCount }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedPriority(tab.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPriority === tab.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* サプリメントカード */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {filteredSupplements.map((supplement, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className="p-6">
                {/* 優先度バッジ */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(supplement.priority)}`}>
                    <Star className="w-4 h-4 mr-1" />
                    {getPriorityText(supplement.priority)}
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{supplement.category}</div>
                  </div>
                </div>

                {/* 商品情報 */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={supplement.imageUrl}
                    alt={supplement.productName}
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {supplement.productName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {supplement.brand}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {supplement.timing.join(', ')}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {supplement.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 用法・用量 */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">推奨用法・用量</span>
                    <span className="text-lg font-bold text-blue-600">{supplement.dosage}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>服用タイミング:</strong> {supplement.timing.join('・')}
                  </div>
                </div>

                {/* AI推奨理由 */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Info className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="font-medium text-gray-900">AI推奨理由</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {supplement.reasoning}
                  </p>
                </div>

                {/* 代替商品 */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">代替商品</div>
                  <div className="flex flex-wrap gap-1">
                    {supplement.alternatives.map((alt, altIndex) => (
                      <span 
                        key={altIndex}
                        className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 価格・購入 */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-green-500 mr-1" />
                    <span className="text-xl font-bold text-green-600">
                      ¥{supplement.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/月</span>
                  </div>
                  <button
                    onClick={() => window.open(supplement.purchaseUrl, '_blank')}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    購入する
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">重要な注意事項</h3>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>• この提案は栄養サポートの目的であり、医療診断・治療行為ではありません</p>
                <p>• 持病がある方や薬を服用中の方は、必ず医師に相談してから開始してください</p>
                <p>• サプリメントに対するアレルギー反応が出た場合は、直ちに使用を中止してください</p>
                <p>• 3ヶ月後の再検査で効果を確認し、プランの見直しを行うことを推奨します</p>
                <p>• 購入リンクは参考価格です。実際の価格は販売サイトでご確認ください</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}