exports.createId = (contacts) => {
  let lastId = +contacts[contacts.length - 1].id;
  return (lastId += 1);
};
