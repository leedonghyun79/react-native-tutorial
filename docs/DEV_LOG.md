# 개발 작업 로그 (2025-12-18)

## LogContext 타입 에러 수정
**설명**: `LogContext.tsx`에서 발생하는 TypeScript 에러("Type ... is not assignable to type 'never'")를 해결했습니다.
- `Log` 인터페이스를 정의하고, `useState<Log[]>` 제네릭을 사용하여 상태가 `never[]`로 추론되는 문제를 방지했습니다.
- `onCreate` 함수를 Context에 추가하여 로그 생성 로직을 중앙에서 관리하도록 개선했습니다.

## 작성 화면(WriteScreen) 데이터 연동
**설명**: 글 작성 화면에서 입력한 제목과 내용이 저장되지 않는 문제를 해결했습니다.
- `WriteEditor` 컴포넌트의 props 오타(`onChage` -> `onChange`)를 수정했습니다.
- `WriteScreen`에서 관리하는 `title`, `body` 상태와 `setTitle`, `setBody` 함수를 `WriteEditor`로 올바르게 전달하여 양방향 바인딩을 구현했습니다.

## 초기 탭 화면 설정 (Feed 탭 기본 설정)
**설명**: 앱 실행 시 Calendar 탭이 아닌 Feed 탭이 먼저 나오도록 수정했습니다.
- 원인: `(calendar)`, `(feed)`, `(search)` 폴더가 모두 `index.tsx`를 가지고 있어 루트 경로(`/`) 충돌이 발생했고, 알파벳순으로 Calendar가 우선시되었습니다.
- 해결: `(calendar)/index.tsx`를 `calendar.tsx`로, `(search)/index.tsx`를 `search.tsx`로 변경하여 Feed 탭만 유일하게 `index` 경로를 갖도록 구조를 변경했습니다.
