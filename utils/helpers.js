module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  format_plural: (let, amount) => {
    if (amount !== 1) {
      return `${let}s`;
    }

    return let;
  },
};
