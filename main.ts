import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as ObsidianHelpers from 'util/obsidianHelper';
import widgets from 'codemirror-widgets';
import katex from 'katex';

export default class MyPlugin extends Plugin {

	async onload() {
		console.log("Editor math loaded");
		
		// bind math widget to all the CodeMirror edtiors
		this.registerCodeMirror((cm: CodeMirror.Editor) => {
            this.handleInitialLoad(cm);
        });
	}

	onunload() {
		console.log("Editor math unloaded");
	}
	
	// Only Triggered during initial Load
    handleInitialLoad = (cm: CodeMirror.Editor) => {
		// Create a type of widget
		var WidgetMath = widgets.createType({
			mixins: [
				widgets.mixins.re(/\$\$([^$]+)\$\$/g, function(match:any) {
					return {
						props: {
							text: match[1]
						}
					};
				}),
				// widgets.mixins.editDelimit('$$', '$$')
				widgets.mixins.editParagraph()
			],

			createElement: function(widget:any) {
				// Create the spam to replace the formula
				var span = document.createElement('span');

				// Render the formula using katex
				katex.render(widget.props.text, span)

				return span;
			}
		});
		
		// Create a widgets manager connected to an editor
		var manager = widgets.createManager(cm);

		// Connect a type of widget to the manager
		manager.enable(WidgetMath);
    };
}
