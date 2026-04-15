(function () {
    'use strict';

    const POPUP_LAST_SHOWN_KEY = 'elitePopupLastShownAt';
    const POPUP_COOLDOWN_MS = 5 * 60 * 1000;
    const ELITE_CHAIN_KEY = 'eliteSearchActive';
    const SHIELD_VISIBLE_KEY = 'eliteShieldVisible';
    const ELITE_DISMISSED_KEY = 'eliteDismissedPermanently';
    const ELITE_USER_NAME_KEY = 'eliteUserName';

    function readBoolean(storage, key) {
        try {
            return storage.getItem(key) === '1';
        } catch (e) {
            return false;
        }
    }

    function writeBoolean(storage, key, value) {
        try {
            if (value) storage.setItem(key, '1');
            else storage.removeItem(key);
        } catch (e) {
        }
    }

    function readString(storage, key) {
        try {
            return storage.getItem(key) || '';
        } catch (e) {
            return '';
        }
    }

    function writeString(storage, key, value) {
        try {
            if (value) storage.setItem(key, value);
            else storage.removeItem(key);
        } catch (e) {
        }
    }

    window.createEliteState = function createEliteState() {
        const listeners = new Set();

        const emit = () => {
            listeners.forEach((listener) => {
                try {
                    listener();
                } catch (e) {
                }
            });
        };

        const state = {
            subscribe(listener) {
                listeners.add(listener);
                return () => listeners.delete(listener);
            },

            shouldAutoOpenPopup() {
                if (state.isEliteDismissedPermanently()) return false;

                try {
                    const lastShownAt = Number(localStorage.getItem(POPUP_LAST_SHOWN_KEY) || 0);
                    return !lastShownAt || Date.now() - lastShownAt >= POPUP_COOLDOWN_MS;
                } catch (e) {
                    return true;
                }
            },

            markPopupShown() {
                try {
                    localStorage.setItem(POPUP_LAST_SHOWN_KEY, String(Date.now()));
                } catch (e) {
                }
            },

            isEliteSearchActive() {
                return readBoolean(sessionStorage, ELITE_CHAIN_KEY);
            },

            activateEliteSearch() {
                writeBoolean(sessionStorage, ELITE_CHAIN_KEY, true);
                emit();
            },

            clearEliteSearch() {
                writeBoolean(sessionStorage, ELITE_CHAIN_KEY, false);
                emit();
            },

            isShieldVisible() {
                return readBoolean(sessionStorage, SHIELD_VISIBLE_KEY);
            },

            showShield() {
                writeBoolean(sessionStorage, SHIELD_VISIBLE_KEY, true);
                emit();
            },

            hideShield() {
                writeBoolean(sessionStorage, SHIELD_VISIBLE_KEY, false);
                emit();
            },

            isEliteDismissedPermanently() {
                return readBoolean(sessionStorage, ELITE_DISMISSED_KEY);
            },

            dismissElitePermanently() {
                writeBoolean(sessionStorage, ELITE_DISMISSED_KEY, true);
                state.hideShield();
                state.clearEliteSearch();
                emit();
            },

            resetDismissedState() {
                writeBoolean(sessionStorage, ELITE_DISMISSED_KEY, false);
                emit();
            },

            setEliteUserName(value) {
                writeString(sessionStorage, ELITE_USER_NAME_KEY, (value || '').trim());
                emit();
            },

            getEliteUserName() {
                return readString(sessionStorage, ELITE_USER_NAME_KEY);
            },
        };

        return state;
    };
})();
