const namedCustomfields = (customFields) => {
  let textFields = [];
  let numberFields = [];
  let checkboxFields = [];
  let dateFields = [];
  let textareFields = [];
  let orderedCustomFields = [];

  customFields.forEach((item, index) => {
    if (item.type === "text") {
      textFields.push({ ...item, name: `text${textFields.length + 1}` });
    }
    if (item.type === "number") {
      numberFields.push({ ...item, name: `number${numberFields.length + 1}` });
    }
    if (item.type === "checkbox") {
      checkboxFields.push({ ...item, name: `checkbox${checkboxFields.length + 1}` });
    }
    if (item.type === "date") {
      dateFields.push({ ...item, name: `date${dateFields.length + 1}` });
    }
    if (item.type === "textarea") {
      textareFields.push({ ...item, name: `textarea${textareFields.length + 1}` });
    }
  });

  orderedCustomFields = [
    ...textFields,
    ...numberFields,
    ...checkboxFields,
    ...dateFields,
    ...textareFields,
  ];

  return orderedCustomFields;
};

module.exports = namedCustomfields;
