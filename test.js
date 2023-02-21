// const frontData = [
//   {
//     fieldName: "Field1",
//     type: "text",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field2",
//     type: "number",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field3",
//     type: "text",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field4",
//     type: "number",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field5",
//     type: "data",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field6",
//     type: "data",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field7",
//     type: "checkbox",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field8",
//     type: "textarea",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
//   {
//     fieldName: "Field9",
//     type: "checkbox",
//     field_id: "ac79831c-07ec-4107-bda3-49474298ca1e",
//     invalid: false,
//   },
// ];

// const customFields = {
//   textFields: new Array(3).fill(null),
//   numberFields: new Array(3).fill(null),
//   dataFields: new Array(3).fill(null),
//   checkboxFields: new Array(3).fill(null),
//   textareaFields: new Array(3).fill(null),
// };

// frontData.forEach((item) => {
//   if (item.type === "text")
//     customFields.textFields.splice(customFields.textFields.indexOf(null), 1, item);
//   if (item.type === "number")
//     customFields.numberFields.splice(customFields.numberFields.indexOf(null), 1, item);
//   if (item.type === "data")
//     customFields.dataFields.splice(customFields.dataFields.indexOf(null), 1, item);
//   if (item.type === "checkbox")
//     customFields.checkboxFields.splice(customFields.checkboxFields.indexOf(null), 1, item);
//   if (item.type === "textarea")
//     customFields.textareaFields.splice(customFields.textareaFields.indexOf(null), 1, item);
// });

// console.log(customFields);

// const reversedFields = [
//   ...customFields.textFields.filter((item) => item !== null),
//   ...customFields.numberFields.filter((item) => item !== null),
//   ...customFields.dataFields.filter((item) => item !== null),
//   ...customFields.checkboxFields.filter((item) => item !== null),
//   ...customFields.textareaFields.filter((item) => item !== null),
// ];

// // console.log(reversedFields);

const customFields = [
  {
    fieldName: "Field1",
    type: "date",
    field_id: "2188e327-40fe-4b6b-8609-7fcd99b0625c",
    invalid: false,
  },
  {
    fieldName: "Field2",
    type: "textarea",
    field_id: "57b43f6c-a906-4bb1-b360-e6e2b0294bb6",
    invalid: false,
  },
  {
    fieldName: "Field3",
    type: "checkbox",
    field_id: "2969ee06-1c12-4c3a-bac6-6d4ac55301ef",
    invalid: false,
  },
  {
    fieldName: "Field4",
    type: "text",
    field_id: "98435d7d-8726-49a4-bc96-f318af6ac8dd",
    invalid: false,
  },
  {
    fieldName: "Field5",
    type: "number",
    field_id: "4ed08df8-6d72-49c2-a4ee-9ab6d1308ecf",
    invalid: false,
  },
  {
    fieldName: "Field6",
    type: "textarea",
    field_id: "f1041e7c-f891-43ff-8256-52c6c369b8e5",
    invalid: false,
  },
  {
    fieldName: "Field7",
    type: "text",
    field_id: "612856d8-38e6-4286-ad02-66340a5b9dbc",
    invalid: false,
  },
  {
    fieldName: "Field8",
    type: "date",
    field_id: "6ff4feea-4e87-4aec-bbf0-ab2494ed3064",
    invalid: false,
  },
  {
    fieldName: "Field9",
    type: "number",
    field_id: "ae0a6401-6241-4f58-bd79-ac396877f821",
    invalid: false,
  },
  {
    fieldName: "Field10",
    type: "checkbox",
    field_id: "1d8d74c2-b3f5-4a78-8d13-950bd39131b2",
    invalid: false,
  },
];
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

console.log(orderedCustomFields);
