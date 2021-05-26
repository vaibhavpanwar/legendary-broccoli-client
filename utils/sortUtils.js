export const getProjectsByUser = (projects, id) =>
  projects.filter((i) => i.user === id);

export const getPublishedProjects = (projects) =>
  projects.filter((item) => item.isPublished);
