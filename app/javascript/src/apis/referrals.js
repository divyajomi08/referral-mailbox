import axios from "axios";

const create = (payload) => axios.post(`/api/v1/referrals`, payload);

const referralApis = { create };

export default referralApis;
