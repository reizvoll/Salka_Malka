# index
- [프로젝트명-살까말까](#프로젝트명-살까말까)
- [페이지 구성](#페이지-구성)
- [페이지별 레이아웃과 기능](#페이지별-레이아웃과-기능)
- [요구사항](#요구사항)

<br><br>

# 프로젝트명 살까말까

왜 밖에서는 유용하고 저렴해보였던 물건이 우리 집에만 오면 예쁜 쓰레기가 될까요?

조금 더 현명하게 소비를 할 수는 없을까요?

웹사이트 살까말까에서 소소한 물건들을 리뷰하고, 다른 사람들의 사용기를 확인해보세요!

<br><br>

# 팀원  
| 임지영                                                                             |                                          김현지                                           | 박산하                                                                                                                            | 박상기                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 원윤선                                                                             |
| ------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/183330068?v=4" width='150px'> | <img alt="김현지" src="https://avatars.githubusercontent.com/u/86361624?v=4" width="150"> | <img src="https://velog.velcdn.com/images/heftycornerstone/post/ebfbdc61-d67f-4112-9d84-a3e548afc94e/image.jpg" width='150px'> | <img src="https://file.notion.so/f/f/29d745c5-eb8f-4066-969a-f5cbe15e3dff/fda70465-cea3-4c5a-9754-5a041ca74661/%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5_3.png?table=block&id=145d2223-d746-802a-935b-deaeb54ab1b0&spaceId=29d745c5-eb8f-4066-969a-f5cbe15e3dff&expirationTimestamp=1732248000000&signature=BhI6w07-iyfBWodCYv8z7Bgv8POMVf2HEEcbyhcva9o&downloadName=%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5+3.png" width='150px'> | <img src="https://avatars.githubusercontent.com/u/128468243?v=4" width='150px'> |
| 팀장                                                                              |                                           팀원                                           | 팀원                                                                                                                             | 팀원                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 팀원                                                                              |
| [reizvoll](https://github.com/reizvoll)                                         |                         [hyeonjy](https://github.com/hyeonjy)                          | [heftyCornerstone](https://github.com/heftyCornerstone)                                                                        | [hadorable-otter](https://github.com/adorable-otter/new-world)                                                                                                                                                                                                                                                                                                                                                                                                 | [WonYunSun](https://github.com/WonYunSun)                                       |
| 로고, <br>로그인 기능                                                                  |                                   게시물, 댓글 <br>상세페이지                                    | 검색, 마이페이지, <br>리드미                                                                                                             | 좋아요, 좋아요 목록, <br>댓글, 댓글 UI                                                                                                                                                                                                                                                                                                                                                                                                                                         | 게시물, 상세페이지, <br>사이드바       

<br><br>

# 기술 스택

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/redux%20toolkit-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/redux%20persist-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

<br>

### 그 외 라이브러리
- toastify
- react-hook-form
- slick-carousel

<br><br>

# 페이지 구성

<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/a0d06574-99a8-401e-8a52-327f05ccfd46/image.png' width='40%'></p>

[와이어프레임 링크](https://www.figma.com/design/1aSF8mxFykYiRjT4XYY4KI/NewsFeed_Project?node-id=0-1&node-type=canvas&t=ON4y1UuHmuRRrF9x-0)

<br><br>

# 페이지별 레이아웃과 기능

## 비로그인

### 로그인 / 회원 가입
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/9c5a699d-c8bc-41ff-9a17-76a477f933db/image.png' width='40%'></p>
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/91089aec-2c64-4f9f-ba17-7a2b27e5987a/image.png' width='40%'></p>

- 로그인하지 않은 사용자는 로그인 페이지로 이동됩니다. **로그인 한 사용자만 홈페이지에 접근할 수 있습니다.**
- 로그인 페이지에서 회원 가입, 비밀번호 찾기, 계정 삭제 페이지에 접근할 수 있습니다.
- 회원가입 시 이메일을 아이디로 사용하며 닉네임과 프로필 사진을 설정할 수 있습니다.
	- 프로필 사진을 등록하지 않을 시 기본 이미지가 자동 적용됩니다.

<br><br>

## 로그인 성공
### 홈
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/63de1518-39b3-464b-8c31-afd481192e94/image.png' width='60%'></p>

- 홈 페이지에서 게시글을 최신순으로 볼 수 있습니다.
- 내비게이션 바를 이용해 다른 페이지로 접근 가능합니다.

<br>

### 게시글 상세
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/4cf3aad1-39e7-4172-9556-cc63607420f8/image.gif' width='60%'></p>

- 게시글 카드를 클릭하면 상세 페이지로 이동합니다.
- 글 제목과 본문, 사진, 작성자와 작성 시각 그리고 **댓글과 좋아요**를 확인할 수 있습니다.
- 글에 첨부 된 사진이 여러장일 경우 **슬라이드**하여 볼 수 있습니다.

#### 그 외 기능
- 게시글 수정 및 삭제
- 좋아요와 좋아요 취소
- 댓글 쓰기
	- 댓글 게시자는 수정 및 삭제 가능

<br>

#### 게시글 수정 및 삭제
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/db63c66c-ede2-4d89-9897-83c840625f3c/image.gif' width='60%'></p>

- 자신이 작성한 게시글만 수정 및 삭제할 수 있습니다.

<br>

### 검색
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/e204937d-fd3a-4a49-bf99-399e54c17269/image.gif' width='60%'></p>

- 실시간 검색이 가능하며, 오래된 순서와 최신 순서로 검색 결과를 정렬할 수 있습니다.

<br>

### 내 글 / 좋아요를 누른 글
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/b56a5d1a-5c19-4310-8ac0-8059a1edd787/image.gif' width='60%'></p>
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/66082a60-45ec-486b-b4b8-c33f6c590cc4/image.gif' width='60%'></p>

- 내가 작성한 글과 좋아요를 누른 글을 확인할 수 있습니다.

<br>

### 글 작성
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/8c964b80-1db1-4584-aea6-9b2ebd87e308/image.gif' width='60%'></p>

- 작성글에는 이미지를 최대 3장까지 삽입할 수 있습니다.
- 글자 수는 10자 이상이어야 합니다.
- 글 작성을 완료하면 내가 작성한 글의 상세 페이지로 리디렉션됩니다.

<br>

### 마이 페이지
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/9eb244d8-673e-4ea9-9ce6-b1237f5d377c/image.png' width='60%'></p>

- 프로필 이미지와 이름을 수정할 수 있습니다.
- 비밀번호 변경, 계정 삭제 페이지로 이동하는 버튼이 있습니다.
- 로그아웃은 마이페이지에서 할 수 있습니다.

#### 비밀번호 변경과 회원 탈퇴
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/08fda750-eb18-4935-9261-65a7ca1483f4/image.png' width='50%'></p>
<p align='center'><img src='https://velog.velcdn.com/images/heftycornerstone/post/6f3d4009-0a4c-4f02-ad3c-b780f78ae413/image.png' width='50%'></p>

- 아이디로 사용하고 있는 이메일 주소로 비밀번호 재설정 메일을 보낼 수 있습니다.

<br><br>

# 요구사항

## 필수기능

**데이터베이스**
- [x] Supabase를 활용한 CRUD
- [x] Supabase를 활용한 로그인, 회원 가입

**유저 로그인 정보 관리**
- [x] onAuthStateChanged를 적극 활용하여 인증된 유저의 상태 변경 추적
- [x]  Context API를 활용한(혹은 다른 전역상태 툴을 이용한) 전역상태 관리

**라우팅**
- [x]  RRD(React Router DOM)

 **마이 페이지에서...**
- [x] 내 게시물 보기
- [x] 프로필 수정 기능

**배포**
- [x] 호스팅플랫폼 Vercel 이용, 배포에 적용될 브랜치는 main 브랜치로

## 도전기능
- [x] 로그인, 회원가입 예외 처리
- [ ] 소셜 로그인 (구글, 깃헙)
- [x] 비밀번호 찾기 기능
- [ ] 팔로우, 팔로워 기능
- [ ] 팔로우한 상대 게시물 확인 기능
- [x] 댓글 기능
- [x] 좋아요, 북마크 기능
- [x] 반응형 웹 구현
- [ ] 무한스크롤 기능
- [ ] 더보기 기능
- [x] memo, useMemo, useCallback을 이용한 렌더링 최적화 적용
- [ ] Vercel 에 배포한 뒤 커스텀 도메인 적용 (500원 정도하는 저렴한 도메인 권장)

<br>

## 기능 구현

#### 필수 요구사항 구현에 관한 특이사항

- 내 게시물 보기 기능은 마이페이지가 아닌 `내 글` 페이지로 구현
- 전역상태관리를 위해 `RTK`를 사용

#### 로그인 정보 유지

- 새로고침하거나 브라우저를 닫아도 로그인 정보를 유지하기 위해 `redux-persist`를 사용했습니다.

#### alret 처리 ([**React-Toastify**](https://fkhadra.github.io/react-toastify/introduction/))

- `React-Toastify`로 사용자 친화적인 성공 또는 에러 메세지를 보여줍니다

#### react-hook-form
- `react-hook-form`으로 폼 상태를 효율적으로 관리하고 유효성 검사(validation)를 진행합니다

#### slick-carousel
- `slick-carousel`로 게시글에 첨부된 이미지를 슬라이드 할 수 있도록 만들었습니다.
