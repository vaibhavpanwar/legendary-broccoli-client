import React, { useState } from "react";
import firebase from "../src/custom/fire.config";
import FileUploader from "react-firebase-file-uploader";
import { useSelector, useDispatch } from "react-redux";
import cogoToast from "cogo-toast";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import styled from "styled-components";
import { colors, spacing, sizes } from "../styles/style.vars";
import { addProject } from "../redux/actions/project.actions";
import NotLoggedIn from "../components/Auth/notLoggedIn.component";
import Loader from "../components/Layout/spinner.component";

const HomeComponent = () => {
  const [imagesDownloadUrls, setImagesDownloadUrls] = useState([]);
  const [imagesIsUploading, setImagesIsUploading] = useState(false);
  const [imagesUploadProgress, setImagesUploadProgress] = useState(0);
  const [docsDownloadUrls, setDocsDownloadUrls] = useState([]);
  const [docsIsUploading, setDocsIsUploading] = useState(false);
  const [docsUploadProgress, setDocsUploadProgress] = useState(0);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const handleImagesUploadStart = () => {
    setImagesIsUploading(true);
    setImagesUploadProgress(0);
  };
  const handleDocsUploadStart = () => {
    setDocsIsUploading(true);
    setDocsUploadProgress(0);
  };

  const handleImagesProgress = (progress) => setImagesUploadProgress(progress);

  const handleDocsProgress = (progress) => setDocsUploadProgress(progress);

  const handleImagesUploadError = (error) => {
    setImagesIsUploading(false);
    console.log(error, "eror");
    cogoToast.error(error, {
      heading: "Something went wrong",
      hideAfter: 4,
      position: "bottom-right",
    });
  };

  const handleDocsUploadError = (error) => {
    setDocsIsUploading(false);
    console.log(error, "eror");
    cogoToast.error(error, {
      heading: "Something went wrong",
      hideAfter: 4,
      position: "bottom-right",
    });
  };

  const handleImagesUploadSuccess = async (filename) => {
    const downloadURL = await firebase
      .storage()
      .ref("photos")
      .child(filename)
      .getDownloadURL();

    setImagesIsUploading(false);
    setImagesDownloadUrls((old) => [...old, downloadURL]);
  };

  const handleDocsUploadSuccess = async (filename) => {
    const downloadURL = await firebase
      .storage()
      .ref("docs")
      .child(filename)
      .getDownloadURL();
    setDocsIsUploading(false);
    setDocsDownloadUrls((old) => [...old, downloadURL]);
  };

  const { userInfo, loading } = useSelector((state) => state.userLogin);
  const { loading: loadingP } = useSelector((state) => state.projectsList);

  const isDisabled = () =>
    !title || !imagesDownloadUrls?.length || !docsDownloadUrls?.length;

  const addProjectHandler = () => {
    if (isDisabled()) {
      return;
    } else {
      dispatch(addProject(title, imagesDownloadUrls, docsDownloadUrls));
    }
  };

  return (
    <>
      {loading && <Loader />}
      {loadingP && <Loader />}
      {!userInfo && !loading ? (
        <NotLoggedIn />
      ) : (
        <>
          <AddBlogContainer>
            <FileUploadContainer>
              <div>
                <FileUploadButton>
                  Select images to upload
                  <FileUploader
                    hidden
                    accept="image/*"
                    name="image-uploader-multiple"
                    storageRef={firebase?.storage().ref(`photos`)}
                    onUploadStart={handleImagesUploadStart}
                    onUploadError={handleImagesUploadError}
                    onUploadSuccess={handleImagesUploadSuccess}
                    onProgress={handleImagesProgress}
                    multiple
                  />
                </FileUploadButton>

                <Progress
                  style={{ marginTop: "4rem" }}
                  percent={imagesUploadProgress}
                  status={`${
                    imagesUploadProgress === 100 ||
                    imagesDownloadUrls?.length > 0
                      ? "success"
                      : ""
                  }`}
                />
                <br />
                {imagesIsUploading && <p>Loading....</p>}
              </div>
              <div>
                <FileUploadButton>
                  Select documents to upload
                  <FileUploader
                    hidden
                    accept=".pdf,.doc"
                    name="image-uploader-multiple"
                    storageRef={firebase?.storage().ref(`docs`)}
                    onUploadStart={handleDocsUploadStart}
                    onUploadError={handleDocsUploadError}
                    onUploadSuccess={handleDocsUploadSuccess}
                    onProgress={handleDocsProgress}
                    multiple
                  />
                </FileUploadButton>

                <Progress
                  style={{ marginTop: "4rem" }}
                  percent={docsUploadProgress}
                  status={`${
                    docsUploadProgress === 100 || docsDownloadUrls?.length > 0
                      ? "success"
                      : ""
                  }`}
                />
                <br />
                {docsIsUploading && <p>Loading....</p>}
              </div>
            </FileUploadContainer>
            <h4 style={{ textAlign: "center" }}>Title</h4>
            <InputContainer>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <AddButton
                isDisable={isDisabled()}
                disabled={isDisabled()}
                onClick={addProjectHandler}
              >
                Create
              </AddButton>
            </InputContainer>
          </AddBlogContainer>
        </>
      )}
    </>
  );
};

export default HomeComponent;

const AddBlogContainer = styled.div`
  margin: 4rem auto;
  max-width: 95rem;
  padding: ${spacing.s};
`;

const FileUploadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${spacing.s};
  flex-wrap: wrap;
`;
const FileUploadButton = styled.label`
  color: #fff;
  background-color: ${colors.button};
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2.5rem;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: ${sizes.s};
  display: flex;
  gap: 30px;
`;
const Input = styled.input`
  border: 2.5px solid ${colors.secondary};
  outline: none;
  width: 100%;
  padding: 5px;
`;
const AddButton = styled.button`
  cursor: pointer;
  border: none;
  min-width: 2.5rem;
  height: 35px;
  padding: 1px 20px;
  display: flex;

  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.primary ? `${colors.secondary}` : `${colors.button}`};
  color: ${(props) => (props.primary ? `${colors.text}` : `${colors.primary}`)};
  ${(props) =>
    props.isDisable &&
    `
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    
    `}
`;
