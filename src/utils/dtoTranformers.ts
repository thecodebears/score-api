export const IntoJSON = ({ value }) => JSON.parse(value);

export const IntoNumber = ({ value }) => Number(value);

export const IntoStringArray = (delimiter, notEmpty=false) =>
    ({ value }) => (v => v ? (notEmpty ? (v?.length ? v : null) : v) : null)(value?.split(new RegExp(delimiter, 'g'))?.filter(e => e));

export const IntoNumberArray = (delimiter, notEmpty=false) =>
    ({ value }) => (v => v ? (notEmpty ? (v?.length ? v : null) : v) : null)(value?.split(new RegExp(delimiter, 'g'))?.map(Number)?.filter(e => e));

export const IntoObjectArray = (delimiter, notEmpty=false) =>
    ({ value }) => (v => v ? (notEmpty ? (v?.length ? v : null) : v) : null)(value?.split(new RegExp(delimiter, 'g'))?.map(JSON.parse)?.filter(e => e));