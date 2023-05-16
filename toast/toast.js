const showToast = (message, type) => {
    const toast = document.querySelector(".toast");
    const toastMessage = document.querySelector(".message");

    toast.style.backgroundColor = type === 'error' ? 'var(--erro)' : 'var(--sucesso)';

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
export default showToast;
