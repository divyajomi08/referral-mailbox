import axios from "axios";

const fetchEmails = () => axios.get(`/api/v1/referrals`);

const create = (payload) => axios.post(`/api/v1/referrals`, payload);

const referralApis = { fetchEmails, create };

export default referralApis;
