import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ForumItem from "../components/Forums/forumItem.component";
import Loader from "../components/Layout/spinner.component";
import { fetchProjects } from "../redux/actions/project.actions";
import { spacing } from "../styles/style.vars";
import { getPublishedProjects } from "../utils/sortUtils";

const Forums = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projectsList);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Forums: </h2>
      {loading && <Loader />}
      <ForumContainer>
        {getPublishedProjects(projects)?.map((item) => (
          <ForumItem forum={item} />
        ))}
      </ForumContainer>
    </>
  );
};

const ForumContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 5rem auto;
  grid-gap: 30px;
  max-width: 95rem;
  padding: ${spacing.Wm};

  @media (max-width: 968px) {
    grid-template-columns: auto auto;
    padding: 0px 60px;
  }
  @media (max-width: 768px) {
    grid-template-columns: auto;
    padding: 0px 30px;
  }

  @media (max-width: 668px) {
    padding: ${spacing.s};
  }
`;

export default Forums;
