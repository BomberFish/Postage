import { NavDrawer, NavDrawerButton, Button, Icon } from "m3-dreamland";
import RequestView from "./request";
import { settings } from "../store";
import iconOutput from '@ktibow/iconset-material-symbols/output';

const Home: Component<{}, {
	url: string;
	index: number;
	saveurl: string;
	contents: string;
	requestComponent: HTMLElement;
}> = function () {
	this.url = settings.stateful.urls[0];
	this.index = 0;
	this.saveurl = settings.stateful.urls[0];
	this.contents = "";
	this.requestComponent = <RequestView bind:url={use(settings.stateful.urls[0])}/>;
	this.css = `
	width: 100vw;
	height: 100vh;
	font-family: 'Roboto Flex', Roboto, RobotoDraft, 'Droid Sans', system-ui, sans-serif;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	overflow: hidden;

	&:first-child {
		height: 100vh;
	}

	// justify-content: center;

	`

	this.mount = () => {
		console.log(settings)
	}

	useChange(this.saveurl, () => {
		console.log("saving url")
		settings.stateful.urls[this.index] = this.saveurl;
	})

	return (
		<div>
			<NavDrawer>
					{use(this.url, thisUrl => settings.stateful.urls.map((url, i) => {
						return ( 
						<NavDrawerButton icon={iconOutput} on:click={() => { 
							this.index = i;
							this.saveurl = url;
							this.requestComponent = <RequestView bind:url={use(this.saveurl)} />
							this.url = settings.stateful.urls[i];
						 }} 
						 selected={this.index === i}
						>
							{use(settings.stateful.urls, urls => urls[i])}
						</NavDrawerButton>
						)
					}))}
					<Button type="filled" on:click={() => {
						settings.stateful.urls.push("https://example.com/");
						this.index = settings.stateful.urls.length - 1;
						this.saveurl = settings.stateful.urls[this.index];
						this.requestComponent = <RequestView bind:url={use(this.saveurl)} />
						this.url = "https://example.com/";
					} }>New Request</Button>
			</NavDrawer>
			{use(this.requestComponent)}
		</div>
	);
};

export default Home;
