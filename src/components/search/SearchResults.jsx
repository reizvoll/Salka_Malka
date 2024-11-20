import styled from "styled-components";
import Post from "../Post";

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
const NoPostsMessage = styled.div`
  margin: 0 auto;
  padding-top: 35vh;
  text-align: center;
  font-size: 16px;
  color: gray;
`;

const SearchResults = ({ searchedData }) => {
  return (
    <SearchResultsSheet>
      <SearchedPostsBoard>
        <SearchedPostsBoardInner>
          {searchedData && searchedData.length > 0 ? (
            searchedData.map((post) => {
              return <Post key={post.id} post={post} />;
            })
          ) : (
            <NoPostsMessage>검색 결과가 없습니다.</NoPostsMessage>
          )}
        </SearchedPostsBoardInner>
      </SearchedPostsBoard>
    </SearchResultsSheet>
  );
};

export default SearchResults;
