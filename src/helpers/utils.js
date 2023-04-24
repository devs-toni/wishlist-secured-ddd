import Swal from "sweetalert2";

//FORM VALIDATIONS 

export const askNewName = async (initText) => {
  while (true) {
    const { value } = await Swal.fire({
      title: 'Update Task',
      input: 'text',
      inputLabel: "Enter the new name",
      inputValue: initText,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    const validation = await validateName(value);
    if (validation) return value;
  }
}

export const validateName = async (name) => {
  if (name.length === 0) {
    await Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: "Name can't be empty!",
    })
  } else if (name.length < 2) {
    await Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: "Name needs at least 2 characters",
    })
  } else {
    return true;
  }
  return false;
}

// NOTIFICATIONS 

export const askConfirmDelete = async () => {
  let response = false;
  await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed)
      response = true;
    else
      response = false
  })
  return response;
}

export const launchSuccessNotification = (msg) => {
  Toast.fire({
    icon: 'success',
    title: msg
  })
}

export const launchEmptyNotification = (msg) => {
  Swal.fire(
    'Information',
    msg,
    'info'
  );
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
})

