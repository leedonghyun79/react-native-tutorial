# 📱 UI 레이아웃 깨짐 원인 분석

> 2025-12-12 발생한 UI 깨짐 현상과 해결 방법

---

## 🖼️ 문제 증상

![UI 깨짐 스크린샷](C:/Users/skybl/.gemini/antigravity/brain/d69ec6a7-b045-42c8-ba42-54caa75da974/uploaded_image_1765529136677.png)

- Empty 컴포넌트의 이미지가 입력창과 겹침
- 콘텐츠가 화면 전체를 차지하지 않음
- 레이아웃이 제대로 펼쳐지지 않음

---

## ❌ 기존 코드 (문제 있는 버전)

```tsx
export default function App() {
  const today = new Date();
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']}>        {/* ⚠️ flex: 1 없음 */}
        <View style={{ flex: 1 }}>             {/* ❌ 부모가 높이 제한이 없어서 무의미 */}
          <DateHead date={today} />
          <Empty />
          <AddTodo onInsert={() => { }} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

### 🔍 문제 원인

| 문제 | 설명 |
|------|------|
| **SafeAreaView에 `flex: 1` 없음** | SafeAreaView가 화면 전체 높이를 차지하지 않음 |
| **자식 View의 `flex: 1`이 무의미** | 부모(SafeAreaView)가 고정 높이가 없으면 자식의 flex도 작동하지 않음 |
| **콘텐츠가 자연 높이로만 렌더링** | Empty와 AddTodo가 겹치거나 밀려남 |

### 📐 시각적 설명

```
┌─────────────────────────────────┐
│       SafeAreaView              │ ← 높이가 콘텐츠 크기만큼만
│  ┌─────────────────────────┐    │
│  │  DateHead               │    │
│  ├─────────────────────────┤    │
│  │  Empty (이미지+텍스트)   │    │  ← 아래로 밀려나며 겹침
│  ├─────────────────────────┤    │
│  │  AddTodo                │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
         ↓ 화면 하단 (빈 공간)
```

---

## ✅ 수정된 코드 (올바른 버전)

```tsx
export default function App() {
  const today = new Date();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>  {/* ✅ flex: 1 추가 */}
        <DateHead date={today} />
        <Empty />
        <AddTodo onInsert={() => { }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

### ✨ 해결 포인트

| 변경 | 효과 |
|------|------|
| **`style={{ flex: 1 }}`** | SafeAreaView가 화면 전체 높이를 차지 |
| **불필요한 View 제거** | 코드 간결화, 불필요한 중첩 제거 |
| **Empty의 `flex: 1`이 올바르게 작동** | 남은 공간을 Empty가 차지 |

### 📐 수정 후 레이아웃

```
┌─────────────────────────────────┐
│       SafeAreaView (flex: 1)    │ ← 화면 전체 높이 차지
│  ┌─────────────────────────┐    │
│  │  DateHead               │    │ ← 고정 높이
│  ├─────────────────────────┤    │
│  │                         │    │
│  │  Empty (flex: 1)        │    │ ← 남은 공간 모두 차지
│  │                         │    │
│  ├─────────────────────────┤    │
│  │  AddTodo                │    │ ← 하단 고정
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

---

## 📚 핵심 개념: Flexbox와 `flex: 1`

### `flex: 1`의 의미
- 부모 컨테이너의 **남은 공간을 모두 차지**
- 하지만 **부모도 높이가 정의되어 있어야** 작동함

### React Native 레이아웃 규칙
```
부모 (flex: 1 또는 고정 높이)
  └── 자식 (flex: 1) → 남은 공간 차지
  └── 자식 (고정 높이) → 지정된 높이만 차지
```

### ⚠️ 주의사항
```tsx
// ❌ 부모에 flex가 없으면 자식의 flex는 무의미
<View>
  <View style={{ flex: 1 }}>내용</View>
</View>

// ✅ 부모에 flex가 있어야 자식의 flex가 작동
<View style={{ flex: 1 }}>
  <View style={{ flex: 1 }}>내용</View>
</View>
```

---

## 🎯 정리

| 항목 | 기존 | 수정 후 |
|------|------|---------|
| SafeAreaView 스타일 | 없음 | `flex: 1` |
| 중첩 View | 있음 (불필요) | 제거 |
| 레이아웃 | 깨짐 | 정상 |

> 💡 **교훈**: React Native에서 레이아웃이 깨지면, 부모 컴포넌트에 `flex: 1`이 
> 제대로 설정되어 있는지 **위에서부터 아래로** 확인하세요!

---

## 🖼️ Image 컴포넌트의 `resizeMode` Props

이미지가 지정된 크기(width, height)에 맞지 않을 때 **어떻게 조정할지** 결정하는 속성입니다.

### 📋 resizeMode 옵션 비교

| 옵션 | 설명 | 특징 |
|------|------|------|
| **`cover`** | 비율 유지하며 **영역을 완전히 채움** | 이미지 일부가 잘릴 수 있음 (기본값) |
| **`contain`** | 비율 유지하며 **이미지 전체가 보이게** | 여백이 생길 수 있음 |
| **`stretch`** | 비율 무시하고 **영역에 맞게 늘림** | 이미지가 왜곡될 수 있음 |
| **`center`** | 원본 크기 유지, **중앙 배치** | 이미지가 영역보다 크면 잘림 |
| **`repeat`** | 원본 크기로 **타일처럼 반복** | iOS만 지원 |

### 🎨 시각적 비교

원본 이미지: 400x200 (가로가 긴 이미지)  
표시 영역: 200x200 (정사각형)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   cover              contain            stretch           center│
│  ┌──────┐           ┌──────┐           ┌──────┐         ┌──────┐│
│  │██████│           │      │           │██████│         │ ████ ││
│  │██████│           │██████│           │██████│         │ ████ ││
│  │██████│           │██████│           │██████│         │ ████ ││
│  │██████│           │      │           │██████│         │ ████ ││
│  └──────┘           └──────┘           └──────┘         └──────┘│
│  이미지 잘림         여백 있음          비율 왜곡         원본 크기 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 💻 사용 예시

```tsx
// 기본값 (cover)
<Image source={require('./image.png')} style={{ width: 200, height: 200 }} />

// contain - 이미지 전체가 보이도록
<Image 
  source={require('./image.png')} 
  style={{ width: 200, height: 200 }}
  resizeMode="contain"
/>

// center - 원본 크기로 중앙에 배치
<Image 
  source={require('./image.png')} 
  style={{ width: 200, height: 200 }}
  resizeMode="center"
/>
```

### 🎯 언제 어떤 옵션을 사용할까?

| 상황 | 권장 옵션 |
|------|----------|
| 배경 이미지, 프로필 사진 | `cover` |
| 로고, 아이콘 (전체가 보여야 함) | `contain` |
| 특정 영역에 꽉 채워야 함 | `stretch` |
| 이미지 원본 크기 유지 | `center` |
| 패턴, 텍스처 | `repeat` (iOS) |

### ⚠️ 주의사항

```tsx
// ❌ resizeMode="center"는 이미지가 영역보다 크면 잘림
<Image 
  source={require('./large_image.png')}  // 1000x1000px 이미지
  style={{ width: 100, height: 100 }}
  resizeMode="center"  // 이미지 중앙 100x100만 보임
/>

// ✅ 이미지 전체를 보려면 contain 사용
<Image 
  source={require('./large_image.png')}
  style={{ width: 100, height: 100 }}
  resizeMode="contain"  // 전체 이미지가 축소되어 보임
/>
```

---

## 📱 `@2x`, `@3x` 이미지 해상도

React Native는 디바이스 화면 밀도에 따라 자동으로 적절한 해상도의 이미지를 선택합니다.

### 파일 명명 규칙

```
assets/images/
├── icon.png        ← 1x 해상도 (저해상도 기기)
├── icon@2x.png     ← 2x 해상도 (중해상도 기기)
└── icon@3x.png     ← 3x 해상도 (고해상도 기기)
```

### 실제 이미지 크기 예시

화면에 **100x100**으로 표시할 이미지:

| 파일 | 실제 픽셀 크기 | 대상 기기 |
|------|---------------|----------|
| `icon.png` | 100x100px | 저해상도 |
| `icon@2x.png` | 200x200px | Retina (iPhone 6~8) |
| `icon@3x.png` | 300x300px | Super Retina (iPhone X+), 고해상도 Android |

### 사용법

```tsx
// circle.png만 지정하면 자동으로 적절한 해상도 선택
<Image 
  source={require('./circle.png')} 
  style={{ width: 100, height: 100 }}
/>
```

> 💡 **팁**: 고해상도 이미지(`@3x`)가 선택되어도 화면에 표시되는 **논리적 크기**는 
> 스타일에서 지정한 크기(100x100)로 동일합니다. 더 큰 이미지를 사용해서 **선명하게** 보이는 것!
