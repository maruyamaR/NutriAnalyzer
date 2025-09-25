import React from 'react';
import { ChevronLeft, TrendingUp, AlertTriangle, CheckCircle, Target, ArrowRight, Info, Sparkles, Award } from 'lucide-react';
import { AnalysisResult as AnalysisResultType } from '../types';

interface AnalysisResultProps {
  analysisResult: AnalysisResultType;
  onViewSupplements: () => void;
  onBack: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  analysisResult,
  onViewSupplements,
  onBack
}) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreDescription = (score: number): string => {
    if (score >= 80) return '良好';
    if (score >= 60) return '注意が必要';
    return '改善が必要';
  };

  const categoryIcons = {
    mineralBalance: Target,
    vitaminStatus: CheckCircle,
    metabolicFunction: TrendingUp,
    detoxification: AlertTriangle
  };

  const categoryNames = {
    mineralBalance: 'ミネラルバランス',
    vitaminStatus: 'ビタミン状態',
    metabolicFunction: '代謝機能',
    detoxification: 'デトックス能力'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
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
              <Award className="w-4 h-4 mr-2" />
              ステップ 4/4 - 分析完了
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI統合分析結果
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              あなたの栄養状態を包括的に分析した結果をご覧ください
            </p>
          </div>
        </div>

        {/* Overall Score */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-12 mb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-6 h-6 text-emerald-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">総合栄養スコア</h2>
              <Sparkles className="w-6 h-6 text-emerald-500 ml-3" />
            </div>
            <div className="relative inline-block mb-8">
              <div className="w-48 h-48 relative">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 144 144">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 60}`}
                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - analysisResult.overallScore / 100)}`}
                    className="transition-all duration-2000"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(analysisResult.overallScore)} mb-2`}>
                      {analysisResult.overallScore}
                    </div>
                    <div className="text-lg text-gray-500 font-medium">/ 100</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(analysisResult.overallScore)} mb-6`}>
              {getScoreDescription(analysisResult.overallScore)}
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {analysisResult.overallScore >= 80 
                ? '栄養状態は良好です。現在の食生活を維持し、微細な調整で更なる向上を目指しましょう。'
                : analysisResult.overallScore >= 60
                ? '栄養バランスに改善の余地があります。重点的なサプリメント摂取で効果的な改善が期待できます。'
                : '複数の栄養素に不足が見られます。包括的なサプリメント摂取と生活習慣の見直しを強く推奨します。'
              }
            </p>
          </div>
        </div>

        {/* Category Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {Object.entries(analysisResult.categoryScores).map(([category, score]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            const categoryName = categoryNames[category as keyof typeof categoryNames];
            
            return (
              <div key={category} className="group bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-2xl ${getScoreBgColor(score)} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{categoryName}</h3>
                  </div>
                  <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                  <div 
                    className={`h-4 rounded-full ${getScoreBgColor(score)} transition-all duration-1000`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className={`text-lg font-semibold ${getScoreColor(score)}`}>
                  {getScoreDescription(score)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Findings */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            主要な発見事項
          </h3>
          <div className="space-y-6">
            {analysisResult.keyFindings.map((finding, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl hover:shadow-md transition-shadow duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-800 font-medium text-lg leading-relaxed">{finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            ライフスタイル改善推奨
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisResult.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl hover:shadow-md transition-shadow duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-800 font-medium text-lg leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis Info */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-3xl p-12 text-white mb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8">AI統合分析について</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300">
                <div className="text-xl font-bold mb-3">✓ 科学的根拠</div>
                <div className="text-white/90 leading-relaxed">最新の栄養学研究と臨床データに基づく分析</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300">
                <div className="text-xl font-bold mb-3">✓ 個人最適化</div>
                <div className="text-white/90 leading-relaxed">年齢・性別・体重・ライフスタイルを総合考慮</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-colors duration-300">
                <div className="text-xl font-bold mb-3">✓ 統合解析</div>
                <div className="text-white/90 leading-relaxed">複数検査間の相関・矛盾を検出し統合評価</div>
              </div>
            </div>
            <p className="mt-8 text-white/80 text-lg">
              ※ この分析は栄養サポートの提案であり、医療診断・治療行為ではありません。
            </p>
          </div>
        </div>

        {/* CTA to Supplements */}
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-emerald-500 mr-3" />
              <h3 className="text-3xl font-bold text-gray-900">
                あなた専用のサプリメント提案
              </h3>
              <Sparkles className="w-8 h-8 text-emerald-500 ml-3" />
            </div>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              この分析結果に基づいて、具体的な商品名・用量・タイミングまで詳しく提案いたします。
              科学的根拠に基づいた最適なサプリメントで、効率的な栄養改善を実現しましょう。
            </p>
            <div className="relative inline-block">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="サプリメント"
                className="w-32 h-32 rounded-3xl object-cover mx-auto mb-8 shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <button
              onClick={onViewSupplements}
              className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
            >
              サプリメント提案を見る
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-6 text-gray-500">
              ✓ 具体的商品名 ✓ 最適用量 ✓ 服用タイミング ✓ 購入リンク
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};