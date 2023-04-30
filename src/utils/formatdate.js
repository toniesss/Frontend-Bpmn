import { parseISO, format } from 'date-fns';

export const formatdatecamunda = (dateString) => {
  /* if (!dateString) {
     return "";
   }*/
  const date = parseISO(dateString);
  const beYear = date.getFullYear() + 543;
  date.setFullYear(beYear);
  return format(date, 'yyyy-MM-dd');
};

export const convertDateToThaiFormat = (dateString) => {
    /* if (!dateString) {
       return "";
     }*/
    const date = parseISO(dateString);
    const adYear = date.getFullYear() - 543;
    date.setFullYear(adYear);
    const formattedDate = format(date, "dd-MM-yyyy");
    return formattedDate;
  };