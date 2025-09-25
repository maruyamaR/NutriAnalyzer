import React from 'react';
import { Zap, Shield, Target, TrendingUp, FlaskConical, Brain, Heart, ArrowRight, CheckCircle, Star, Users, Award, Clock, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">NutriAnalyzer</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium transition-colors">機能</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium transition-colors">使い方</a>
                <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium transition-colors">お客様の声</a>
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  無料で始める
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="健康的な食材"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-emerald-50/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI栄養分析の新時代
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                あなたの
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block">
                  栄養状態を
                </span>
                科学的に解析
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                複数の検査結果をAIが統合分析し、あなたに最適なサプリメントを提案。科学的根拠に基づいた個別栄養サポートを実現します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  無料で分析を始める
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  <span className="font-medium">登録不要・完全無料</span>
                </div>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-emerald-500 mr-2" />
                  <span>科学的根拠に基づく分析</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-emerald-500 mr-2" />
                  <span>プライバシー保護</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="栄養分析イメージ"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-600">リアルタイム分析</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
                  <div className="text-sm text-gray-500">分析精度</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white max-w-xs">
                  <div className="flex items-center mb-3">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">平均分析時間</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">2分</div>
                  <div className="text-sm text-emerald-100">最大63項目を統合分析</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">3つの検査を統合分析</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              単体検査では見えない栄養バランスを、最新のAI技術で包括的に分析します
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                    <FlaskConical className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">毛髪検査</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  必須ミネラル12項目、有害金属6項目、バランス比率4項目の計22項目を分析し、長期的な栄養蓄積状態を評価
                </p>
                <div className="text-sm text-emerald-600 font-medium">22項目の詳細分析</div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">尿検査</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  水溶性ビタミン9項目、有機酸5項目、アミノ酸3項目の計17項目で代謝機能と栄養利用効率を解析
                </p>
                <div className="text-sm text-emerald-600 font-medium">17項目の代謝分析</div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">血液検査</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  貧血関連7項目、ビタミン5項目、栄養マーカー6項目等、計24項目で現在の生理的状態を精密分析
                </p>
                <div className="text-sm text-emerald-600 font-medium">24項目の精密分析</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">4つのステップで簡単分析</h2>
            <p className="text-xl text-gray-600">わずか数分で、あなた専用の栄養分析結果を取得</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "検査選択",
                description: "分析したい検査を選択します",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2", 
                title: "データ入力",
                description: "検査結果の数値を入力します",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "3",
                title: "個人情報",
                description: "年齢、体重等の基本情報を入力",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                step: "4",
                title: "結果確認",
                description: "AI分析結果とサプリ提案を確認",
                color: "from-red-500 to-red-600"
              }
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6">
                 <div className={`w-16 h-16 mx-auto rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                   <span className="text-white text-xl font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              多くの方にご利用いただいています
            </h2>
            <p className="text-xl text-gray-600">実際にご利用いただいたお客様の声</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                comment: "複数の検査結果を統合して分析してくれるので、今まで見えなかった栄養バランスがよく分かりました。具体的なサプリメントまで提案してくれて助かります。",
                rating: 5
              },
              {
                comment: "仕事が忙しくて栄養管理が難しかったのですが、このアプリのおかげで効率的にサプリメントを選べるようになりました。疲労感も改善されています。",
                rating: 5
              },
              {
                comment: "無料で使えるのに、とても詳しい分析結果が得られて驚きました。AI分析の精度も高く、信頼できるサービスだと思います。",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="健康的な生活"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-900/90"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            今すぐ始めましょう
          </h2>
          <p className="text-xl text-emerald-100 leading-relaxed mb-8 max-w-2xl mx-auto">
            あなたの栄養状態を詳しく分析し、最適なサプリメントを見つけましょう。
            科学的根拠に基づいた個別サポートで、健康な毎日を実現します。
          </p>
          <button
            onClick={onGetStarted}
            className="group bg-white text-emerald-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
          >
            無料で分析を始める
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-6 text-emerald-200 text-sm">
            ✓ 登録不要 ✓ 完全無料 ✓ 3分で完了
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">NutriAnalyzer</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                AI技術を活用した栄養検査統合分析サービス。科学的根拠に基づいた個別栄養サポートを提供します。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">サービス</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">栄養分析</a></li>
                <li><a href="#" className="hover:text-white transition-colors">サプリ提案</a></li>
                <li><a href="#" className="hover:text-white transition-colors">健康管理</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">サポート</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NutriAnalyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};