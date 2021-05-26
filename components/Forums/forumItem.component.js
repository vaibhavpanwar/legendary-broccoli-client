import React, { useState } from "react";
import styled from "styled-components";
import { colors, sizes, spacing } from "../../styles/style.vars";
import user from "../../public/assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../redux/actions/project.actions";

const ForumItem = ({ forum }) => {
  const { title, name, comments, _id } = forum;

  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleCommentBoxOpener = () => {
    setCommentBoxOpen(!commentBoxOpen);
  };

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const addCommentHandler = () => {
    if (!content?.trim) {
      return;
    } else {
      dispatch(addComment(_id, content));
    }
  };

  const alreadyAddedComment = () => {
    const added = comments?.find((i) => i.user === userInfo?._id);
    return added ? true : false;
  };

  return (
    <>
      <ForumCard>
        <ForumCardUserName>
          <UserAvatar width={"40px"} top={"5px"} src={user} />
          {name}
        </ForumCardUserName>
        <ForumCardTitle>{title} </ForumCardTitle>
        <ForumCardFooter onClick={handleCommentBoxOpener}>
          Comments{" "}
          <ForumCardCommentNumber>{comments?.length}</ForumCardCommentNumber>
        </ForumCardFooter>
        {commentBoxOpen && (
          <ForumCommentBox>
            {userInfo ? (
              alreadyAddedComment() ? (
                <p>Already made a comment</p>
              ) : (
                <CommentInputContainer>
                  <CommentInput
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <CommentAddButton onClick={addCommentHandler}>
                    Comment
                  </CommentAddButton>
                </CommentInputContainer>
              )
            ) : (
              <p>Please Login to continue</p>
            )}
            {comments?.length === 0 ? (
              <p>No comments Found</p>
            ) : (
              comments?.map((comment) => (
                <ForumComment>
                  <CommentUser>
                    {" "}
                    <UserAvatar width={"15px"} top={"1px"} src={user} />
                    {comment?.name}
                  </CommentUser>
                  <CommentBody>{comment?.comment}</CommentBody>
                </ForumComment>
              ))
            )}
          </ForumCommentBox>
        )}
      </ForumCard>
    </>
  );
};

const ForumCard = styled.div`
  padding: ${spacing.s};
  border: 1px solid #e9e9e9;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const ForumCardUserName = styled.h4`
  font-size: ${sizes.l};
  color: #000;
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

const ForumCardTitle = styled.h4`
  font-size: ${sizes.m};
  color: ${colors.text};
  font-weight: 400;
`;

const ForumCardFooter = styled.div`
  background-color: #e9e9e9;
  width: 100%;
  padding: ${sizes.s};
  color: #000;
  cursor: pointer;
`;

const ForumCardCommentNumber = styled.span`
  color: ${colors.text};
  font-size: ${sizes.s};
`;

const ForumCommentBox = styled.div`
  background: #e9e9e9;
  margin-top: 0;
  max-height: 400px;
  padding: ${spacing.s};
  overflow: scroll;
`;

const ForumComment = styled.div`
  background: white;
  border: 4px;
  margin: 25px 0;
  padding: ${spacing.s};
`;

const CommentUser = styled.h3`
  font-size: ${sizes.m};
  color: #000;
  margin: 0;
  padding: 0;
`;

const CommentBody = styled.p`
  font-size: 14px;
  color: ${colors.text};
  margin: 5px 0;
`;

const UserAvatar = styled.img`
  width: ${({ width }) => width};
  height: ${({ width }) => width};
  position: relative;
  top: ${({ top }) => top};
`;

const CommentInputContainer = styled.div`
  width: 100%;
  padding: ${sizes.s};
  display: flex;
  gap: 30px;
`;
const CommentInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 5px;
`;
const CommentAddButton = styled.button`
  cursor: pointer;
  border: none;
  min-width: 2.5rem;
  height: 35px;
  display: flex;
  justify-content: center;
  padding: 1px 20px;
  align-items: center;
  background: ${(props) =>
    props.primary ? `${colors.secondary}` : `${colors.button}`};
  color: ${(props) => (props.primary ? `${colors.text}` : `${colors.primary}`)};
`;

export default ForumItem;
