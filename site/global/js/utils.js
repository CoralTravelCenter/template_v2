export async function hostReactAppReady(
    selector = "#__next > div",
    timeout = 500,
) {
    return new Promise((resolve) => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

export function vimeoAutoPlay() {
    const vimeoBoxes = document.querySelectorAll(
        ".vimeo-video-box [data-vimeo-vid]",
    );
    let players = {};
    if (vimeoBoxes.length) {
        getScript("https://player.vimeo.com/api/player.js", doio);
    }
    const io_options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.33,
    };

    function doio() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const target = entry.target;
                if (entry.isIntersecting) {
                    if (players[target.dataset.vimeoVid]) {
                        players[target.dataset.vimeoVid].play();
                    } else {
                        players[target.dataset.vimeoVid] = new Vimeo.Player(
                            target,
                            {
                                id: target.dataset.vimeoVid,
                                background: 1,
                                playsinline: 1,
                                autopause: 0,
                                title: 0,
                                byline: 0,
                                portrait: 0,
                                autoplay: 1,
                                muted: 1,
                            },
                        );
                        players[target.dataset.vimeoVid].play();
                        players[target.dataset.vimeoVid].on("play", function () {
                            this.element.parentElement.classList.add(
                                "playback",
                            );
                        });
                    }
                } else {
                    players[target.dataset.vimeoVid]?.pause();
                }
            });
        }, io_options);
        vimeoBoxes.forEach((box) => {
            io.observe(box);
        });
    }
}