import axios from "axios";
let characteresTemp = [];

export const ResidentContainer = (residents) => {
  if (residents.length > 0) {
    for (let i = 0; i < residents.length; i++) {
      if (i > 9) {
        break;
      }

      axios.get(`${residents[i]}`).then((res) => {
        //console.log(res.data);
        characteresTemp.push(res.data);
      });
    }
  }

  return characteresTemp;
};
