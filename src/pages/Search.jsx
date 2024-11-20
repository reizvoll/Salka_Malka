import React, { useEffect, useState } from "react";
import styled from "styled-components";
import searchPosts from "../api/SearchPostApi";
import Post from "../components/Post";
import useDebounceSearch from "../hooks/useDebounceSearch";
import { toast } from "react-toastify";

const SearchedPostsBoardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 30px 10px;
  padding-bottom: 5vh;
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
const SearchedPostsBoard = styled.div`
  width: 100%;
  height: 75vh;
  overflow-y: hidden;
`;
const SearchResultsSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70%;
`;

const SearchResultsOrderer = styled.select`
  border: 1px solid gray;
  border-radius: 5px;
  background-color: #7e57ce;
  color: #fff;
  outline: none;
  option {
    background-color: #fff;
    color: black;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 15px;
  font-size: 15px;
`;
const SearchbarWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 65%;
  margin: 20px;
  margin-top: 50px;
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

const SearchResults = ({ searchedData }) => {
  return (
    <SearchResultsSheet>
      <SearchedPostsBoard>
        <SearchedPostsBoardInner>
          {searchedData ? (
            searchedData.map((post) => {
              return <Post key={post.id} post={post} />;
            })
          ) : (
            <div>데이터 없음</div>
          )}
        </SearchedPostsBoardInner>
      </SearchedPostsBoard>
    </SearchResultsSheet>
  );
};

const SearchBar = ({
  searchKeyword,
  handleKeywordChange,
  handleOderingChange,
}) => {
  return (
    <SearchbarWrapper>
      <SearchInput
        type="text"
        placeholder="검색어를 입력해주세요"
        value={searchKeyword}
        onChange={handleKeywordChange}
      />
      <SearchResultsOrderer
        name="searchingOrder"
        id="searchingOrder"
        onChange={handleOderingChange}
      >
        <option value="newToOld">최신 순서</option>
        <option value="oldToNew">오래된 순서</option>
      </SearchResultsOrderer>
    </SearchbarWrapper>
  );
};

const Search = () => {
  const [error, setError] = useState(null);
  const [searchedData, setsearchedData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [ordering, setOrdering] = useState("newToOld");
  const debouncedKeyword = useDebounceSearch(searchKeyword);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts =
          debouncedKeyword !== ""
            ? await searchPosts(debouncedKeyword, ordering)
            : null; // 비동기 데이터 호출
        setsearchedData(posts); // 호출된 데이터 저장
      } catch (err) {
        setError(err.message); // 에러 발생 시 에러 메시지 저장
      }
    };
    fetchData();
  }, [debouncedKeyword, ordering]);

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleOderingChange = (e) => {
    setOrdering(e.target.value);
  };

  if (error) {
    toast.error(`에러가 일어났습니다 : ${error}`);
  } // 에러 발생 시 에러 메시지 표시

  return (
    <SearchPageMain>
      <SearchBar
        searchKeyword={searchKeyword}
        handleKeywordChange={handleKeywordChange}
        handleOderingChange={handleOderingChange}
      />
      <SearchResults searchedData={searchedData} />
    </SearchPageMain>
  );
};

export default Search;
