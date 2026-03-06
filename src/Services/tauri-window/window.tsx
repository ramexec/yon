import { getAllWebviewWindows, WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { getCurrentWindow } from "@tauri-apps/api/window"

export const create_window = async (label: string, navigate: string,
    title: string = "new window",
    width: number = 700,
    height: number = 500) => {
    const windows = await getAllWebviewWindows()
    const existing = windows.find(w => w.label === label)
    if (existing) {
        await existing.setFocus()
        return
    }

    const win = new WebviewWindow(label, {
        url: navigate,
        title: title,
        width: width,
        height: height
    })

    win.once("tauri://created", () => {
        console.log("Deck window created")
    })

    win.once("tauri://error", (e) => {
        console.error("Window error:", e)
    })

}

export const close_current_window = async () => {
    await getCurrentWindow().close()
  }