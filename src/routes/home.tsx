import { NavDrawer, NavDrawerButton, Button, Icon } from "m3-dreamland";
import RequestView from "./request";
import { settings } from "../store";
import iconOutput from '@ktibow/iconset-material-symbols/output';

const Home: Component<{}, {
	url: string;
	contents: string;
	requestComponent: HTMLElement;
}> = function () {
	this.url = settings.stateful.urls[0];
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

	[data-component="NavDrawer"] {
		width: 20vw;
	}

	// justify-content: center;

	`

	this.mount = () => {
		console.log(settings)
	}

	return (
		<div>
			<NavDrawer>
					{use(this.url, thisUrl => settings.stateful.urls.map((url, i) => {
						return ( 
						<NavDrawerButton icon={iconOutput} on:click={() => { 
							this.requestComponent = <RequestView bind:url={use(settings.stateful.urls[i])} />
						 }} 
						 selected={thisUrl === url}
						>
							{url}
						</NavDrawerButton>
						)
					}))}
					<Button type="filled" on:click={() => {
						settings.stateful.urls.push("https://example.com/");
						this.url = settings.stateful.urls[settings.stateful.urls.length - 1];
						this.requestComponent = <RequestView bind:url={use(settings.stateful.urls[settings.stateful.urls.length - 1])} />
					} }>New Request</Button>
			</NavDrawer>
			{use(this.requestComponent)}
		</div>
	);
};

export default Home;
