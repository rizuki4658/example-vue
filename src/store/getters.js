const getters = {
  system_token: state => state.user.system_token,
  page_data: state => state.app.page_data,
  language: state => state.app.language,
  skills: state => state.app.skills,
  user: state => state.user.data_user,
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,
  name: state => state.app.name,
  main_class: state => state.app.main_class,
  list_user: state => state.user.list,
  notification: state => state.app.notification
}
export default getters
