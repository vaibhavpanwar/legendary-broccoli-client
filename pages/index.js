import React, { useEffect } from "react";
import NotLoggedIn from "../components/Auth/notLoggedIn.component";
import BlogsItem from "../components/Home/blogs.component";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../redux/actions/project.actions";
import { getProjectsByUser } from "../utils/sortUtils";
import Link from "next/link";
import Loader from "../components/Layout/spinner.component";

const HomeComponent = () => {
  //redux
  const { loading, userInfo } = useSelector((state) => state.userLogin);
  const { projects, loading: loadingP } = useSelector(
    (state) => state.projectsList
  );
  const dispatch = useDispatch();

  //fetch all projects
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  return (
    <>
      {loading && <Loader />}
      {loadingP && <Loader />}
      {!userInfo && !loading ? (
        <NotLoggedIn />
      ) : (
        <>
          <h4 style={{ textAlign: "center" }}>Your Projects</h4>
          <p style={{ textAlign: "center" }}>
            <Link href="/addproject">Add Project</Link>
          </p>
          {getProjectsByUser(projects, userInfo?._id)?.length > 0 ? (
            <>
              {getProjectsByUser(projects, userInfo?._id)?.map((project) => (
                <BlogsItem project={project} />
              ))}
            </>
          ) : (
            <>
              <p style={{ textAlign: "center" }}>
                No projects found &nbsp; &nbsp;{" "}
              </p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeComponent;
