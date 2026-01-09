# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

Expo Router를 사용하여 구축된 커뮤니티 플랫폼 React Native 모바일 애플리케이션입니다. 사용자는 이미지와 투표가 포함된 게시글을 작성하고, 댓글을 달고, 아바타를 커스터마이징하며, 다른 사용자의 콘텐츠와 상호작용할 수 있습니다. 앱은 다국어 지원(한국어, 영어)과 푸시 알림 기능을 포함합니다.

## 명령어

### 개발

```bash
npx expo start              # 개발 서버 시작
npm run android             # Android 에뮬레이터에서 실행
npm run ios                 # iOS 시뮬레이터에서 실행
npm run web                 # 웹 버전 실행
npm run lint                # ESLint 실행
```

### 빌드

```bash
# EAS Build 설정은 eas.json에 정의되어 있음
# 빌드: development (internal), preview (internal), production (auto-increment)
```

## 아키텍처

### 라우팅

- **Expo Router v6** 사용, 파일 기반 라우팅 및 타입 라우팅 활성화
- `app/_layout.tsx`의 루트 레이아웃이 앱을 Provider로 감쌈 (QueryClient, ActionSheet)
- 주요 네비게이션 구조:
  - `(tabs)/` - 메인 탭 네비게이션 (홈, 내 프로필, 설정)
  - `auth/` - 인증 화면 (로그인, 회원가입)
  - `post/` - 게시글 화면 (작성, 수정, 상세)
  - `profile/` - 사용자 프로필 화면
  - `image/` - 이미지 뷰어 화면
- `unstable_settings`를 통해 앵커 탭이 `(tabs)`로 설정됨

### 상태 관리

- 서버 상태 관리를 위한 **TanStack Query (React Query)**
- `api/queryClient.ts`에서 쿼리 클라이언트 설정
- `hooks/queries/`의 커스텀 훅이 모든 데이터 페칭과 뮤테이션을 캡슐화
- `useAuth` 훅을 통한 인증 상태 관리:
  - 마운트 시 사용자 프로필 페치
  - Secure storage에서 액세스 토큰 관리
  - axios 인스턴스의 Authorization 헤더 설정/제거
  - 로그인/로그아웃/회원가입 플로우 처리

### API 레이어

- `api/axios.ts`에서 플랫폼별 base URL로 Axios 인스턴스 설정
- 도메인별로 구성된 API 모듈: `auth.ts`, `post.ts`, `comment.ts`, `avatar.ts`, `image.ts`
- 모든 API 함수는 async/await를 사용하며 타입이 지정된 응답 반환
- 인증 성공 후 `utils/header.ts`를 통해 Authorization 헤더가 전역으로 설정됨

### 데이터 페칭 패턴

- 페이지네이션된 목록을 위한 무한 스크롤 쿼리 (예: `useGetInfinitePosts`, `useGetInfiniteSearchPosts`)
- React Query 캐시 조작을 사용한 좋아요/투표 뮤테이션의 낙관적 업데이트
- 캐시 무효화를 위해 `constants/`에 정의된 쿼리 키

### 다국어 지원 (i18n)

- 번역을 위한 **i18next**와 React i18next
- `i18n/resources.ts`에 정의된 리소스 (한국어, 영어)
- `expo-localization`을 통한 디바이스 언어 감지
- Secure storage에 저장된 사용자 언어 설정
- Day.js 로케일이 선택된 언어와 동기화됨

### 타입 시스템

- TypeScript strict 모드 활성화
- `types/index.ts`의 전역 타입: `User`, `Profile`, `Post`, `Comment`, `Vote`, DTO들
- Path alias `@/*`가 프로젝트 루트에 매핑됨

### 컴포넌트 구조

- `components/` 디렉토리의 재사용 가능한 컴포넌트들:
  - Form inputs: `EmailInput`, `PasswordInput`, `NicknameInput` 등
  - Domain components: `FeedItem`, `CommentItem`, `Vote`, `Profile` 등
  - List components: `FeedList`, `MyFeedList`, `LikedFeedList`, `SearchFeedList`
  - Utility components: `CustomButton`, `FixedBottomCTA`, `AuthRoute`

### Secure Storage

- 민감한 데이터(액세스 토큰, 언어 설정)를 위한 `expo-secure-store`
- `utils/secureStore.ts`의 유틸리티 함수: `saveSecureStore`, `getSecureStore`, `deleteSecureStore`

### 푸시 알림

- `expo-notifications`로 설정
- 로그인 시 푸시 토큰 전송 (`postLogin`이 `expoPushToken` 파라미터 허용)
- 포그라운드 알림을 위해 `app/_layout.tsx`에 알림 핸들러 설정
- `hooks/`의 커스텀 훅 `usePushNotification`

### 스타일링

- 커스텀 폰트: Pretendard (루트 레이아웃에서 로드)
- React Native의 StyleSheet API 사용
- Expo의 새로운 아키텍처 활성화 (`newArchEnabled: true`)
- Android에서 Edge-to-edge 모드 활성화

## 주요 구현 사항

1. **인증 플로우**: Secure storage를 사용한 토큰 기반 인증. 앱 시작 시 `useGetMe`가 저장된 토큰으로 사용자 프로필을 가져오려고 시도. 성공하면 헤더 설정, 실패하면 토큰 제거 및 인증 쿼리 리셋.

2. **API Base URLs**: `api/axios.ts`에서 플랫폼별 URL로 설정됨. 현재 로컬 네트워크 IP로 설정되어 있음 - 프로덕션이나 개발 머신 변경 시 업데이트 필요.

3. **쿼리 캐시 관리**: 게시글 뮤테이션은 관련 쿼리 캐시를 무효화함 (예: 게시글 작성 후 게시글 목록 무효화). 좋아요/투표 뮤테이션은 즉각적인 UI 피드백을 위해 낙관적 업데이트 사용.

4. **이미지 처리**: 최적화된 이미지 로딩을 위해 `expo-image` 사용, 이미지 선택을 위해 `expo-image-picker` 사용. 이미지 업로드 API는 `api/image.ts`에 있음.

5. **폼 검증**: 폼 상태 관리 및 검증을 위해 `react-hook-form` 사용.

6. **토스트 알림**: 성공/에러 피드백을 위한 `react-native-toast-message`, 루트 레이아웃에서 전역으로 설정됨.

7. **아바타 시스템**: 프로필에 저장된 파츠(모자, 얼굴, 상의, 하의, 손, 피부)로 커스터마이징 가능한 사용자 아바타. 아바타 아이템은 `useGetAvatarItems`를 통해 페치됨.
