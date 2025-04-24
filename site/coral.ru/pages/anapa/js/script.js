import {hostReactAppReady} from "../../../../global/js/utils";

hostReactAppReady().then(() => {
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownList = document.getElementById("dropdownList");
    const selected = document.getElementById("dropdownSelected");
    const arrow = document.getElementById("dropdownArrow");

    dropdownButton.addEventListener("click", () => {
        dropdownList.style.display = dropdownList.style.display === "flex" ? "none" : "flex";
        arrow.classList.toggle("rotate");
    });

    dropdownList.querySelectorAll("a").forEach(item => {
        item.addEventListener("click", () => {
            selected.textContent = item.textContent;
            dropdownList.style.display = "none";
            arrow.classList.remove("rotate");
        });
    });

    document.addEventListener("click", (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownList.contains(event.target)) {
            dropdownList.style.display = "none";
            arrow.classList.remove("rotate");
        }
    });

    let anchorsBlock;

    if (window.innerWidth < 768) {
        anchorsBlock = document.querySelector(".js-block-m");
    } else {
        anchorsBlock = document.querySelector(".js-block");
    }

    if (anchorsBlock) {
        const placeholder = document.querySelector(".js-placeholder");

        const hotelsBlocks = document.querySelectorAll('.js-hotels-block');

        placeholder.style.width = `${anchorsBlock.offsetWidth}px`;
        placeholder.style.height = `${anchorsBlock.offsetHeight}px`;
        placeholder.style.display = "none";

        const rect = anchorsBlock.getBoundingClientRect();
        const initialOffsetTop = rect.top + window.scrollY;

        let appBanner = null;

        setTimeout(() => {
            appBanner = document.querySelector(".welcome-to-app");

            const closeBanner = appBanner?.querySelector('.welcome-to-app__close');

            if (closeBanner) {
                closeBanner.addEventListener('click', () => {
                    anchorsBlock.style.top = "56px";
                });
            }
        }, 500);

        const onScroll = () => {
            const scrollY = window.scrollY;

            if (window.innerWidth < 768) {
                let insideAnyHotelBlock = false;

                hotelsBlocks.forEach(block => {
                    const blockTop = block.offsetTop;
                    const blockBottom = blockTop + block.offsetHeight;

                    if (scrollY >= blockTop && scrollY <= blockBottom) {
                        insideAnyHotelBlock = true;
                    }
                });

                anchorsBlock.style.display = insideAnyHotelBlock ? "none" : "block";
            }

            if (scrollY >= initialOffsetTop) {
                if (!anchorsBlock.classList.contains("sticky")) {
                    anchorsBlock.classList.add("sticky");

                    if (window.innerWidth < 768 && !appBanner || appBanner.classList.contains("js-hidden")) {
                        anchorsBlock.style.top = "56px";
                    } else if (window.innerWidth < 768 && appBanner) {
                        anchorsBlock.style.top = "129px";
                    } else {
                        anchorsBlock.style.top = "0";
                    }

                    placeholder.style.display = "block";
                }
            } else {
                if (anchorsBlock.classList.contains("sticky")) {
                    anchorsBlock.classList.remove("sticky");
                    placeholder.style.display = "none";
                }
            }
        };

        window.addEventListener("scroll", onScroll);
    }
});