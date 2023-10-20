import React from "react";

const DeleteUserModal = () => {
  const { openDeleteModal, setOpenDeleteModal } = props;
  if (!openDeleteModal) return null;
  return (
    <ModalFade>
      <div className="modal-card">
        <div className="top-label">
          <h2>Criar usuário</h2>
          <AiOutlineCloseCircle
            style={{ color: "#171717" }}
            className="close-icon"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <div className="form-box">
          <form onSubmit={formik.handleSubmit}>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
                    id="username"
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    label="email"
                    variant="outlined"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <FormControl size="small" fullWidth>
                    <InputLabel id="roles">Roles</InputLabel>
                    <Select
                      multiple
                      fullWidth
                      labelId="roles"
                      id="roles"
                      name="roles"
                      label="Roles"
                      value={formik.values.roles}
                      onChange={formik.handleChange}
                    >
                      {roles.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    formik.resetForm();
                  }}
                  className="btn-reset-form"
                >
                  Limpar
                </button>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="btn-submit-form"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFade>
  );
};

export default DeleteUserModal;
