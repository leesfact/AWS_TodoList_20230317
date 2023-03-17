class ModalEvent {
    // Singleton
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModalEvent();
        }
        return this.#instance;
    }

    addEventCancleClick() {
        const modalCancleButton = document.querySelector(".modal-cancle-button");
        modalCancleButton.onclick = () => {
            ModalService.getInstance().closeModal();
        }
    }


    addEventRemoveOkClick(removeIndex) {
        const modalOkButton = document.querySelector(".modal-ok-button");
        modalOkButton.onclick = () => {
            TodoService.getInstance().todoList.splice(removeIndex, 1); //해당 인덱스 추가, 수정 `splice`
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();
        }
    }

    addEventModifyOkClick(modifyIndex) {
        const modifyButton = document.querySelector(".modal-ok-button");
        modifyButton.onclick = () => {
            const todoModifyInput = document.querySelector(".todo-modify-input");
            TodoService.getInstance().todoList[modifyIndex].todoContent = todoModifyInput.value;
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();
        }
    }
}



class ModalService {
    // Singleton
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModalService();
        }
        return this.#instance;
    }

    showModal() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.remove("modal-hidden");
    }


    closeModal() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.add("modal-hidden");
    }




    showModifyModal(modifyIndex) {
        const todoObj = TodoService.getInstance().todoList[modifyIndex];
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-title">ToDo 수정</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">${todoObj.todoDate} ${todoObj.todoDateTime}</p>
                <input type ="text" class="todo-modify-input" value ="${todoObj.todoContent}">
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button"><i class="fa-solid fa-check"></i></button>
                <button type="button" class="modal-cancle-button"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;
        ModalEvent.getInstance().addEventModifyOkClick(modifyIndex);
        ModalEvent.getInstance().addEventCancleClick();
        this.showModal();
    }
    

    showRemoveModal(removeIndex) {
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-title">ToDo 삭제</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">ToDo를 삭제하시겠습니까?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button"><i class="fa-solid fa-check"></i></button>
                <button type="button" class="modal-cancle-button"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;
        // 확인, 취소 이벤트 생성
        ModalEvent.getInstance().addEventRemoveOkClick(removeIndex);
        ModalEvent.getInstance().addEventCancleClick();
        this.showModal();
    }
}