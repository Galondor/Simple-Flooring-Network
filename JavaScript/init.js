function initQuizData() {
    let storage = JSON.parse(localStorage.getItem("userQuizData")) || [];
    let newItem = {
        score: 0,
        date: null,
        completed: false,
    };
    //Delete any old data
    if (storage.length > 0) {
        return;
    } else if (storage.length === 0) {
        storage.splice(0, 1);
        storage.push(newItem);
        localStorage.setItem("userQuizData", JSON.stringify(storage));
    }
}