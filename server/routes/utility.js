import { json } from 'body-parser';

export const jsonParser = json();

export const callback = (res) => {
  return (err, polls) => {
    return res.send(err ? false : polls);
  };
};
