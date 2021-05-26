import React, { useState } from "react";
import styled from "styled-components";
import { colors, sizes, spacing } from "../../styles/style.vars";
import {
  deleteProject,
  publishProject,
} from "../../redux/actions/project.actions";
import { useDispatch } from "react-redux";
import EditBlog from "./editBlog.component";
import Carousel from "../Layout/carousel.component";

//styled end

const BlogsItem = ({ project }) => {
  const [editId, setEditId] = useState("");

  const { images, title, docs, isPublished, _id } = project;

  const dispatch = useDispatch();
  const editHandler = () => {
    setEditId((oldEditId) => (oldEditId === _id ? "" : _id));
  };

  return (
    <>
      <BlogContainer>
        <BlogPublishButtonContainer>
          {isPublished ? (
            <p>Published..</p>
          ) : (
            <BlogButton onClick={() => dispatch(publishProject(_id))}>
              Publish
            </BlogButton>
          )}
        </BlogPublishButtonContainer>
        <BlogHeader>
          <BlogHeading> {title}</BlogHeading>
          <BlogButtons>
            <BlogButton onClick={editHandler}>Edit</BlogButton>
            <BlogButton primary onClick={() => dispatch(deleteProject(_id))}>
              Delete
            </BlogButton>
          </BlogButtons>
        </BlogHeader>
        <EditBlog project={project} editId={editId} setEditId={setEditId} />
        <h3 style={{ textAlign: "center" }}>Images: </h3>
        <CarouselWrapper>
          <Carousel>
            {images.map((image) => (
              <BlogsItemImage background={`url(${image})`} />
            ))}
          </Carousel>
        </CarouselWrapper>

        <h3 style={{ textAlign: "center", marginTop: "5rem" }}>Docs: </h3>
        <BlogDocumentWrapper>
          {docs?.map((item, i) => (
            <>
              <a target="_blank" href={`${item}`}>
                {"Document" + (i + 1)}
              </a>
            </>
          ))}
        </BlogDocumentWrapper>
      </BlogContainer>
    </>
  );
};

export default BlogsItem;

const BlogContainer = styled.div`
  margin: ${spacing.xl} auto;
  max-width: 95rem;
  padding: ${spacing.m} 0;
  border: 2px solid ${colors.secondary};
`;

const BlogPublishButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
`;

const BlogHeader = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.m};
  @media (max-width: 668px) {
    padding: ${spacing.s};
  }
`;
const BlogHeading = styled.p`
  font-size: ${sizes.m};
  color: #000;
  font-weight: 600;
  @media (max-width: 668px) {
    font-size: ${sizes.m};
    padding: ${spacing.s};
  }
`;

const BlogButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const BlogButton = styled.button`
  cursor: pointer;
  border: none;
  min-width: 2.5rem;
  height: 35px;
  padding: 1px 20px;
  background: ${(props) =>
    props.primary ? `${colors.secondary}` : `${colors.button}`};
  color: ${(props) => (props.primary ? `${colors.text}` : `${colors.primary}`)};
`;

const CarouselWrapper = styled.div`
  margin: ${spacing.s} auto;
  position: relative;
  padding: ${spacing.m};
  height: 55vh;
  max-width: 95rem;
  @media (max-width: 668px) {
    padding: ${spacing.s};
    margin: ${spacing.s} ${spacing.s};
  }
`;

const BlogsItemImage = styled.div`
  width: 100%;
  height: 55vh;
  background: ${({ background }) => background};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
`;

const BlogDocumentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: ${spacing.m};

  @media (max-width: 668px) {
    padding: ${spacing.s};
    margin: ${spacing.s} ${spacing.s};
  }
`;
