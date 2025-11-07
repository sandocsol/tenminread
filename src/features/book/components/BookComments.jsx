import { useState } from 'react';
import styled from 'styled-components';

const CommentsContainer = styled.div`
  width: 100%;
  min-height: 581px;
  background-color: #f2e9da;
  padding: 24px 30px 0 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const CommentsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const CommentItem = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentAuthor = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
  color: #6f665f;
  margin: 0;
`;

const CommentText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6f665f;
  margin: 0;
  white-space: pre-wrap;
`;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid rgba(111, 102, 95, 0.3);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6f665f;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: rgba(111, 102, 95, 0.6);
  }
  
  &::placeholder {
    color: rgba(111, 102, 95, 0.5);
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 10px 24px;
  background-color: #6f665f;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #6f665f;
  text-align: center;
  padding: 40px 0;
  opacity: 0.6;
`;

/**
 * BookComments 컴포넌트
 * [댓글] 탭을 눌렀을 때 보이는 댓글 목록과 댓글 입력창
 * 
 * @param {Array} comments - 댓글 배열 (예: [{ author: "사용자", text: "댓글 내용" }, ...])
 * @param {function} onSubmitComment - 댓글 제출 핸들러 (text) => void
 */
function BookComments({ comments = [], onSubmitComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim() && onSubmitComment) {
      onSubmitComment(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <CommentsContainer>
      <CommentsList>
        {comments.length === 0 ? (
          <EmptyState>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</EmptyState>
        ) : (
          comments.map((comment, index) => (
            <CommentItem key={index}>
              <CommentAuthor>{comment.author || '익명'}</CommentAuthor>
              <CommentText>{comment.text || comment.content}</CommentText>
            </CommentItem>
          ))
        )}
      </CommentsList>
      
      <CommentInputContainer>
        <CommentTextarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력하세요..."
          rows={4}
        />
        <SubmitButton 
          onClick={handleSubmit}
          disabled={!commentText.trim()}
        >
          등록
        </SubmitButton>
      </CommentInputContainer>
    </CommentsContainer>
  );
}

export default BookComments;

