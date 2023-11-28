export const intradataConfig = {
  protocol: "https",
  url: "localhost",
  basePath: "v1",
  port: "8889",
};

const baseUrl = `${intradataConfig.protocol}://${intradataConfig.url}:${intradataConfig.port}/${intradataConfig.basePath}`;

export const routes = {
  login: {
    auth: baseUrl + "/auth/login", //POST
    me: baseUrl + "/user/me", //GET
  },
  user: {
    create: baseUrl + "/user/", //POST
    listAll: baseUrl + "/user", //GET
    listLogged: baseUrl + "/user/me", //POST
    listById: baseUrl + "/user/", //GET
    updateById: baseUrl + "/user/", //UPDATE
    deleteById: baseUrl + "/user", //DELETE
    linkAmbient: baseUrl + "/user/linkAmbients", //POST
    unlinkAmbient: baseUrl + "/user/unlinkAmbients", //POST
  },
  customer: {
    create: baseUrl + "/admin/customer", //POST
    listAll: baseUrl + "/admin/customer", //GET
    listMy: baseUrl + "admin/customer/myCustomers", //GET
    listById: baseUrl + "admin/customer/", //GET
  },
  customerGroup: {
    create: baseUrl + "/admin/customerGroup", //POST
    listAll: baseUrl + "/admin/customerGroup", //GET
    listById: baseUrl + "/admin/customerGroup/", //GET
  },
  ambient: {
    listAll: baseUrl + "/admin/ambient", //GET
    listCities: baseUrl + "/client/cities/listCities", //GET
    create: baseUrl + "/admin/ambient", //POST
    listById: baseUrl + "/admin/ambient/", //GET
  },
  userxambient: {
    listAll: baseUrl + "/admin/userXAmbient", //GET
    listAllArray: baseUrl + "/admin/userXAmbient/array", //GET
  },
};
