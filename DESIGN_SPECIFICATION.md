# NutriAnalyzer詳細設計仕様書

## 1. システム概要

### 1.1 目的・ビジョン
- **プロジェクト名**: NutriAnalyzer（栄養検査統合分析・パーソナライズサプリ提案アプリ）
- **目的**: 複数の栄養検査結果を統合分析し、個人に最適化されたサプリメント提案を行う
- **ビジョン**: AIによる科学的根拠に基づいた個別栄養サポートの民主化

### 1.2 プロジェクト制約
- **開発期間**: 1ヶ月（MVP完成）
- **開発体制**: 個人開発
- **利用条件**: 無料・登録不要
- **効率化**: AIツール（GitHub Copilot、ChatGPT）活用

### 1.3 技術スタック
```typescript
// フロントエンド
- Framework: React 18 + TypeScript
- Styling: Tailwind CSS
- State Management: React Hooks (useState, useContext)
- Build Tool: Vite
- UI Components: Lucide React (icons)

// バックエンド
- Runtime: Supabase Edge Functions (Deno)
- Database: Supabase PostgreSQL
- AI Service: OpenAI GPT-4 API

// デプロイ
- Frontend: Bolt Hosting
- Database: Supabase Cloud
```

## 2. 機能要件

### 2.1 検査対応範囲

#### A. 毛髪ミネラル検査（22項目）
```typescript
interface HairMineralTest {
  // 必須ミネラル (12項目)
  essentialMinerals: {
    calcium: number;      // カルシウム (mg/100g)
    magnesium: number;    // マグネシウム (mg/100g)
    sodium: number;       // ナトリウム (mg/100g)
    potassium: number;    // カリウム (mg/100g)
    copper: number;       // 銅 (mg/100g)
    zinc: number;         // 亜鉛 (mg/100g)
    phosphorus: number;   // リン (mg/100g)
    iron: number;         // 鉄 (mg/100g)
    manganese: number;    // マンガン (mg/100g)
    chromium: number;     // クロム (mg/100g)
    selenium: number;     // セレン (mg/100g)
    cobalt: number;       // コバルト (mg/100g)
  };
  
  // 有害金属 (6項目)
  toxicMetals: {
    aluminum: number;     // アルミニウム (mg/100g)
    cadmium: number;      // カドミウム (mg/100g)
    mercury: number;      // 水銀 (mg/100g)
    lead: number;         // 鉛 (mg/100g)
    arsenic: number;      // ヒ素 (mg/100g)
    beryllium: number;    // ベリリウム (mg/100g)
  };
  
  // バランス比率 (4項目)
  ratios: {
    caToMg: number;       // Ca/Mg比
    naToK: number;        // Na/K比
    znToCu: number;       // Zn/Cu比
    caToP: number;        // Ca/P比
  };
}
```

#### B. 尿ビタミン検査（17項目）
```typescript
interface UrineVitaminTest {
  // 水溶性ビタミン (9項目)
  waterSolubleVitamins: {
    vitaminB1: number;    // チアミン (μg/g Cre)
    vitaminB2: number;    // リボフラビン (μg/g Cre)
    vitaminB6: number;    // ピリドキシン (μg/g Cre)
    vitaminB12: number;   // コバラミン (ng/g Cre)
    niacin: number;       // ナイアシン (mg/g Cre)
    pantothenicAcid: number; // パントテン酸 (mg/g Cre)
    biotin: number;       // ビオチン (μg/g Cre)
    folicAcid: number;    // 葉酸 (μg/g Cre)
    vitaminC: number;     // アスコルビン酸 (mg/g Cre)
  };
  
  // 有機酸 (5項目)
  organicAcids: {
    lacticAcid: number;   // 乳酸 (mg/g Cre)
    pyruvicAcid: number;  // ピルビン酸 (mg/g Cre)
    citricAcid: number;   // クエン酸 (mg/g Cre)
    ketoAcids: number;    // ケト酸 (mg/g Cre)
    oxalicAcid: number;   // シュウ酸 (mg/g Cre)
  };
  
  // アミノ酸 (3項目)
  aminoAcids: {
    taurine: number;      // タウリン (mg/g Cre)
    glycine: number;      // グリシン (mg/g Cre)
    alanine: number;      // アラニン (mg/g Cre)
  };
}
```

#### C. 血液検査（24項目）
```typescript
interface BloodTest {
  // 貧血関連 (7項目)
  anemia: {
    hemoglobin: number;   // ヘモグロビン (g/dL)
    hematocrit: number;   // ヘマトクリット (%)
    mcv: number;          // 平均赤血球容積 (fL)
    mch: number;          // 平均赤血球血色素量 (pg)
    mchc: number;         // 平均赤血球血色素濃度 (%)
    ferritin: number;     // フェリチン (ng/mL)
    tibc: number;         // 総鉄結合能 (μg/dL)
  };
  
  // ビタミン (5項目)
  vitamins: {
    vitaminB12: number;   // ビタミンB12 (pg/mL)
    folicAcid: number;    // 葉酸 (ng/mL)
    vitamin25D: number;   // 25-ヒドロキシビタミンD (ng/mL)
    vitaminE: number;     // ビタミンE (mg/dL)
    vitaminA: number;     // ビタミンA (IU/dL)
  };
  
  // 栄養マーカー (6項目)
  nutritionMarkers: {
    totalProtein: number; // 総タンパク質 (g/dL)
    albumin: number;      // アルブミン (g/dL)
    prealbumin: number;   // プレアルブミン (mg/dL)
    zinc: number;         // 血清亜鉛 (μg/dL)
    copper: number;       // 血清銅 (μg/dL)
    selenium: number;     // 血清セレン (μg/dL)
  };
  
  // 脂質 (4項目)
  lipids: {
    totalCholesterol: number; // 総コレステロール (mg/dL)
    ldlCholesterol: number;   // LDLコレステロール (mg/dL)
    hdlCholesterol: number;   // HDLコレステロール (mg/dL)
    triglycerides: number;    // 中性脂肪 (mg/dL)
  };
  
  // 炎症マーカー (2項目)
  inflammation: {
    crp: number;          // C反応性タンパク質 (mg/dL)
    esr: number;          // 赤血球沈降速度 (mm/h)
  };
}
```

### 2.2 個人属性仕様
```typescript
interface PersonalAttributes {
  // 基本情報
  age: number;                    // 年齢
  gender: 'male' | 'female';      // 性別
  weight: number;                 // 体重 (kg)
  height: number;                 // 身長 (cm)
  
  // ライフスタイル
  lifestyle: {
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'vigorous'; // 運動量
    stressLevel: 1 | 2 | 3 | 4 | 5;  // ストレスレベル (1-5)
    sleepHours: number;               // 平均睡眠時間
    smokingStatus: 'never' | 'former' | 'current'; // 喫煙状況
    alcoholIntake: 'none' | 'light' | 'moderate' | 'heavy'; // 飲酒量
  };
  
  // 健康状態
  healthConditions: {
    chronicDiseases: string[];      // 慢性疾患
    medications: string[];          // 服用中の薬
    allergies: string[];            // アレルギー
    pregnancyStatus: boolean;       // 妊娠中か
    breastfeedingStatus: boolean;   // 授乳中か
  };
  
  // 食事パターン
  dietaryPreferences: {
    dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
    restrictions: string[];         // 食事制限
    supplementsCurrently: string[]; // 現在服用中のサプリ
  };
}
```

## 3. 検査データ詳細仕様

### 3.1 基準値データベース
```typescript
interface ReferenceRanges {
  [testType: string]: {
    [parameter: string]: {
      optimal: { min: number; max: number };
      normal: { min: number; max: number };
      marginal: { min: number; max: number };
      deficient?: { max: number };
      excess?: { min: number };
      unit: string;
      ageAdjustment?: {
        [ageGroup: string]: { min: number; max: number };
      };
      genderAdjustment?: {
        male: { min: number; max: number };
        female: { min: number; max: number };
      };
    };
  };
}

// 例：毛髪ミネラルの基準値
const HAIR_MINERAL_RANGES: ReferenceRanges = {
  hairMineral: {
    calcium: {
      optimal: { min: 300, max: 1200 },
      normal: { min: 200, max: 1500 },
      marginal: { min: 100, max: 199 },
      deficient: { max: 100 },
      excess: { min: 1500 },
      unit: "mg/100g"
    },
    magnesium: {
      optimal: { min: 25, max: 80 },
      normal: { min: 15, max: 100 },
      marginal: { min: 10, max: 14 },
      deficient: { max: 10 },
      excess: { min: 100 },
      unit: "mg/100g"
    }
    // ... 他の項目
  }
};
```

## 4. 画面設計詳細

### 4.1 画面構成・遷移フロー
```
1. ランディングページ → 2. 検査選択 → 3. データ入力 → 4. 個人属性入力
                                                              ↓
8. 購入リンク ← 7. 詳細結果 ← 6. サプリ提案 ← 5. 分析結果表示
```

### 4.2 各画面詳細仕様

#### 画面1: ランディングページ
```typescript
// コンポーネント構造
interface LandingPageProps {
  onGetStarted: () => void;
}

// UI要素
- ヒーローセクション
  - キャッチコピー: "AIが導く、あなた専用の栄養サポート"
  - サブテキスト: "複数の検査結果を統合分析し、科学的根拠に基づいたサプリメントを提案"
  - CTAボタン: "無料で分析を始める"

- 機能紹介セクション
  - 3つの検査対応（アイコン + 説明）
  - AI統合分析の特徴
  - パーソナライズの強み

- 使用方法ステップ
  - Step1: 検査結果を入力
  - Step2: 個人情報を入力
  - Step3: AI分析結果を確認
  - Step4: 最適なサプリを購入

- 信頼性セクション
  - 科学的根拠の説明
  - プライバシー保護の説明
```

#### 画面2: 検査選択ページ
```typescript
interface TestSelectionProps {
  selectedTests: TestType[];
  onTestToggle: (test: TestType) => void;
  onNext: () => void;
}

type TestType = 'hair' | 'urine' | 'blood';

// UI要素
- 進捗インジケーター (1/4)
- 検査選択カード (3つ)
  - 毛髪ミネラル検査
    - チェックボックス
    - 検査項目数表示 (22項目)
    - 検査内容のプレビュー
    - 推定費用表示
  
  - 尿ビタミン検査 (17項目)
  - 血液検査 (24項目)

- 組み合わせ推奨表示
  - "より精密な分析のため2つ以上の検査を推奨"
  - 人気の組み合わせ表示

- 次へボタン (選択後に活性化)
```

#### 画面3: データ入力ページ
```typescript
interface DataInputProps {
  selectedTests: TestType[];
  testData: Partial<TestData>;
  onDataChange: (data: Partial<TestData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// UI要素
- 進捗インジケーター (2/4)
- タブ切り替え (選択した検査タイプ)
- 各検査のデータ入力フォーム
  - グループ化された入力フィールド
  - 単位表示
  - リアルタイムバリデーション
  - 基準値範囲のヒント表示

- 便利機能
  - 検査結果PDF読み込み (OCR予定)
  - CSV一括アップロード
  - 前回データの復元

- ナビゲーション
  - 戻るボタン
  - 保存して次へボタン
```

#### 画面4: 個人属性入力ページ
```typescript
interface PersonalAttributesProps {
  attributes: PersonalAttributes;
  onAttributeChange: (attributes: PersonalAttributes) => void;
  onAnalyze: () => void;
  onPrevious: () => void;
}

// UI要素
- 進捗インジケーター (3/4)
- フォームセクション
  - 基本情報 (年齢、性別、体重、身長)
  - ライフスタイル (活動量、ストレス、睡眠等)
  - 健康状態 (疾患、薬、アレルギー等)
  - 食事パターン (食事タイプ、制限事項等)

- インタラクティブ要素
  - スライダー (年齢、体重、睡眠時間等)
  - 選択ボタン (性別、活動レベル等)
  - チェックボックス (疾患、アレルギー等)
  - タグ入力 (現在のサプリ等)

- AI分析開始ボタン
```

#### 画面5: 分析結果表示ページ
```typescript
interface AnalysisResultProps {
  analysisResult: AnalysisResult;
  onViewDetails: () => void;
  onViewSupplements: () => void;
}

interface AnalysisResult {
  overallScore: number;        // 総合栄養スコア (0-100)
  categories: CategoryScore[]; // カテゴリ別スコア
  keyFindings: string[];       // 主要な発見事項
  riskFactors: string[];       // リスク要因
  recommendations: string[];   // 推奨事項
}

// UI要素
- 進捗インジケーター (4/4)
- 総合栄養スコア表示
  - 大きな円グラフ
  - スコア解釈テキスト

- カテゴリ別分析
  - ミネラルバランス
  - ビタミン状態
  - 代謝機能
  - デトックス能力

- 主要な発見事項
  - アイコン付きリスト
  - 重要度別色分け

- アクションボタン
  - 詳細分析を見る
  - サプリメント提案を見る
```

#### 画面6: サプリメント提案ページ
```typescript
interface SupplementRecommendationProps {
  recommendations: SupplementRecommendation[];
  personalizedPlan: PersonalizedPlan;
  onPurchase: (supplement: SupplementRecommendation) => void;
}

interface SupplementRecommendation {
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
  alternatives: Alternative[];
}

// UI要素
- 優先度別サプリメント表示
  - 高優先度 (3-5個)
  - 中優先度 (3-5個)
  - 低優先度 (2-3個)

- 各サプリメントカード
  - 商品画像
  - ブランド名・商品名
  - 推奨理由
  - 用法・用量
  - 服用タイミング
  - 価格・購入リンク
  - 代替商品

- パーソナライズプラン
  - 月間コスト総計
  - 服用スケジュール
  - 期待される効果
  - 再検査推奨時期
```

## 5. AI分析仕様

### 5.1 OpenAI API統合設計
```typescript
// API設定
const OPENAI_CONFIG = {
  model: "gpt-4-1106-preview",
  temperature: 0.3,
  max_tokens: 4000,
  top_p: 0.9
};

// 分析リクエスト構造
interface AnalysisRequest {
  testData: TestData;
  personalAttributes: PersonalAttributes;
  referenceRanges: ReferenceRanges;
}

// 分析レスポンス構造
interface AnalysisResponse {
  overallAssessment: OverallAssessment;
  detailedAnalysis: DetailedAnalysis;
  supplementRecommendations: SupplementRecommendation[];
  lifestyle Recommendations: LifestyleRecommendation[];
  warnings: Warning[];
}
```

### 5.2 プロンプト設計詳細

#### メインプロンプト
```typescript
const MAIN_ANALYSIS_PROMPT = `
あなたは栄養学と機能医学の専門家です。提供された検査結果と個人属性を基に、科学的根拠に基づいた包括的な栄養分析とサプリメント推奨を行ってください。

## 入力データ:
- 検査結果: {testData}
- 個人属性: {personalAttributes}
- 基準値: {referenceRanges}

## 分析手順:
1. **検査結果の統合評価**
   - 各検査項目の基準値との比較
   - 項目間の相関関係分析
   - 矛盾する結果の検出と解釈
   - 個人属性による調整

2. **栄養状態の包括的評価**
   - マクロ栄養素バランス
   - ミクロ栄養素状態
   - 代謝機能評価
   - デトックス能力評価

3. **リスク評価**
   - 栄養欠乏症リスク
   - 慢性疾患リスク
   - 代謝異常リスク
   - 有害金属蓄積リスク

4. **サプリメント推奨**
   - 優先度付け (高/中/低)
   - 具体的商品名・ブランド指定
   - 用法・用量・タイミング
   - 期間・モニタリング頻度
   - 相互作用チェック

## 出力形式:
以下のJSON形式で回答してください:

{
  "overallScore": 0-100の数値,
  "categoryScores": {
    "mineralBalance": 0-100,
    "vitaminStatus": 0-100,
    "metabolicFunction": 0-100,
    "detoxification": 0-100
  },
  "keyFindings": [
    "主要な発見事項を3-5項目",
    "具体的な数値と基準値からの乖離を含む"
  ],
  "supplements": [
    {
      "priority": "high|medium|low",
      "category": "カテゴリ名",
      "productName": "具体的商品名",
      "brand": "メーカー名",
      "dosage": "用量",
      "timing": ["朝食後", "昼食前"],
      "duration": "期間",
      "reasoning": "推奨理由",
      "price": 推定価格,
      "alternatives": ["代替商品1", "代替商品2"]
    }
  ],
  "warnings": [
    "注意事項や医師相談が必要な項目"
  ],
  "monitoringRecommendations": "再検査推奨時期と項目"
}

## 重要な制約:
- 医療診断は行わず、栄養サポートの観点から分析
- 日本で入手可能な商品のみ推奨
- 個人属性（年齢、性別、体重等）を必ず考慮
- 薬剤との相互作用を確認
- 科学的根拠に基づく推奨のみ提供
`;
```

#### 矛盾検出プロンプト
```typescript
const CONTRADICTION_DETECTION_PROMPT = `
複数の検査結果間で矛盾や不整合がないかチェックし、以下の観点で評価してください:

1. **ミネラル間の関係性**
   - Ca/Mg比の妥当性
   - Zn/Cu比の妥当性
   - 毛髪と血液のミネラル値の整合性

2. **ビタミン代謝の整合性**
   - B群ビタミン間の相関
   - 脂溶性ビタミンと脂質の関係
   - 尿中と血中ビタミン値の整合性

3. **代謝マーカーの整合性**
   - タンパク質マーカーと栄養状態
   - 炎症マーカーと栄養吸収
   - 有機酸とビタミン代謝

矛盾がある場合は、可能性の高い原因と追加検査の提案を含めてください。
`;
```

### 5.3 分析ロジック詳細
```typescript
// 統合分析クラス
class NutritionAnalyzer {
  constructor(private openai: OpenAI) {}

  async analyze(request: AnalysisRequest): Promise<AnalysisResponse> {
    // 1. データ前処理
    const normalizedData = this.normalizeTestData(request.testData);
    const adjustedRanges = this.adjustReferenceRanges(
      request.referenceRanges, 
      request.personalAttributes
    );

    // 2. 基本的な異常値検出
    const outliers = this.detectOutliers(normalizedData, adjustedRanges);

    // 3. 相関関係分析
    const correlations = this.analyzeCorrelations(normalizedData);

    // 4. 矛盾検出
    const contradictions = await this.detectContradictions(normalizedData);

    // 5. AI統合分析
    const aiAnalysis = await this.performAIAnalysis(request);

    // 6. サプリメント推奨
    const supplements = await this.generateSupplementRecommendations(
      aiAnalysis, 
      request.personalAttributes
    );

    return {
      overallAssessment: aiAnalysis.overallAssessment,
      detailedAnalysis: {
        outliers,
        correlations,
        contradictions
      },
      supplementRecommendations: supplements,
      lifestyleRecommendations: aiAnalysis.lifestyle,
      warnings: aiAnalysis.warnings
    };
  }

  private detectOutliers(data: any, ranges: any): Outlier[] {
    const outliers: Outlier[] = [];
    
    for (const [category, values] of Object.entries(data)) {
      for (const [param, value] of Object.entries(values as any)) {
        const range = ranges[category]?.[param];
        if (range && typeof value === 'number') {
          if (value < range.normal.min) {
            outliers.push({
              parameter: param,
              value,
              status: 'low',
              severity: value < range.deficient?.max ? 'severe' : 'mild'
            });
          } else if (value > range.normal.max) {
            outliers.push({
              parameter: param,
              value,
              status: 'high', 
              severity: value > range.excess?.min ? 'severe' : 'mild'
            });
          }
        }
      }
    }
    
    return outliers;
  }
}
```

## 6. データベース設計

### 6.1 テーブル設計
```sql
-- 分析セッション管理
CREATE TABLE analysis_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

-- テストデータ保存
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES analysis_sessions(id) ON DELETE CASCADE,
  test_type VARCHAR(50) NOT NULL, -- 'hair', 'urine', 'blood'
  test_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 個人属性
CREATE TABLE personal_attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES analysis_sessions(id) ON DELETE CASCADE,
  age INTEGER NOT NULL,
  gender VARCHAR(10) NOT NULL,
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  lifestyle_data JSONB,
  health_conditions JSONB,
  dietary_preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 分析結果
CREATE TABLE analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES analysis_sessions(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL,
  category_scores JSONB NOT NULL,
  key_findings JSONB NOT NULL,
  risk_factors JSONB,
  ai_analysis_raw TEXT, -- OpenAI APIの生レスポンス
  created_at TIMESTAMP DEFAULT NOW()
);

-- サプリメント推奨
CREATE TABLE supplement_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES analysis_sessions(id) ON DELETE CASCADE,
  priority VARCHAR(10) NOT NULL, -- 'high', 'medium', 'low'
  category VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  dosage VARCHAR(255) NOT NULL,
  timing JSONB NOT NULL, -- 服用タイミング配列
  duration VARCHAR(100),
  price DECIMAL(10,2),
  purchase_url TEXT,
  reasoning TEXT,
  alternatives JSONB, -- 代替商品配列
  created_at TIMESTAMP DEFAULT NOW()
);

-- 基準値マスタ
CREATE TABLE reference_ranges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_type VARCHAR(50) NOT NULL,
  parameter VARCHAR(100) NOT NULL,
  optimal_min DECIMAL(10,4),
  optimal_max DECIMAL(10,4),
  normal_min DECIMAL(10,4),
  normal_max DECIMAL(10,4),
  marginal_min DECIMAL(10,4),
  marginal_max DECIMAL(10,4),
  deficient_max DECIMAL(10,4),
  excess_min DECIMAL(10,4),
  unit VARCHAR(50),
  age_adjustments JSONB,
  gender_adjustments JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- サプリメント商品マスタ
CREATE TABLE supplement_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  active_ingredients JSONB NOT NULL,
  price DECIMAL(10,2),
  purchase_url TEXT,
  image_url TEXT,
  description TEXT,
  dosage_instructions TEXT,
  warnings TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_analysis_sessions_token ON analysis_sessions(session_token);
CREATE INDEX idx_test_results_session ON test_results(session_id);
CREATE INDEX idx_analysis_results_session ON analysis_results(session_id);
CREATE INDEX idx_supplement_recs_session ON supplement_recommendations(session_id);
CREATE INDEX idx_reference_ranges_lookup ON reference_ranges(test_type, parameter);
CREATE INDEX idx_supplement_products_category ON supplement_products(category);
```

### 6.2 データマイグレーション
```sql
-- 基準値データの初期投入
INSERT INTO reference_ranges (test_type, parameter, optimal_min, optimal_max, normal_min, normal_max, unit) VALUES
('hair', 'calcium', 300, 1200, 200, 1500, 'mg/100g'),
('hair', 'magnesium', 25, 80, 15, 100, 'mg/100g'),
('hair', 'zinc', 12, 20, 8, 25, 'mg/100g'),
-- ... 他の基準値

-- サプリメント商品データの初期投入  
INSERT INTO supplement_products (product_name, brand, category, active_ingredients, price, purchase_url) VALUES
('カルマグ', 'ネイチャーメイド', 'ミネラル', '{"calcium": "200mg", "magnesium": "100mg"}', 1200, 'https://example.com/product1'),
('亜鉛', 'DHC', 'ミネラル', '{"zinc": "15mg"}', 800, 'https://example.com/product2'),
-- ... 他の商品データ
```

## 7. API設計

### 7.1 エンドポイント仕様
```typescript
// セッション作成
POST /api/sessions
Response: {
  sessionToken: string;
  expiresAt: string;
}

// テストデータ保存
POST /api/sessions/:sessionToken/test-results
Body: {
  testType: 'hair' | 'urine' | 'blood';
  testData: TestData;
}

// 個人属性保存
POST /api/sessions/:sessionToken/personal-attributes
Body: PersonalAttributes

// 分析実行
POST /api/sessions/:sessionToken/analyze
Response: {
  analysisId: string;
  status: 'processing' | 'completed' | 'failed';
}

// 分析結果取得
GET /api/sessions/:sessionToken/results
Response: AnalysisResponse

// サプリメント推奨取得
GET /api/sessions/:sessionToken/supplements
Response: {
  recommendations: SupplementRecommendation[];
  totalMonthlyCost: number;
}
```

### 7.2 Supabase Edge Function実装
```typescript
// /functions/analyze-nutrition/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { sessionToken } = await req.json()
    
    // セッションデータ取得
    const { data: session } = await supabase
      .from('analysis_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single()

    if (!session) {
      throw new Error('セッションが見つかりません')
    }

    // テストデータ取得
    const { data: testResults } = await supabase
      .from('test_results')
      .select('*')
      .eq('session_id', session.id)

    // 個人属性取得  
    const { data: attributes } = await supabase
      .from('personal_attributes')
      .select('*')
      .eq('session_id', session.id)
      .single()

    // OpenAI分析実行
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-1106-preview',
        messages: [{
          role: 'user',
          content: generateAnalysisPrompt(testResults, attributes)
        }],
        temperature: 0.3,
        max_tokens: 4000
      })
    })

    const aiResult = await openaiResponse.json()
    const analysis = JSON.parse(aiResult.choices[0].message.content)

    // 結果保存
    const { data: analysisResult } = await supabase
      .from('analysis_results')
      .insert({
        session_id: session.id,
        overall_score: analysis.overallScore,
        category_scores: analysis.categoryScores,
        key_findings: analysis.keyFindings,
        ai_analysis_raw: aiResult.choices[0].message.content
      })
      .select()
      .single()

    // サプリメント推奨保存
    for (const supplement of analysis.supplements) {
      await supabase
        .from('supplement_recommendations')
        .insert({
          session_id: session.id,
          ...supplement
        })
    }

    return new Response(
      JSON.stringify({ success: true, analysisId: analysisResult.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

function generateAnalysisPrompt(testResults: any[], attributes: any): string {
  // プロンプト生成ロジック
  return `${MAIN_ANALYSIS_PROMPT}
  
  検査結果: ${JSON.stringify(testResults)}
  個人属性: ${JSON.stringify(attributes)}
  `
}
```

## 8. セキュリティ・プライバシー対策

### 8.1 データ保護方針
```typescript
// セキュリティ設定
const SECURITY_CONFIG = {
  // セッション管理
  sessionExpiration: 24 * 60 * 60 * 1000, // 24時間
  tokenLength: 32,
  
  // データ暗号化
  encryptionAlgorithm: 'AES-256-GCM',
  
  // データ保持期間
  dataRetentionDays: 30, // 30日後自動削除
  
  // CORS設定
  allowedOrigins: process.env.NODE_ENV === 'production' 
    ? ['https://nutrianalyzer.com'] 
    : ['http://localhost:3000'],
    
  // レート制限
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15分
    maxRequests: 100 // 最大100リクエスト
  }
};

// データ暗号化ユーティリティ
class DataEncryption {
  private key: Buffer;
  
  constructor() {
    this.key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  }
  
  encrypt(data: any): { encrypted: string; iv: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-gcm', this.key);
    cipher.setAAD(Buffer.from('nutritiondata'));
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted: encrypted + authTag.toString('hex'),
      iv: iv.toString('hex')
    };
  }
  
  decrypt(encrypted: string, iv: string): any {
    const authTag = Buffer.from(encrypted.slice(-32), 'hex');
    const encryptedData = encrypted.slice(0, -32);
    
    const decipher = crypto.createDecipher('aes-256-gcm', this.key);
    decipher.setAAD(Buffer.from('nutritiondata'));
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }
}
```

### 8.2 プライバシー保護機能
```typescript
// 自動データ削除機能
async function cleanupExpiredSessions() {
  const expirationThreshold = new Date(Date.now() - SECURITY_CONFIG.dataRetentionDays * 24 * 60 * 60 * 1000);
  
  const { data: expiredSessions } = await supabase
    .from('analysis_sessions')
    .select('id')
    .lt('created_at', expirationThreshold.toISOString());
    
  if (expiredSessions?.length) {
    // 関連データも連鎖削除される（CASCADE設定により）
    await supabase
      .from('analysis_sessions')
      .delete()
      .in('id', expiredSessions.map(s => s.id));
      
    console.log(`${expiredSessions.length}件の期限切れセッションを削除しました`);
  }
}

// 定期実行設定（Supabase Cron Jobs）
-- 毎日午前2時に実行
select cron.schedule('cleanup-expired-sessions', '0 2 * * *', 'SELECT cleanup_expired_sessions()');
```

### 8.3 入力値検証
```typescript
// バリデーションスキーマ
const testDataSchema = {
  hair: {
    calcium: { min: 0, max: 10000, required: true },
    magnesium: { min: 0, max: 1000, required: true },
    // ... 他の項目
  },
  urine: {
    vitaminB1: { min: 0, max: 10000, required: true },
    // ... 他の項目  
  },
  blood: {
    hemoglobin: { min: 0, max: 30, required: true },
    // ... 他の項目
  }
};

function validateTestData(testType: string, data: any): ValidationResult {
  const schema = testDataSchema[testType as keyof typeof testDataSchema];
  const errors: string[] = [];
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    
    if (rules.required && (value === undefined || value === null)) {
      errors.push(`${field}は必須項目です`);
      continue;
    }
    
    if (typeof value === 'number') {
      if (value < rules.min || value > rules.max) {
        errors.push(`${field}は${rules.min}から${rules.max}の間で入力してください`);
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

## 9. 開発スケジュール・マイルストーン

### 9.1 4週間開発計画
```
週1: 基盤構築・データベース設計
├── Day 1-2: 開発環境セットアップ、技術スタック構築
├── Day 3-4: データベース設計・実装、基準値データ投入
├── Day 5-6: 基本的なUI/UXフレームワーク構築
└── Day 7: Week1振り返り・調整

週2: コア機能開発
├── Day 8-9: 検査データ入力機能、バリデーション実装
├── Day 10-11: 個人属性入力機能実装
├── Day 12-13: OpenAI API統合、基本的分析機能
└── Day 14: Week2振り返り・調整

週3: AI分析・推奨機能
├── Day 15-16: プロンプト最適化、分析精度向上
├── Day 17-18: サプリメント推奨ロジック実装
├── Day 19-20: 結果表示・詳細分析画面
└── Day 21: Week3振り返り・調整

週4: 仕上げ・最適化・デプロイ
├── Day 22-23: UI/UX改善、レスポンシブ対応
├── Day 24-25: セキュリティ対策、パフォーマンス最適化
├── Day 26-27: テスト・デバッグ・修正
└── Day 28: 本番デプロイ・リリース準備
```

### 9.2 各マイルストーンの成果物
```typescript
// Week 1 成果物
interface Week1Deliverables {
  database: {
    tables: string[]; // 全テーブル作成完了
    seedData: string[]; // 基準値・商品マスタ投入完了
  };
  frontend: {
    routing: boolean; // ページルーティング設定完了
    baseUI: boolean; // 基本UIコンポーネント完了
  };
  backend: {
    apiStructure: boolean; // API エンドポイント構造完了
    authentication: boolean; // セッション管理機能完了
  };
}

// Week 2 成果物
interface Week2Deliverables {
  dataInput: {
    testSelection: boolean; // 検査選択機能完了
    dataEntry: boolean; // データ入力フォーム完了
    validation: boolean; // 入力値検証機能完了
  };
  personalAttributes: {
    formUI: boolean; // 個人属性入力フォーム完了
    dataStorage: boolean; // 個人属性保存機能完了
  };
  aiIntegration: {
    openaiConnection: boolean; // OpenAI API接続完了
    basicAnalysis: boolean; // 基本分析機能完了
  };
}

// Week 3 成果物
interface Week3Deliverables {
  analysis: {
    promptOptimization: boolean; // プロンプト最適化完了
    contradictionDetection: boolean; // 矛盾検出機能完了
    scoringSystem: boolean; // スコアリング機能完了
  };
  recommendations: {
    supplementLogic: boolean; // サプリ推奨ロジック完了
    productMatching: boolean; // 商品マッチング機能完了
    pricingCalculation: boolean; // 価格計算機能完了
  };
  results: {
    analysisDisplay: boolean; // 分析結果表示完了
    supplementCards: boolean; // サプリメントカード表示完了
  };
}

// Week 4 成果物
interface Week4Deliverables {
  optimization: {
    responsive: boolean; // レスポンシブ対応完了
    performance: boolean; // パフォーマンス最適化完了
    security: boolean; // セキュリティ対策完了
  };
  testing: {
    unitTests: boolean; // ユニットテスト完了
    integrationTests: boolean; // 統合テスト完了
    userTesting: boolean; // ユーザビリティテスト完了
  };
  deployment: {
    production: boolean; // 本番環境デプロイ完了
    monitoring: boolean; // 監視・ログ設定完了
  };
}
```

## 10. 技術的課題と解決策

### 10.1 主要課題と解決アプローチ

#### 課題1: AI分析精度の確保
**問題**: OpenAI APIの回答品質のばらつき、医学的正確性の担保
**解決策**: 
```typescript
// 多段階検証システム
class AnalysisQualityController {
  async validateAnalysis(analysis: any): Promise<ValidationResult> {
    const checks = [
      this.validateNumericalCoherence(analysis),
      this.validateMedicalLogic(analysis),
      this.validateSupplementSafety(analysis),
      this.validateInteractions(analysis)
    ];
    
    const results = await Promise.all(checks);
    return this.aggregateValidationResults(results);
  }
  
  private async validateMedicalLogic(analysis: any): Promise<boolean> {
    // 医学的ロジックの検証
    // 既知の栄養学の法則との整合性チェック
    const rules = [
      // 例：鉄欠乏性貧血の場合、鉄の推奨は必須
      (a: any) => a.bloodTest?.hemoglobin < 12 ? a.supplements.some((s: any) => s.category === 'iron') : true,
      // 例：高カルシウムの場合、マグネシウム推奨は必須
      (a: any) => a.hairTest?.calcium > 1200 ? a.supplements.some((s: any) => s.category === 'magnesium') : true
    ];
    
    return rules.every(rule => rule(analysis));
  }
}
```

#### 課題2: 大量データの効率的処理
**問題**: 検査項目数（最大63項目）の組み合わせ分析の計算複雑度
**解決策**:
```typescript
// データ前処理パイプライン
class DataPreprocessor {
  async optimizeAnalysisData(testData: TestData): Promise<OptimizedData> {
    return {
      priorityItems: this.extractPriorityItems(testData),
      correlationGroups: this.groupCorrelatedItems(testData),
      anomalyFlags: this.flagAnomalies(testData),
      processedPrompt: this.generateOptimizedPrompt(testData)
    };
  }
  
  private extractPriorityItems(data: TestData): PriorityItem[] {
    // 異常値の重要度に基づく優先度付け
    const items: PriorityItem[] = [];
    
    for (const [category, values] of Object.entries(data)) {
      for (const [param, value] of Object.entries(values)) {
        const deviation = this.calculateDeviationScore(param, value);
        if (deviation > SIGNIFICANCE_THRESHOLD) {
          items.push({ category, param, value, deviation });
        }
      }
    }
    
    return items.sort((a, b) => b.deviation - a.deviation).slice(0, 20); // 上位20項目
  }
}
```

#### 課題3: リアルタイム性とコスト管理
**問題**: OpenAI API呼び出しのレスポンス時間とコスト
**解決策**:
```typescript
// キャッシュ・最適化システム
class AIAnalysisOptimizer {
  private cache = new Map<string, CacheEntry>();
  
  async getAnalysis(request: AnalysisRequest): Promise<AnalysisResponse> {
    const cacheKey = this.generateCacheKey(request);
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isCacheExpired(cached)) {
      return cached.response;
    }
    
    // 段階的分析で API呼び出しを最適化
    const basicAnalysis = await this.performBasicAnalysis(request);
    
    if (this.needsDetailedAnalysis(basicAnalysis)) {
      const detailedAnalysis = await this.performDetailedAnalysis(request, basicAnalysis);
      return this.mergeAnalyses(basicAnalysis, detailedAnalysis);
    }
    
    return basicAnalysis;
  }
  
  private async performBasicAnalysis(request: AnalysisRequest): Promise<AnalysisResponse> {
    // より短いプロンプトで基本分析
    // トークン数: 約1000トークン（詳細分析の1/3）
    const prompt = this.generateBasicPrompt(request);
    return this.callOpenAI(prompt, { max_tokens: 1500 });
  }
}
```

#### 課題4: サプリメント商品データの最新性
**問題**: 商品価格・在庫状況の変動、新商品の追加
**解決策**:
```typescript
// 自動データ更新システム  
class ProductDataSynchronizer {
  private updateSchedule = [
    { source: 'amazon-api', frequency: 'daily' },
    { source: 'iherb-scraper', frequency: 'weekly' },
    { source: 'rakuten-api', frequency: 'daily' }
  ];
  
  async syncProductData(): Promise<void> {
    const updates = await Promise.allSettled([
      this.syncAmazonData(),
      this.syncIHerbData(), 
      this.syncRakutenData()
    ]);
    
    const successfulUpdates = updates.filter(u => u.status === 'fulfilled');
    console.log(`${successfulUpdates.length}/3のデータソース更新完了`);
  }
  
  private async syncAmazonData(): Promise<void> {
    // Amazon Product Advertising API使用
    const products = await this.amazon.searchProducts({
      category: 'supplements',
      keywords: ['ビタミン', 'ミネラル', 'サプリメント']
    });
    
    for (const product of products) {
      await this.updateProductRecord({
        source: 'amazon',
        productId: product.ASIN,
        name: product.title,
        price: product.price,
        url: product.url,
        availability: product.availability
      });
    }
  }
}
```

#### 課題5: UI/UXの複雑性管理
**問題**: 大量のデータ入力項目（最大63項目）のユーザビリティ
**解決策**:
```typescript
// プログレッシブ・ディスクロージャー実装
interface SmartInputSystem {
  // 段階的入力表示
  phaseConfiguration: {
    phase1: string[]; // 必須項目のみ（10-15項目）
    phase2: string[]; // 推奨項目（15-20項目）  
    phase3: string[]; // 詳細項目（残りすべて）
  };
  
  // 自動優先度判定
  smartPrioritization: {
    basedOnAge: (age: number) => string[];
    basedOnGender: (gender: string) => string[];
    basedOnSymptoms: (symptoms: string[]) => string[];
  };
}

// 実装例
class SmartDataInput extends React.Component {
  determineRequiredFields(personalInfo: PersonalAttributes): string[] {
    let required = [...BASE_REQUIRED_FIELDS];
    
    // 年齢ベースの追加
    if (personalInfo.age > 50) {
      required.push(...['vitaminD', 'vitaminB12', 'calcium']);
    }
    
    // 性別ベースの追加
    if (personalInfo.gender === 'female') {
      required.push(...['iron', 'folicAcid']);
    }
    
    // 症状ベースの追加
    if (personalInfo.symptoms?.includes('疲労')) {
      required.push(...['iron', 'vitaminB12', 'magnesium']);
    }
    
    return required;
  }
}
```

#### 課題6: 医療法規制への対応
**問題**: 医療診断・治療への誤解を避ける表現の管理
**解決策**:
```typescript
// 医療表現フィルター
class MedicalExpressionFilter {
  private prohibitedTerms = [
    '診断', '治療', '病気', '疾患', '症状', '改善', '治る', '効果'
  ];
  
  private replacementTerms = {
    '診断': '栄養状態の評価',
    '治療': '栄養サポート',
    '病気': '体調不良',
    '効果': '期待されるサポート'
  };
  
  filterMedicalExpressions(text: string): string {
    let filtered = text;
    
    for (const [prohibited, replacement] of Object.entries(this.replacementTerms)) {
      filtered = filtered.replace(new RegExp(prohibited, 'g'), replacement);
    }
    
    // 医療行為を示唆する文章のチェック
    if (this.containsMedicalClaims(filtered)) {
      filtered = this.addDisclaimerText(filtered);
    }
    
    return filtered;
  }
  
  private addDisclaimerText(text: string): string {
    return `${text}\n\n※この内容は栄養サポートの提案であり、医療診断・治療行為ではありません。健康に関する心配がある場合は、医師にご相談ください。`;
  }
}
```

### 10.2 パフォーマンス最適化戦略

#### フロントエンド最適化
```typescript
// 遅延ローディング
const LazyAnalysisResult = React.lazy(() => import('./AnalysisResult'));
const LazySupplementRecommendation = React.lazy(() => import('./SupplementRecommendation'));

// メモ化
const MemoizedTestInput = React.memo(TestInput, (prevProps, nextProps) => {
  return prevProps.testType === nextProps.testType && 
         JSON.stringify(prevProps.testData) === JSON.stringify(nextProps.testData);
});

// 仮想化（大量データ表示）
import { FixedSizeList as List } from 'react-window';

const SupplementList: React.FC = ({ supplements }) => (
  <List
    height={600}
    itemCount={supplements.length}
    itemSize={120}
    itemData={supplements}
  >
    {({ index, data, style }) => (
      <div style={style}>
        <SupplementCard supplement={data[index]} />
      </div>
    )}
  </List>
);
```

#### バックエンド最適化
```typescript
// データベースクエリ最適化
const optimizedQuery = `
SELECT 
  ar.overall_score,
  ar.category_scores,
  json_agg(
    json_build_object(
      'product_name', sr.product_name,
      'brand', sr.brand,
      'priority', sr.priority,
      'price', sr.price
    ) ORDER BY 
      CASE sr.priority 
        WHEN 'high' THEN 1 
        WHEN 'medium' THEN 2 
        WHEN 'low' THEN 3 
      END
  ) as supplements
FROM analysis_results ar
JOIN supplement_recommendations sr ON ar.session_id = sr.session_id
WHERE ar.session_id = $1
GROUP BY ar.id, ar.overall_score, ar.category_scores
`;

// 接続プール設定
const dbConfig = {
  max: 20, // 最大接続数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
};
```

この詳細設計仕様書により、1ヶ月での MVP 完成を目指す実装可能な技術仕様が完成しました。次に、この仕様書に基づいたプロトタイプの実装に移ります。