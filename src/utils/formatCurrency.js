const formatCurrency = (money) => {
  console.log(money);
  let str = money + "";
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      res = str[str.length - i - 1] + "," + res;
    } else {
      res = str[str.length - i - 1] + res;
    }
  }
  return res;
};

export default formatCurrency;
