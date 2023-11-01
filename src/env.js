export const intradataConfig = {
  protocol: "https",
  url: "localhost",
  basePath: "v1",
  port: "8889",
};

const baseUrl = `${intradataConfig.protocol}://${intradataConfig.url}:${intradataConfig.port}/${intradataConfig.basePath}`;

export const routes = {
  user: {
    create: baseUrl + "/user/", //POST
    listAll: baseUrl + "/user", //GET
    listLogged: baseUrl + "/user/me", //POST
    listById: baseUrl + "/user/", //GET
    updateById: baseUrl + "/user/", //UPDATE
    deleteById: baseUrl + "/user", //DELETE
  },
};
