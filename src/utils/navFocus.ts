// After a palette navigation, focus should land on the new page (not the old opener).
// Pages that manage their own focus (modals, deep-link targets) call consumeMainFocus() to cancel it.
let wantMain = false
export const requestMainFocus = () => { wantMain = true }
export const consumeMainFocus = () => { const w = wantMain; wantMain = false; return w }
