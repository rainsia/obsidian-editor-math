// @ts-ignore
import { Workspace, MarkdownView, Vault, TFile, App, Keymap } from 'obsidian';

// Getting Active Markdown File
export const getActiveNoteFile = (workspace: Workspace) => {
    return workspace.getActiveFile();
};

// Get Active Editor
export const getCmEditor = (workspace: Workspace): CodeMirror.Editor => {
    // @ts-ignore
    return workspace.getActiveViewOfType(MarkdownView)?.sourceMode?.cmEditor;
};

export const pluginIsLoaded = (app: App, pluginId: string) => {
    // @ts-ignore
    return app.plugins.getPlugin(pluginId);
};