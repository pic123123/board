- [x] DB 스키마 생성 스크립트  
       board.entity.ts

- [x] 게시글 작성 API  
       `POST http://localhost:4000/board/write`  
       Request

```json
{
  "title": "오늘은 뭐 먹을까?",
  "content": "토요일 아침은 양갈비, 점심은 알탕, 저녁은 뽈살 먹어야지~~",
  "writer": "짬뽕이랑 뽕이는 귀여워",
  "password": "1234"
}
```

- [x] 게시글 수정 API  
       `POST http://localhost:4000/board/update`  
       Request

```json
{
  "id": 14,
  "title": "오늘은 뭐 먹을까?",
  "content": "토요일 아침은 양갈비",
  "writer": "짬뽕이랑 뽕이는 귀여워",
  "password": "1234"
}
```

- [x] 게시글 삭제 API  
       ` POST http://localhost:4000/board/delete`  
       Request

```json
{
  "id": 14,
  "title": "오늘은 뭐 먹을까?",
  "content": "토요일 아침은 양갈비",
  "writer": "짬뽕이랑 뽕이는 귀여워",
  "password": "1234"
}
```

- [x] 게시글 목록 API  
       `GET http://localhost:4000/board/search?searchType=TITLE&searchValue=강아&nowPage=1&viewCount=3`

- searchType은 검색 타입입니다. TITLE | WRITER (제목이나 작성자중 무엇을 검색 할 지 선택 해야 합니다.)
- searchValue는 검색하고자 하는 키워드 입니다.
- nowPage는 페이징 처리 기능입니다. 숫자로 1,2,3,4,5 ... 등을 입력 할 수 있습니다.
- viewCount는 반환될 총 게시물 갯수를 의미합니다.

- 게시글 목록 API는 GET 방식으로 위의 URL이 곧 Request 입니다.
- 아래는 이 API를 호출시 반환되는 전문입니다.
- Response

```json
{
  "success": true,
  "result": [
    {
      "id": 9,
      "createdAt": "2022-06-17T20:13:53.593Z",
      "updatedAt": "2022-06-17T20:13:53.593Z",
      "title": "강아지는 너무 이뻐요",
      "content": "모두 그렇게 생각하지 않나요?",
      "writer": "강아지사랑",
      "password": "n5Aj1ohlFOSlfjv/0SpL9yGGciWm8MjAFeIKjOAsdjrlg+ljDSa4bCpfqPBaqdjhlcUguORRYJSRS5y8hbJYJQ=="
    },
    {
      "id": 10,
      "createdAt": "2022-06-17T20:54:53.031Z",
      "updatedAt": "2022-06-17T20:54:53.031Z",
      "title": "제목강아지에요",
      "content": "모두 그렇게 생각하지 않나요?",
      "writer": "달려라참깨",
      "password": "n5Aj1ohlFOSlfjv/0SpL9yGGciWm8MjAFeIKjOAsdjrlg+ljDSa4bCpfqPBaqdjhlcUguORRYJSRS5y8hbJYJQ=="
    },
    {
      "id": 11,
      "createdAt": "2022-06-17T20:55:10.080Z",
      "updatedAt": "2022-06-17T20:55:10.080Z",
      "title": "강아지가뭐야",
      "content": "모두 그렇게 생각하지 않나요?",
      "writer": "고양이작성자입니다",
      "password": "n5Aj1ohlFOSlfjv/0SpL9yGGciWm8MjAFeIKjOAsdjrlg+ljDSa4bCpfqPBaqdjhlcUguORRYJSRS5y8hbJYJQ=="
    }
  ],
  "count": 3
}
```

- [x] 댓글 목록 API
      `http://localhost:4000/board/comment-search?nowPage=1&viewCount=3`

```json
{
  "success": true,
  "result": [
    {
      "id": 1,
      "boardId": 7,
      "parentId": null,
      "createdAt": "2022-06-19T14:57:08.463Z",
      "content": "테스트 댓글이에요",
      "writer": "댓글담당"
    },
    {
      "id": 2,
      "boardId": 7,
      "parentId": null,
      "createdAt": "2022-06-19T15:23:29.237Z",
      "content": "테스트 댓글이에요",
      "writer": "댓글담당22222"
    },
    {
      "id": 7,
      "boardId": 7,
      "parentId": 5,
      "createdAt": "2022-06-19T16:00:36.328Z",
      "content": "테스트 51235121233",
      "writer": "댓글담당22222"
    }
  ],
  "count": 3
}
```

- [x] 댓글 작성 API
      `http://localhost:4000/board/comment-write`

- 댓글작성시

```json
{
  "boardId": 7,
  "writer": "댓글담당",
  "content": "테스트 댓글이에요"
}
```

- 대댓글 작성시

```json
{
  "boardId": 7,
  "writer": "댓글담당22222",
  "content": "테스트 51235121233",
  "commentId": 5
}
```

- [x] 게시물 또는 댓글 등록시 알림 기능
- 게시글 및 코멘트 등록시 알림보내는 함수 호출, 기능은 미구현
