let lastActive = null;
let trapped = false;

function focusableNodes(container) {
    if (!container) return [];
    const selectors = [
        'a[href]',
        'area[href]',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable]',
    ];
    return Array.from(container.querySelectorAll(selectors.join(','))).filter(
        (n) => n.offsetWidth || n.offsetHeight || n.getClientRects().length,
    );
}

export function trapFocus(container) {
    if (trapped || !container) return;
    trapped = true;
    lastActive = document.activeElement;
    const nodes = focusableNodes(container);
    if (nodes.length) nodes[0].focus();
    function handleTab(e) {
        if (e.key !== 'Tab') return;
        const f = focusableNodes(container);
        if (!f.length) {
            e.preventDefault();
            return;
        }
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
    container.__focusHandler = handleTab;
    document.addEventListener('keydown', handleTab);
    const app = document.getElementById('app');
    if (app) app.setAttribute('aria-hidden', 'true');
}

export function releaseFocus() {
    if (!trapped) return;
    trapped = false;
    const app = document.getElementById('app');
    if (app) app.removeAttribute('aria-hidden');
    if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
    document.removeEventListener('keydown', document.__focusHandler);
    document.__focusHandler = null;
    lastActive = null;
}
