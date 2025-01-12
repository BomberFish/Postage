const Response: Component<{type?:string, contents?: string}, {
	raw: boolean;
	json: boolean;
	web: boolean;
}> = function() {
	this.type = this.type || "raw";

	this.css = `
	width: 100%;
	height: 100%;
	min-height: 50vh;


	&,* {
		padding: 0;
		margin: 0;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		min-height: 75vh;
	}

	pre {
		max-width: 100%;
		max-height: 70vh;
		overflow: auto;
	}
	`

	// switch (this.type!) {
	// 	case "raw":
	// 		return (
	// 			<pre>{this.contents}</pre>
	// 		);
	// 	case "json":
	// 		return (
	// 			<pre>{jayson(this.contents!)}</pre>
	// 		);
	// 	case "web":
	// 		return (
	// 			<iframe srcdoc={this.contents} style="width: 100%; height: 100%; border: none;"></iframe>
	// 		);
	// }
	return (
		<div>
			{$if(use(this.type, type=>type==="raw"), <pre>{use(this.contents)}</pre>)}
			{$if(use(this.type, type=>type==="json"), <pre>{use(this.contents, contents=>jayson(contents || ""))}</pre>)}
			{$if(use(this.type, type=>type==="web"), <iframe srcdoc={use(this.contents)} style="width: 100%; height: 100%; border: none;"></iframe>)}
		</div>
	);
}

function jayson(c: string) {
	try {
		return JSON.stringify(JSON.parse(c), null, 2)
	} catch (err) {
		return c
	}
}

export default Response;