# 독서 진행 상황 API 연동 가이드

## 개요

독서 진행 상황을 기반으로 다음에 읽을 요약(seq)을 결정하는 방법을 설명합니다.

## 구현된 기능

1. **`bookApi.getReadingProgress(bookId)`**: 독서 진행 상황 조회 API
2. **`useBookDetail` 훅**: 독서 진행 상황을 관리하는 커스텀 훅
3. **`BookDetailPage`**: 독서 진행 상황을 사용하여 다음 seq 결정

## API 응답 형식

### 독서 진행 상황 API 응답 예시

```json
{
  "bookId": 1,
  "nextSeq": 2,
  "completedSeqs": [1],
  "currentDay": 1,
  "totalDays": 3
}
```

### 책 정보 API에 포함된 경우

책 정보 API(`/api/book/{bookId}`) 응답에 독서 진행 상황이 포함될 수 있습니다:

```json
{
  "bookId": 1,
  "title": "데미안",
  "author": "헤르만 헤세",
  "day": 1,
  "nextSeq": 2,
  "completedSeqs": [1],
  "totalDays": 3,
  ...
}
```

## 실제 API 연동 방법

### 방법 1: 책 정보 API에 독서 진행 상황이 포함된 경우

`src/api/bookApi.js`의 `getBook` 함수에서 이미 독서 진행 상황을 받아오는 경우, 추가 작업이 필요 없습니다.

`src/features/book/hooks/useBookDetail.js`의 `fetchReadingProgress` 함수에서 이미 처리하고 있습니다:

```javascript
// 방법 1: bookData에 독서 진행 상황이 포함된 경우
if (bookData?.nextSeq !== undefined) {
  setReadingProgress({
    nextSeq: bookData.nextSeq,
    completedSeqs: bookData.completedSeqs || [],
    currentDay: bookData.day || 1,
    totalDays: bookData.totalDays || 3,
  });
}
```

### 방법 2: 별도의 독서 진행 상황 API 사용

별도의 API 엔드포인트(`/api/book/{bookId}/progress`)가 있는 경우:

1. **`src/api/bookApi.js`** 수정:
   ```javascript
   getReadingProgress: async (bookId) => {
     try {
       const response = await axios.get(`${API_BASE_URL}/book/${bookId}/progress`);
       return response.data;
     } catch (error) {
       console.error('Failed to fetch reading progress:', error);
       throw error;
     }
   },
   ```

2. **`src/features/book/hooks/useBookDetail.js`** 수정:
   ```javascript
   // 방법 2: 별도 API 호출 (실제 API 연동 시 주석 해제)
   else {
     const progress = await bookApi.getReadingProgress(bookId);
     setReadingProgress(progress);
   }
   ```

### 방법 3: day 값으로부터 추론 (임시 방법)

현재 구현된 방식으로, `day` 값과 `seq`가 1:1 매핑된다고 가정합니다:

- day 1 → seq 1 완료, 다음은 seq 2
- day 2 → seq 1,2 완료, 다음은 seq 3
- day 3 → seq 1,2,3 완료, 다음은 seq 4

이 방법은 `src/features/book/hooks/useBookDetail.js`에 이미 구현되어 있습니다.

## 사용 방법

### BookDetailPage에서 사용

```javascript
const { readingProgress } = useBookDetail();

const handleRead = () => {
  if (bookData?.bookId) {
    // 독서 진행 상황에서 다음에 읽을 seq 가져오기
    const seq = readingProgress?.nextSeq || 1;
    navigate(`/reader/${bookData.bookId}/${seq}`);
  }
};
```

## API 연동 체크리스트

실제 API 연동 시 다음 사항을 확인하세요:

- [ ] `API_BASE_URL` 환경 변수 설정
- [ ] `bookApi.getReadingProgress` 주석 해제 및 실제 API 호출 코드 활성화
- [ ] `useBookDetail` 훅에서 올바른 방법 선택 (방법 1 또는 방법 2)
- [ ] API 응답 형식이 예상과 일치하는지 확인
- [ ] 에러 처리 로직 확인
- [ ] 로딩 상태 처리 확인

## 참고사항

- `nextSeq`가 없거나 에러 발생 시 기본값 `1`을 사용합니다
- 독서 진행 상황은 `bookData`가 로드된 후에 조회됩니다
- 독서 진행 상황이 변경되면 자동으로 업데이트됩니다

