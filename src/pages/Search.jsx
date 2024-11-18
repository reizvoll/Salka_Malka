import React from "react";
import styled from "styled-components";
import searchIconSvg from "../assets/searchIcon.svg";

const SearchResultsSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
`;
const SearchResultsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
`;
const SearchResultsOrderer = styled.select``;

const SearchedPostsBoard = styled.div`
  height: 75vh;
  overflow-y: hidden;
`;
const SearchedPostsBoardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 30px;
  height: 100%;
  overflow-y: scroll;
  /* Hide scrollbar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    /*Chrome, Safari and Opera */
    display: none;
  }
`;

const PostCard = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  width: 500px;
`;

const PostCardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const PostCardContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
  width: 100%;
`;
const PostCardContentsInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  width: 100%;
`;

const PostCardTextContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 280px;
`;
const PostCardPreview = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PostCardImgWrapper = styled.div`
  width: 100px;
  background-color: gray;
  img {
    width: 100%;
  }
`;

const PostCardPopularity = styled.div`
  width: 100%;
`;

const PostCardPopularityInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px;
  margin-bottom: 0;
`;

const SearchFormWrapper = styled.div`
  width: 65%;
`;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px;
  margin-top: 50px;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 15px;
  font-size: 15px;
`;
const SearchBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #bfbfbf;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
  img {
    width: 45%;
  }
`;

const SearchPageMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  border: 1px solid gray;
`;

const SearchedPostCard = ({ data }) => {
  const { title, author, contents, img } = data;
  const firstImg = img[0];
  return (
    <PostCard>
      <PostCardInner>
        <PostCardContents>
          <PostCardContentsInner>
            <PostCardTextContents>
              <div>
                <h3>{title}</h3>
                <div>{author}</div>
              </div>
              <PostCardPreview>{contents}</PostCardPreview>
            </PostCardTextContents>

            <PostCardImgWrapper>
              <img src={firstImg} />
            </PostCardImgWrapper>
          </PostCardContentsInner>
        </PostCardContents>

        <PostCardPopularity>
          <PostCardPopularityInner>
            <div>CN</div>
            <div>LN</div>
          </PostCardPopularityInner>
        </PostCardPopularity>
      </PostCardInner>
    </PostCard>
  );
};

const SearchResults = () => {
  const lorem =
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit";
  const postList = [
    { id: 1, title: "title1", author: "author1", contents: lorem, img: [""] },
    { id: 2, title: "title2", author: "author2", contents: lorem, img: [""] },
    { id: 3, title: "title3", author: "author3", contents: lorem, img: [""] },
    { id: 4, title: "title4", author: "author4", contents: lorem, img: [""] },
    { id: 5, title: "title5", author: "author5", contents: lorem, img: [""] },
    { id: 6, title: "title6", author: "author6", contents: lorem, img: [""] },
  ];
  return (
    <SearchResultsSheet>
      <SearchResultsInfo>
        <div>??? 검색결과</div>
        <SearchResultsOrderer name="searchingOrder" id="searchingOrder">
          <option value="newToOld">최신 순서</option>
          <option value="oldToNew">오래된 순서</option>
          <option value="likes">좋아요 갯수</option>
        </SearchResultsOrderer>
      </SearchResultsInfo>

      <SearchedPostsBoard>
        <SearchedPostsBoardInner>
          {postList.map((post) => {
            return <SearchedPostCard key={post.id} data={post} />;
          })}
        </SearchedPostsBoardInner>
      </SearchedPostsBoard>
    </SearchResultsSheet>
  );
};

const SearchingBar = () => {
  return (
    <SearchFormWrapper>
      <SearchForm>
        <SearchInput type="text" />
        <SearchBtn>
          <img src={searchIconSvg} alt="no icon" />
        </SearchBtn>
      </SearchForm>
    </SearchFormWrapper>
  );
};

const Search = () => {
  return (
    <SearchPageMain>
      <SearchingBar />
      <SearchResults />
    </SearchPageMain>
  );
};

export default Search;

/*
기능
-쿼리 보내 데이터 받기
-받은 데이터를 화면에 보이기
*/

/*
UI는 대대적인 수정이 필요해보인다.
UI
-글 항목
메인 페이지, 디테일 페이지 ui 재활용
*/

/*
데이터를 받아오는 곳

글
글 여러개, 댓글은 필요없음
메인, 검색

글 한개, 댓글까지
디테일

프로필
마이페이지

*/
