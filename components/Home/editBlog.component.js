import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors, spacing } from "../../styles/style.vars";
import { useDispatch } from "react-redux";
import { editProject } from "../../redux/actions/project.actions";
const EditBlog = ({ project, editId, setEditId }) => {
  const [title, setTitle] = useState(project?.title);

  const dispatch = useDispatch();

  const editHandler = () => {
    console.log("fired");
    console.log(title);
    if (!title.trim) {
      console.log("case 1");
      return;
    } else {
      dispatch(editProject(project?._id, title));
    }
  };

  useEffect(() => {
    setEditId("");
  }, [project?.title]);

  return editId === project?._id ? (
    <FormContainer>
      <FormInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <FormButton primary onClick={editHandler}>
        Update
      </FormButton>
    </FormContainer>
  ) : null;
};

//styles
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: ${spacing.m};
  @media (max-width: 668px) {
    padding: ${spacing.s};
  }
`;

const FormButton = styled.button`
  cursor: pointer;
  border: none;
  min-width: 2.5rem;
  height: 35px;
  padding: 1px 20px;
  background: ${(props) =>
    props.primary ? `${colors.secondary}` : `${colors.button}`};
  color: ${(props) => (props.primary ? `${colors.text}` : `${colors.primary}`)};
`;

const FormInput = styled.input`
  display: block;
  outline: none;
  width: 80%;
  font-size: 15px;
  margin: 5px auto;
  font-weight: bold;
  color: #a38484;
  border: 1px solid ${colors.secondary};

  border-radius: 12px;
  padding: 10px;
`;

export default EditBlog;
