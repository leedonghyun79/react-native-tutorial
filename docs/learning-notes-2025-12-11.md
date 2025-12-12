# React Native 학습 노트 (2025-12-11)

## 1. VS Code 코드 포맷팅 단축키 (macOS)

| 기능 | 단축키 |
|------|--------|
| 전체 문서 포맷 | `Shift + Option + F` |
| 선택 영역만 포맷 | `Cmd + K`, `Cmd + F` |

### 자동 포맷 설정
```json
{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true
}
```

---

## 2. Expo Router 헤더 숨기기

상단에 페이지 이름(index)이 표시되는 것을 숨기려면:

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

---

## 3. TypeScript에서 defaultProps 설정 (권장 방법)

`defaultProps`는 React 18부터 **deprecated**됨. 기본 매개변수 사용 권장!

### ❌ 이전 방식 (deprecated)
```tsx
function Greeting({ name }: { name: string }) { ... }

Greeting.defaultProps = {
    name: "미지정"
}
```

### ✅ 권장 방식
```tsx
type GreetingProps = {
    name?: string;  // optional로 설정
}

function Greeting({ name = "미지정" }: GreetingProps) { ... }
```

---

## 4. React Native에서 개행/간격 만들기

React Native에서는 HTML `<br />` 태그 사용 불가!

### 대안 방법

**방법 1: margin 사용**
```tsx
<Box style={{ marginTop: 10 }} />
```

**방법 2: 빈 View 사용**
```tsx
<View style={{ height: 10 }} />
```

---

## 5. 컴포넌트에 style prop 타입 지정

외부에서 style을 전달받으려면 `StyleProp<ViewStyle>` 타입 사용:

```tsx
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type BoxProps = {
    rounded?: boolean;
    style?: StyleProp<ViewStyle>;  // 👈 스타일 타입
}

export default function Box({ rounded, style }: BoxProps) {
    return (
        // 내부 스타일과 외부 스타일을 배열로 병합
        <View style={[styles.box, rounded && styles.rounded, style]} />
    );
}
```

### 스타일 타입 종류

| 타입 | 설명 |
|------|------|
| `ViewStyle` | 단일 스타일 객체 |
| `TextStyle` | Text 컴포넌트용 스타일 |
| `StyleProp<T>` | 스타일 객체, 배열, undefined 모두 허용 (권장) |

---

## 6. Union 타입으로 prop 값 제한하기

특정 값만 허용하려면 Union 타입 사용:

```tsx
type BoxProps = {
    size?: "small" | "medium" | "large";  // 👈 세 가지 값만 허용
}

export default function Box({ size = 'medium' }: BoxProps) {
    return (
        <View style={[styles.box, styles[size]]} />
    );
}

const styles = StyleSheet.create({
    box: { ... },
    small: { width: 32, height: 32 },
    medium: { width: 64, height: 64 },
    large: { width: 128, height: 128 },
});
```

### 동적 스타일 접근
`styles[size]`처럼 **대괄호 표기법**으로 동적으로 스타일 선택 가능!

---

## 7. props로 인라인 스타일 적용하기

색상처럼 다양한 값이 필요한 경우 인라인 스타일 사용:

```tsx
type BoxProps = {
    color?: string;
}

export default function Box({ color = 'black' }: BoxProps) {
    return (
        <View style={[styles.box, { backgroundColor: color }]} />
    );
}
```

### 사용 예시
```tsx
<Box color="pink" />
<Box color="#FF5733" />
<Box color="rgb(100, 200, 150)" />
```

---

## 8. 스타일 파일 분리

스타일을 별도 파일로 분리해서 관리 가능:

```ts
// Box.styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    box: { ... },
    rounded: { ... },
});
```

```tsx
// Box.tsx
import { styles } from './Box.styles';

export default function Box() {
    return <View style={styles.box} />;
}
```

### 장점
- 컴포넌트 파일이 간결해짐
- 스타일 재사용 용이
- 큰 프로젝트에서 관리 편함

---

## 핵심 정리

- React Native ≠ 웹. HTML 태그 사용 불가
- 레이아웃은 Flexbox + 스타일로 처리
- TypeScript에서는 기본 매개변수 방식 권장
- 스타일 병합은 배열 `[style1, style2]` 사용
- Union 타입으로 허용 값 제한 가능
- 동적 스타일은 `styles[변수]` 형태로 접근
- 스타일 파일 분리로 코드 정리 가능
