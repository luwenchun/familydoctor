import axios from 'axios';

let base = '';

axios.defaults.headers.post['Content-Type'] = 'application/json';
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const searchUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getOptionsList = params => { return axios.get(`${base}/option`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//修改状态
export const handleStop=params=> {return axios.get(`${base}/handleState`, { params: params }); }

export const handleStar=params=> {return axios.get(`${base}/handleStar`, { params: params }); }

//批量修改状态
export const batchSets = params => { return axios.get(`${base}/batchSets`, { params: params }); };


export const getTeamPageList = params => { return axios.post(`${base}/team/pageList`,  params ); };
export const searchTeamList = params => { return axios.post(`${base}/team/list`,   params ); };
export const addTeam = params => { return axios.post(`${base}/team/add`,  params ); };

//查询家庭医生
export const addDoctor = params => { return axios.post(`${base}/doctor/add`, params ); };
export const getDoctorPageList = params => { return axios.post(`${base}/doctor/pageList`,  params ); };
export const getDoctor = params => { return axios.post(`${base}/doctor/getDoctor`,  params ); };
export const doctorBatchSets = params => { return axios.post(`${base}/doctor/doctorBatchSets`,  params ); };
export const doctorUpdateState=params=> {return axios.post(`${base}/doctor/updateState`, params ); };
export const doctorHandleStar=params=> {return axios.post(`${base}/doctor/updateState`, params ); };
export const getDoctorListByOrgCode = params => { return axios.post(`${base}/doctor/getDoctorListByOrgCode`,  params ); };
//查询协议模版
export const getDefaultTempCode = params => {return axios.post(`${base}/team/getDefaultTemp`,params);};





//服务包
export  const searchPackageList = params  => {return axios.post(`${base}/contractPackage`, params); };

export  const addPackage = params  => {return axios.post(`${base}/contractPackage/savePackage`, params); };
//基础服务
export const searchServiceList=params=> {return axios.post(`${base}/basics/list`,params); }
//基础服务查询无分页
export const searchServiceLists=params=> {return axios.post(`${base}/basics/getList`,params); }

export  const addService = params  => {return axios.post(`${base}/basics/save`, params); };


export  const updateServiceStates = params  => {return axios.post(`${base}/basics/updateStates`,params); };

// 协议项目
export  const searchItemServiceList = params  => {return axios.post(`${base}/contractItems/getList`, params); };


export  const addItem = params  => {return axios.post(`${base}/contractItems/save`,params); };


export  const updateItemStates = params  => {return axios.post(`${base}/contractItems/updateStates`,params); };
