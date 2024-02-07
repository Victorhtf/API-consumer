import { baseUrl } from "../env";

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
    deleteById: baseUrl + "/admin/customer/",
    deleteByDisplayName: baseUrl + "/admin/watchlistCustomer/deleteItemByDisplayName", //POST
    updateById: baseUrl + "/admin/customer/", //PATCH
  },
  customerGroup: {
    create: baseUrl + "/admin/customerGroup", //POST
    listAll: baseUrl + "/admin/customerGroup", //GET
    listById: baseUrl + "/admin/customerGroup/", //GET
    deleteById: baseUrl + "/admin/customerGroup/", //DELETE
    updateById: baseUrl + "/admin/customerGroup/", //PATCH
  },
  ambient: {
    listAll: baseUrl + "/admin/ambient", //GET
    listCities: baseUrl + "/client/cities/listCities", //GET
    create: baseUrl + "/admin/ambient", //POST
    listById: baseUrl + "/admin/ambient/", //GET
    deleteById: baseUrl + "/admin/ambient/", //DELETE
    updateById: baseUrl + "/admin/ambient/", //PATCH
    listAllWithAddress: baseUrl + "/admin/ambient/ambientsAddress", //
  },
  userxambient: {
    listAll: baseUrl + "/admin/userXAmbient", //GET
    listAllArray: baseUrl + "/admin/userXAmbient/array", //GET
  },
  camera: {
    listTypes: baseUrl + "/admin/camera/cameraTypes", //GET
    listAll: baseUrl + "/admin/camera", //GET
    listById: baseUrl + "/admin/camera/", //GET
    listMy: baseUrl + "/admin/camera/myCameras", //GET
    create: baseUrl + "/admin/camera", //POST
  },
  watchlists: {
    global: {
      listTypes: baseUrl + "/admin/watchlistGlobal/watchlistGlobalTypes", //GET
      listAll: baseUrl + "/admin/watchlistGlobal", //GET
      listById: baseUrl + "/admin/watchlistGlobal/", //GET
      create: baseUrl + "/watchlistGlobal", //POST
    },
    ambient: {
      listTypes: baseUrl + "/admin/watchlistAmbient/watchlistAmbientTypes", //GET
      listAll: baseUrl + "/admin/watchlistAmbient/", //GET
      listById: baseUrl + "/admin/watchlistAmbient/", //GET
      create: baseUrl + "/admin/watchlistAmbient", //POST
    },
    customer: {
      listTypes: baseUrl + "/admin/watchlistCustomer/watchlistCustomerTypes", //GET
      listAll: baseUrl + "/admin/watchlistCustomer", //GET
      listById: baseUrl + "/admin/watchlistCustomer/", //GET
      listMy: baseUrl + "/admin/watchlistCustomer/myWatchlists", //GET
      create: baseUrl + "/admin/watchlistCustomer/", //POST
      deleteByDisplayName: baseUrl + "/admin/watchlistCustomer/deleteItemByDisplayName", //POST
      mergeById: baseUrl + "/admin/watchlistCustomer/mergeItemsById", //POST
      mergeByDisplayName: baseUrl + "/admin/watchlistCustomer/mergeItemsByDisplayName", //POST
    },
  },
};
