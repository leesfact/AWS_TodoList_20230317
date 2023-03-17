class AsideEvent {
    // Singleton
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AsideEvent();
        }
        return this.#instance;
    }

    addEventShowMenuButton() {
        // Selector 선택자 
        // const 쓰는 이유?
        // 객체의 주소는 변함없어야한다. (값은 바뀔 수 있다)
        const menuButton = document.querySelector(".menu-button");
        menuButton.onclick = () => {
            const menuAside = document.querySelector(".menu-aside");
            if(menuAside.classList.contains("hidden-menu")) {
                menuAside.classList.remove("hidden-menu");
                // menuButton.innerHTML를 써버리면 event가 같이 날라가버리기때문에 쓰지않는다.
                /**
                 * innerHTML : HTML 태그 및 속성을 포함한 모든 내용을 반환
                 * 이 속성은 텍스트, HTML, CSS 스타일 및 이미지와 같은 모든 컨텐츠를 포함
                 * innerHTML을 사용하여 HTML 요소에 새 HTML 마크업을 동적으로 삽입 또는 수정 할 수 있음
                 * 
                 * textContent : 해당 요소의 텍스트 내용만을 가져오거나 설정 (HTML 태그나 속성을 포함하지 않음)
                 * 
                 * innerHTML은 HTML 요소에 대한 모든 변경사항을 적용하므로 파싱 오류가 있을 경우 안전하지 않음
                 */
                menuButton.textContent="◀";
            }else{
                menuAside.classList.add("hidden-menu");
                menuButton.textContent="▶";
            }
        }
    }

    addEventMainChange() {

        const menuItems = document.querySelectorAll(".menu-items");
        menuItems.forEach((menuItem,index) => {
            menuItem.onclick = () => {
                const mainContainers = document.querySelectorAll(".main-container");
                const menuAside = document.querySelector(".menu-aside");
                // 초기화
                mainContainers.forEach(mainContainer =>{
                    mainContainer.classList.add("main-hidden");
                });
                mainContainers[index].classList.remove("main-hidden");
                menuAside.classList.add("hidden-menu");
            }
        });
    }
}