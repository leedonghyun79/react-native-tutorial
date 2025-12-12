# 🤖 Android 에뮬레이터 트러블슈팅 가이드

> Expo 프로젝트에서 Android 에뮬레이터 관련 문제 해결 방법

---

## ❌ 발생하는 에러

```
Error: It took too long to start the Android emulator: Pixel_9. 
You can try starting the emulator manually from the terminal with: 
C:\Users\skybl\AppData\Local\Android\Sdk/emulator/emulator @Pixel_9
```

---

## ✅ 해결 방법

### 방법 1: 에뮬레이터 수동 실행 (권장)

**Expo 서버를 시작하기 전에** 에뮬레이터를 먼저 실행하세요.

#### 터미널에서 실행:
```bash
"C:\Users\skybl\AppData\Local\Android\Sdk\emulator\emulator" -avd Pixel_9
```

#### 스냅샷 문제가 있는 경우:
```bash
"C:\Users\skybl\AppData\Local\Android\Sdk\emulator\emulator" -avd Pixel_9 -no-snapshot-load
```

### 방법 2: Android Studio에서 실행

1. **Android Studio** 실행
2. 상단 메뉴에서 **Tools** → **Device Manager** 선택
3. **Pixel_9** 옆의 ▶️ 재생 버튼 클릭
4. 에뮬레이터가 완전히 부팅될 때까지 대기

### 방법 3: Expo 앱 연결

에뮬레이터가 **완전히 부팅**된 후 (Android 홈 화면이 보이면):

1. `yarn start` 또는 `npx expo start` 실행
2. 터미널에서 **`a`** 키를 눌러 Android 앱 실행

---

## 🛠️ 유용한 에뮬레이터 명령어

### 사용 가능한 에뮬레이터 목록 확인
```bash
"C:\Users\skybl\AppData\Local\Android\Sdk\emulator\emulator" -list-avds
```

### ADB 디바이스 연결 상태 확인
```bash
adb devices
```

### 에뮬레이터 강제 종료
```bash
adb emu kill
```

---

## ⚡ 에뮬레이터 성능 최적화

### 1. HAXM 또는 Hyper-V 확인

Windows에서 하드웨어 가속이 활성화되어 있는지 확인하세요:

- **Intel CPU**: HAXM (Hardware Accelerated Execution Manager) 설치
- **AMD CPU 또는 Windows 11**: Hyper-V 활성화

### 2. Quick Boot 설정

Android Studio에서:
1. **Device Manager** → **Pixel_9** 옆의 ✏️ 편집 버튼 클릭
2. **Show Advanced Settings** 클릭
3. **Emulated Performance** → **Boot option** → **Quick boot** 선택

### 3. 디스크 공간 확보

에뮬레이터는 많은 디스크 공간을 사용합니다. 최소 **10GB** 이상의 여유 공간을 확보하세요.

---

## 🌐 대안: 웹에서 테스트

에뮬레이터 문제가 지속된다면, 웹 브라우저에서 먼저 테스트할 수 있습니다:

```bash
yarn start
# 터미널에서 'w' 키를 눌러 웹 브라우저에서 열기
```

---

## 📱 대안: 실제 기기 사용

1. Android 기기에서 **Expo Go** 앱 설치
2. `yarn start` 실행 후 표시되는 **QR 코드** 스캔
3. 실제 기기에서 앱 테스트

---

> 💡 **팁**: 항상 에뮬레이터를 **먼저 실행**한 후 Expo 서버를 시작하면 
> 대부분의 연결 문제를 예방할 수 있습니다!
