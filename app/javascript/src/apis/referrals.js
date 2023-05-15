import axios from "axios";

const fetchEmails = (search, page, per_page) =>
  axios.get(`/api/v1/referrals`, {
    params: { search, page, per_page },
  });

const create = (payload) => axios.post(`/api/v1/referrals`, payload);

const referralApis = { fetchEmails, create };

export default referralApis;
