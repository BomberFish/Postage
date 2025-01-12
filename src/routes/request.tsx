import { Button, TextField, TextFieldMultiline, Card, Tabs, CircularProgressIndeterminate, SegmentedButtonContainer, SegmentedButtonItem } from "m3-dreamland";
import Response from "../components/response";
import { fetch } from "../epoxy";
import { settings } from "../store";
import iconDescription from '@ktibow/iconset-material-symbols/description';
import iconPublic from '@ktibow/iconset-material-symbols/public';
import iconDataObject from '@ktibow/iconset-material-symbols/data-object';
import iconInput from '@ktibow/iconset-material-symbols/input';
import iconOutput from '@ktibow/iconset-material-symbols/output';

const RequestView: Component<{
	url: string;
}, {
	contents: string;
	tab: "request" | "response";
	method: string;
	headers: any[];
	body: string;
	inProgress: boolean;
}> = function () {
	this.url = this.url || "";
	this.contents = "";
	this.tab = "request";
	this.method = "GET";
	this.headers = [
		{key: "", value: ""}
	]
	this.body = "";
	this.inProgress = false;

	this.css = `
	width: 78vw;
	height: 100vh;
	font-family: 'Roboto Flex', Roboto, RobotoDraft, 'Droid Sans', system-ui, sans-serif;

	padding: 1rem;

	display: flex;
	flex-direction: column;
	// align-items: center;
	justify-content: flex-start;

	// pre {
	// 	max-width: 100%;
	// 	max-height: 70vh;
	// 	overflow: auto;
	// }

	#request {
		width: 100%;
		height: 3rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	// [data-component="Tabs"] {
	// 	margin-bottom: 1rem;
	// }

	// [data-component="CircularProgressIndeterminate"] {
	// 	scale: 0.45;
	// }

	// [data-component="Card"]:first-of-type > div {
	// 	flex-direction: row;
	// 	align-items: center;
	// 	gap: 1rem;

	// 	[data-component="TextField"] {
	// 		flex-grow: 1;

	// 		* {
	// 			width: 100%;
	// 		}
	// 	}
	// }	
`

	// useChange([this.get, this.post], () => {
	// 	this.get = !this.post;
	// 	this.post = !this.get;
	// })

	// this.mount = () => {
	// 	console.log(ResponseView)
	// }

	return (
		<div id="request">
			<Card type="elevated">
				<TextField bind:value={use(this.url)} name="Enter URL" />
				<div class="method-select" on:change={(e: Event) => {
					const target = e.target as HTMLInputElement;
					this.method = target!.id.split("-")[1] as any;
					console.log(this.method);
				}}>
					<SegmentedButtonContainer>
						<SegmentedButtonItem type="radio" name="method" input="method-GET" checked={use(this.method, method => method === "GET")}>GET</SegmentedButtonItem>
						<SegmentedButtonItem type="radio" name="method" input="method-POST" checked={use(this.method, method => method === "POST")}>POST</SegmentedButtonItem>
						<SegmentedButtonItem type="radio" name="method" input="method-PUT" checked={use(this.method, method => method === "PUT")}>PUT</SegmentedButtonItem>
						<SegmentedButtonItem type="radio" name="method" input="method-DELETE" checked={use(this.method, method => method === "DELETE")}>DELETE</SegmentedButtonItem>
						<SegmentedButtonItem type="radio" name="method" input="method-PATCH" checked={use(this.method, method => method === "PATCH")}>PATCH</SegmentedButtonItem>
					</SegmentedButtonContainer>
				</div>
				{/* <div>{use(this.method)}</div> */}
				<Button type="filled" on:click={async () => {
					this.inProgress = true;
					try {
						console.log(this.method);
						const res = await fetch(this.url!, {
							method: this.method,
							headers: this.headers,
							body: this.body
						});
						console.log(res);
						let text = "";

						// "fake" the headers
						// text += `HTTP/1.1 ${res.status} ${res.statusText}\n`;
						// console.log((res as any).rawHeaders);
						// (res as any).rawheaders.forEach((header: string, i: number) => {
						// 	text += `${header}: ${(res as any).rawHeaders[i + 1]}\n`;
						// });

						text = await res.text();
						this.contents = text;
						this.tab = "response";
					} catch (error) {
						console.error(error);
					} finally {
						this.inProgress = false;
					}
				}} bind:disabled={use(this.inProgress)}>{$if(use(this.inProgress), (
					<CircularProgressIndeterminate />
				), (<span>Submit</span>))}</Button>
			</Card>
			<br></br>
			<Tabs items={[{ name: "Request", value: "request", icon: iconOutput }, { name: "Response", value: "response", icon: iconInput }]} bind:tab={use(this.tab)} secondary={true}></Tabs>
			{$if(use(this.tab, tab => tab === "request"), (
				<RequestBodyView bind:headers={use(this.headers)} bind:body={use(this.body)} />
			), (
				<ResponseView bind:contents={use(this.contents)} />
			))}
		</div>
	);
};

const RequestBodyView: Component<{
	headers: any[];
	body: string;
}, {
}> = function () {
	this.css = `
	width: 100%;
	height: 100%;

	[data-component="TextFieldMultiline"] {
		min-height: 10rem;

		* {
			width: 100%!important;
			min-height: 10rem!important;
		}
	}
	`
	useChange(this.headers, () => {
		console.log(this.headers);
	})

	
	return (
		<div>
			{/* <Card type="elevated">
				{use(this.headers, headers => headers.map((header: any, i: number) => {
					<div>
						<TextField value={header.key} name="Key" />
						<TextField value={header.value} name="Value" />
					</div>
				}))}
				<br></br>
				<Button type="filled" on:click={() => {
					this.headers.push({key: "", value: ""});
				}}>Add Header</Button>
			</Card> */}
			<br></br>
			<Card type="elevated">
				<TextFieldMultiline bind:value={use(this.body)} name="Body" />
			</Card>
		</div>
	)
}

const ResponseView: Component<{
	contents: string;
}, {
	// currentTab: "raw" | "json" | "web";
}> = function () {

	this.css = `
	width: 100%;
	height: 80%;

	& > * {
		width: 100%;
		height: 100%;
	}

	[data-component="Tabs"] {
		margin-bottom: 1rem;
	}
	`
	return (
		<div>
			<Tabs items={[{ name: "Raw", value: "raw", icon: iconDescription }, { name: "JSON", value: "json", icon: iconDataObject }, { name: "Web", value: "web", icon: iconPublic }]} bind:tab={use(settings.currentTab)} secondary={true}></Tabs>
			<br></br>
			<Card type="outlined">
				{/* {use(this.currentTab, tab => {
					const tab2 = tab as "raw" | "json" | "web";
					switch (tab2) {
						case "raw":
							return <ResponseView type="raw" bind:contents={use(this.contents)} />;
						case "json":
							return <ResponseView type="json" bind:contents={use(this.contents)} />;
						case "web":
							return <ResponseView type="web" bind:contents={use(this.contents)} />;
					}
				})} */}
				<Response bind:type={use(settings.currentTab)} bind:contents={use(this.contents)} />
			</Card>
		</div>
	)
}

export default RequestView;