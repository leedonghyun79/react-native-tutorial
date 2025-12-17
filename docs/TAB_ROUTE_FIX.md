# 탭 라우팅 충돌 해결 (Tab Route Conflict Fix)

## 문제점 (Issue)
`_layout.tsx`에서 Feed 탭을 가장 먼저 정의했음에도 불구하고, 앱 실행 시 "Calendar" 탭이 초기 화면으로 나타나는 문제가 발생했습니다.

## 원인 (Cause)
Expo Router는 파일 시스템 기반 라우팅을 사용합니다. 프로젝트 구조는 다음과 같았습니다:
- `app/(tabs)/(calendar)/index.tsx`
- `app/(tabs)/(feed)/index.tsx`
- `app/(tabs)/(search)/index.tsx`

이 세 파일 모두 Group 폴더 내에 `index.tsx`라는 이름으로 존재하여, 라우터 입장에서 모두 루트 경로 `/`로 매핑되었습니다. 동일한 경로에 여러 파일이 매핑될 경우, 라우터는 알파벳 순서에 따라 `(calendar)`를 우선순위로 선택하여 Calendar 탭이 기본 화면이 되었습니다.

## 해결 방법 (Solution)
`(calendar)`와 `(search)` 그룹 내의 `index.tsx` 파일 이름을 고유한 이름으로 변경하여 서로 다른 경로를 갖도록 수정했습니다.

1.  **이름 변경**: `app/(tabs)/(calendar)/index.tsx` → `app/(tabs)/(calendar)/calendar.tsx`
    -   새로운 경로: `/calendar`
2.  **이름 변경**: `app/(tabs)/(search)/index.tsx` → `app/(tabs)/(search)/search.tsx`
    -   새로운 경로: `/search`
3.  **유지**: `app/(tabs)/(feed)/index.tsx`
    -   경로: `/` (유일한 인덱스 경로로 남음)

## 코드 변경 (Code Changes)
`app/(tabs)/_layout.tsx` 파일에서 경로 참조를 다음과 같이 업데이트했습니다:

```tsx
<Tabs.Screen
  name="(calendar)/calendar" // (calendar)/index 에서 변경됨
  // ...
/>
<Tabs.Screen
  name="(search)/search" // (search)/index 에서 변경됨
  // ...
/>
```

## 결과 (Result)
앱 실행 시 라우터가 `(feed)/index`만을 유일한 루트 경로(`/`)로 인식하게 되어, 의도한 대로 Feed 탭이 초기 화면으로 나타납니다.
