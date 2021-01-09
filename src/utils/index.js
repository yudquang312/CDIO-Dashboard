import * as moment from "moment";

const formatDate = (dateString) => {
  return moment(dateString).format("DD-MM-YYYY hh:mm:ss");
};

export default formatDate;
