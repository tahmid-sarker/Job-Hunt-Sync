import Swal from "sweetalert2";

// Sweet Alert
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const getDataFromLocalStorage = () => {
  const storedDataSTR = localStorage.getItem("jobInfo");
  if (storedDataSTR) {
    return JSON.parse(storedDataSTR);
  } else {
    return [];
  }
};

const setDataToLocalStorage = (id, name) => {
  const storedData = getDataFromLocalStorage();
  if (storedData.includes(id)) {
    //Warning
    Toast.fire({
      icon: "warning",
      title: `${name} Job Already Saved!`,
    });
  } else {
    const newData = [...storedData, id];
    const newDataSTR = JSON.stringify(newData);
    localStorage.setItem("jobInfo", newDataSTR);
    //Success
    Toast.fire({
      icon: "success",
      title: `${name} Job Bookmark Successfully!`,
    });
  }
};

const removeDataFromLocalStorage = (id, name) => {
  const storedData = getDataFromLocalStorage();
  const filteredData = storedData.filter((singleData) => singleData !== id);
  const newDataSTR = JSON.stringify(filteredData);
  localStorage.setItem("jobInfo", newDataSTR);
  //Success
  Toast.fire({
    icon: "success",
    title: `${name} Job Remove Successfully!`,
  });
};

export { getDataFromLocalStorage, setDataToLocalStorage, removeDataFromLocalStorage };